// lib/api/verses.ts

import { serverFetch } from './client'
import type { VerseTopic, VerseTopicWithVerses } from '../../types/api'

export async function getVerseTopics(): Promise<VerseTopic[]> {
  return serverFetch<VerseTopic[]>('/verses/topics')
}

export async function getVersesByTopic(slug: string): Promise<VerseTopicWithVerses> {
  return serverFetch<VerseTopicWithVerses>(`/verses/topic/${slug}`)
}
