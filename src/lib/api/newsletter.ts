// lib/api/newsletter.ts

import { apiClient } from './client'
import type {
  SubscribeRequest,
  SubscribeResponse,
  SubscriptionStatus,
  APIResponse,
} from '../../types/api'

export async function subscribe(data: SubscribeRequest): Promise<SubscribeResponse> {
  const res = await apiClient.post<APIResponse<SubscribeResponse>>(
    '/newsletter/subscribe',
    data
  )
  return res.data.data!
}

export async function unsubscribe(email: string): Promise<void> {
  await apiClient.post('/newsletter/unsubscribe', { email })
}

export async function getSubscriptionStatus(email: string): Promise<SubscriptionStatus> {
  const res = await apiClient.get<APIResponse<SubscriptionStatus>>(
    `/newsletter/status?email=${encodeURIComponent(email)}`
  )
  return res.data.data!
}
