// lib/api/contact.ts

import { apiClient } from './client'
import type { ContactRequest, ContactResponse, APIResponse } from '../../types/api'

export async function submitContactForm(data: ContactRequest): Promise<ContactResponse> {
  const res = await apiClient.post<APIResponse<ContactResponse>>('/contact', data)
  return res.data.data!
}
