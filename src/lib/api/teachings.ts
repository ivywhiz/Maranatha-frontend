// lib/api/teachings.ts
// All teaching-related API calls.

import { apiClient, serverFetch, serverFetchPaginated } from './client'
import type {
  Teaching,
  CreateTeachingRequest,
  UpdateTeachingRequest,
  TeachingFilters,
  PaginationMeta,
  APIResponse,
} from '../../types/api'

// ─── Public (Server Component calls) ─────────────────────────────────────────

/** Fetch paginated teaching list — used in Server Components */
export async function getTeachings(filters: TeachingFilters = {}) {
  const params = new URLSearchParams()
  if (filters.page)      params.set('page',      String(filters.page))
  if (filters.page_size) params.set('page_size', String(filters.page_size))
  if (filters.category)  params.set('category',  filters.category)
  if (filters.tag)       params.set('tag',        filters.tag)
  if (filters.q)         params.set('q',          filters.q)

  const qs = params.toString()
  return serverFetchPaginated<Teaching>(`/teachings${qs ? `?${qs}` : ''}`)
}

/** Fetch a single teaching by ID — used in Server Components */
export async function getTeaching(id: string): Promise<Teaching> {
  return serverFetch<Teaching>(`/teachings/${id}`)
}

// ─── Client-side mutations (called from Client Components) ────────────────────

/** Record a view for a teaching (fire-and-forget) */
export async function recordView(id: string): Promise<void> {
  await apiClient.post(`/teachings/${id}/view`).catch(() => {})
}

/** Create a new teaching (admin) */
export async function createTeaching(data: CreateTeachingRequest): Promise<Teaching> {
  const res = await apiClient.post<APIResponse<Teaching>>('/teachings', data)
  return res.data.data!
}

/** Update a teaching (admin) */
export async function updateTeaching(id: string, data: UpdateTeachingRequest): Promise<Teaching> {
  const res = await apiClient.put<APIResponse<Teaching>>(`/teachings/${id}`, data)
  return res.data.data!
}

/** Delete a teaching (admin) */
export async function deleteTeaching(id: string): Promise<void> {
  await apiClient.delete(`/teachings/${id}`)
}
