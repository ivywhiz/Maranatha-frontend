// lib/hooks/use-verses.ts

import { useQuery } from '@tanstack/react-query'
import { getVerseTopics, getVersesByTopic } from '../../lib/api'

export const verseKeys = {
  topics: ['verses', 'topics'] as const,
  topic:  (slug: string) => ['verses', 'topic', slug] as const,
}

export function useVerseTopics() {
  return useQuery({
    queryKey: verseKeys.topics,
    queryFn: getVerseTopics,
    staleTime: 1000 * 60 * 60 * 24, // 24h
  })
}

export function useVersesByTopic(slug: string) {
  return useQuery({
    queryKey: verseKeys.topic(slug),
    queryFn: () => getVersesByTopic(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 60 * 24, // 24h
  })
}
