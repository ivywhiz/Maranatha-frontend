// lib/hooks/use-comments.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  submitComment, getPendingComments,
  approveComment, rejectComment, deleteComment,
} from '../../lib/api'
import type { SubmitCommentRequest } from '../../types/api'

export const commentKeys = {
  all:     ['comments'] as const,
  list:    (teachingId: string, page: number) =>
             ['comments', teachingId, page] as const,
  pending: () => ['comments', 'pending'] as const,
}

/** Submit a guest comment — optimistic update not used here since it needs AI moderation */
export function useSubmitComment(teachingId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: SubmitCommentRequest) => submitComment(teachingId, data),
    onSuccess: () => {
      // Invalidate after a short delay to let the AI moderation run
      setTimeout(() => {
        qc.invalidateQueries({ queryKey: commentKeys.list(teachingId, 1) })
      }, 3000)
    },
  })
}

/** Admin: fetch pending comments */
export function usePendingComments(page = 1) {
  return useQuery({
    queryKey: commentKeys.pending(),
    queryFn: () => getPendingComments(page),
  })
}

/** Admin: approve a comment */
export function useApproveComment() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => approveComment(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: commentKeys.pending() }),
  })
}

/** Admin: reject a comment */
export function useRejectComment() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => rejectComment(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: commentKeys.pending() }),
  })
}

/** Admin: delete a comment */
export function useDeleteComment() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: commentKeys.all }),
  })
}
