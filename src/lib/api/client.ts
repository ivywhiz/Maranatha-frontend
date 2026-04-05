// lib/api/client.ts
// Central Axios instance — all API calls go through here.
// Handles: base URL, auth token, error formatting, 401 auto-refresh.

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { APIResponse } from '../../types/api'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/v1'

// ─── Token store ─────────────────────────────────────────────────────────────
// Access token lives in memory only — never localStorage.
// Refresh token lives in HTTP-only cookie (set by Next.js API route).

let accessToken: string | null = null

export const tokenStore = {
  get: () => accessToken,
  set: (token: string) => { accessToken = token },
  clear: () => { accessToken = null },
}

// ─── Axios instance ───────────────────────────────────────────────────────────

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Send cookies with every request (needed for HTTP-only refresh token cookie)
  withCredentials: true,
})

// ─── Request interceptor — attach access token ────────────────────────────────

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStore.get()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ─── Response interceptor — handle errors + 401 token refresh ─────────────────

let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token!)
  })
  failedQueue = []
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<APIResponse<unknown>>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // ── 401 Unauthorized — try to refresh the access token ───────────────────
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue this request while refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return apiClient(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Call our Next.js API route which reads the HTTP-only cookie
        const { data } = await axios.post<APIResponse<{ access_token: string }>>(
          '/api/auth/refresh',
          {},
          { withCredentials: true }
        )
        const newToken = data.data!.access_token
        tokenStore.set(newToken)
        processQueue(null, newToken)
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        tokenStore.clear()
        // Redirect to login if refresh also fails
        if (typeof window !== 'undefined') {
          window.location.href = '/admin/login'
        }
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // ── Extract backend error message ──────────────────────────────────────────
    const message =
      error.response?.data?.error ??
      error.response?.data?.message ??
      error.message ??
      'Something went wrong'

    return Promise.reject(new Error(message))
  }
)

// ─── Server-side fetch helper (for Next.js Server Components) ─────────────────
// Used in server components where axios is not available.
// Does NOT attach auth token — public endpoints only.

export async function serverFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${BASE_URL}${path}`

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options?.headers,
    },
    // Next.js cache options — revalidate every 60s for public pages
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body?.error ?? `API error ${res.status}`)
  }

  const body: APIResponse<T> = await res.json()

  if (!body.success) {
    throw new Error(body.error ?? 'API returned unsuccessful response')
  }

  return body.data as T
}

// ─── Server-side paginated fetch ─────────────────────────────────────────────

export async function serverFetchPaginated<T>(
  path: string,
  options?: RequestInit
): Promise<{ data: T[]; meta: import('../../types/api').PaginationMeta }> {
  const url = `${BASE_URL}${path}`

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options?.headers,
    },
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body?.error ?? `API error ${res.status}`)
  }

  const body = await res.json()
  return { data: body.data, meta: body.meta }
}
