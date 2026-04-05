// lib/hooks/use-teachings.ts
// TanStack Query hooks for client-side teaching interactions.

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { recordView, createTeaching, updateTeaching, deleteTeaching } from '../../lib/api'
import type { CreateTeachingRequest, UpdateTeachingRequest } from '../../types/api'

// Query keys — centralised so invalidations are consistent
export const teachingKeys = {
  all:    ['teachings'] as const,
  lists:  () => [...teachingKeys.all, 'list'] as const,
  detail: (id: string) => [...teachingKeys.all, 'detail', id] as const,
}

/** Fire-and-forget view count increment */
export function useRecordView(id: string) {
  return useMutation({
    mutationFn: () => recordView(id),
  })
}

/** Admin: create teaching */
export function useCreateTeaching() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateTeachingRequest) => createTeaching(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: teachingKeys.lists() }),
  })
}

/** Admin: update teaching */
export function useUpdateTeaching(id: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: UpdateTeachingRequest) => updateTeaching(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: teachingKeys.detail(id) })
      qc.invalidateQueries({ queryKey: teachingKeys.lists() })
    },
  })
}

/** Admin: delete teaching */
export function useDeleteTeaching() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteTeaching(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: teachingKeys.lists() }),
  })
}
