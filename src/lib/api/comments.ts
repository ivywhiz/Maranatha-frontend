// lib/api/comments.ts

import { apiClient, serverFetchPaginated } from './client'
import type {
  CommentPublic,
  Comment,
  SubmitCommentRequest,
  APIResponse,
} from '../../types/api'

/** Fetch approved comments for a teaching — Server Component */
export async function getComments(teachingId: string, page = 1) {
  return serverFetchPaginated<CommentPublic>(
    `/teachings/${teachingId}/comments?page=${page}&page_size=20`
  )
}

/** Submit a guest comment */
export async function submitComment(
  teachingId: string,
  data: SubmitCommentRequest
): Promise<CommentPublic> {
  const res = await apiClient.post<APIResponse<CommentPublic>>(
    `/teachings/${teachingId}/comments`,
    data
  )
  return res.data.data!
}

/** Admin: get pending comments */
export async function getPendingComments(page = 1) {
  const res = await apiClient.get<APIResponse<Comment[]>>(
    `/admin/comments/pending?page=${page}`
  )
  return res.data
}

/** Admin: approve a comment */
export async function approveComment(id: string): Promise<void> {
  await apiClient.put(`/admin/comments/${id}/approve`)
}

/** Admin: reject a comment */
export async function rejectComment(id: string): Promise<void> {
  await apiClient.put(`/admin/comments/${id}/reject`)
}

/** Admin: delete a comment */
export async function deleteComment(id: string): Promise<void> {
  await apiClient.delete(`/comments/${id}`)
}
