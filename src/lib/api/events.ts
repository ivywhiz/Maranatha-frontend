// lib/api/events.ts

import { apiClient, serverFetch, serverFetchPaginated } from './client'
import type {
  Event,
  EventFilters,
  CreateEventRequest,
  APIResponse,
} from '../../types/api'

/** Fetch events with filters — Server Component */
export async function getEvents(filters: EventFilters = {}) {
  const params = new URLSearchParams()
  if (filters.page)        params.set('page',        String(filters.page))
  if (filters.page_size)   params.set('page_size',   String(filters.page_size))
  if (filters.country)     params.set('country',     filters.country)
  if (filters.within_days) params.set('within_days', String(filters.within_days))
  if (filters.lat)         params.set('lat',         String(filters.lat))
  if (filters.lng)         params.set('lng',         String(filters.lng))
  if (filters.radius_km)   params.set('radius_km',   String(filters.radius_km))
  if (filters.q)           params.set('q',           filters.q)

  const qs = params.toString()
  return serverFetchPaginated<Event>(`/events${qs ? `?${qs}` : ''}`)
}

/** Fetch a single event — Server Component */
export async function getEvent(id: string): Promise<Event> {
  return serverFetch<Event>(`/events/${id}`)
}

/** Admin: create an event */
export async function createEvent(data: CreateEventRequest): Promise<Event> {
  const res = await apiClient.post<APIResponse<Event>>('/events', data)
  return res.data.data!
}

/** Admin: update an event */
export async function updateEvent(id: string, data: CreateEventRequest): Promise<Event> {
  const res = await apiClient.put<APIResponse<Event>>(`/events/${id}`, data)
  return res.data.data!
}

/** Admin: add a video/link media item to an event */
export async function addEventMediaLink(
  eventId: string,
  mediaType: 'video' | 'link',
  url: string,
  caption?: string
): Promise<void> {
  await apiClient.post(`/events/${eventId}/media`, { media_type: mediaType, url, caption })
}

/** Admin: upload an image to an event */
export async function uploadEventImage(
  eventId: string,
  file: File,
  caption?: string
): Promise<void> {
  const form = new FormData()
  form.append('file', file)
  if (caption) form.append('caption', caption)
  await apiClient.post(`/events/${eventId}/media/upload`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

/** Admin: delete an event media item */
export async function deleteEventMedia(eventId: string, mediaId: string): Promise<void> {
  await apiClient.delete(`/events/${eventId}/media/${mediaId}`)
}
