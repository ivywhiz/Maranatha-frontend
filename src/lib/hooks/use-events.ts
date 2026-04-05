// lib/hooks/use-events.ts
// TanStack Query hooks for client-side event interactions.

import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createEvent,
  updateEvent,
  addEventMediaLink,
  uploadEventImage,
  deleteEventMedia,
} from '../../lib/api'
import type { CreateEventRequest } from '../../types/api'

export const eventKeys = {
  all:    ['events'] as const,
  lists:  () => [...eventKeys.all, 'list'] as const,
  detail: (id: string) => [...eventKeys.all, 'detail', id] as const,
}

/** Admin: create event */
export function useCreateEvent() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateEventRequest) => createEvent(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: eventKeys.lists() }),
  })
}

/** Admin: update event */
export function useUpdateEvent(id: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateEventRequest) => updateEvent(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: eventKeys.detail(id) })
      qc.invalidateQueries({ queryKey: eventKeys.lists() })
    },
  })
}

/** Admin: add a video or link media item */
export function useAddEventMediaLink(eventId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ mediaType, url, caption }: {
      mediaType: 'video' | 'link'
      url: string
      caption?: string
    }) => addEventMediaLink(eventId, mediaType, url, caption),
    onSuccess: () => qc.invalidateQueries({ queryKey: eventKeys.detail(eventId) }),
  })
}

/** Admin: upload an image to an event */
export function useUploadEventImage(eventId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ file, caption }: { file: File; caption?: string }) =>
      uploadEventImage(eventId, file, caption),
    onSuccess: () => qc.invalidateQueries({ queryKey: eventKeys.detail(eventId) }),
  })
}

/** Admin: delete a media item from an event */
export function useDeleteEventMedia(eventId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (mediaId: string) => deleteEventMedia(eventId, mediaId),
    onSuccess: () => qc.invalidateQueries({ queryKey: eventKeys.detail(eventId) }),
  })
}
