'use client'

import { useQuery } from '@tanstack/react-query'
import {
  DEFAULT_BIBLE_ID,
  getBooksClient,
  getChapterClient,
  getTranslationsClient,
  getVerseOfDayClient,
  getBibleIndexClient,
} from '../api/bible'

import type {
  BibleCanon,
  BibleIndex,
  BibleIndexBook,
  BiblePassage,
  BibleVersion,
  BookCollectionItem,
  ResolvedChapter,
} from '../../types/api'

/* ──────────────────────────────────────────────────────────────
   HELPERS (THIS WAS MISSING → CAUSED YOUR ERROR)
────────────────────────────────────────────────────────────── */

const OLD_TESTAMENT = new Set([
  'GEN','EXO','LEV','NUM','DEU','JOS','JDG','RUT','1SA','2SA',
  '1KI','2KI','1CH','2CH','EZR','NEH','EST','JOB','PSA','PRO',
  'ECC','SNG','ISA','JER','LAM','EZK','DAN','HOS','JOL','AMO',
  'OBA','JON','MIC','NAM','HAB','ZEP','HAG','ZEC','MAL',
])

const CHAPTER_FALLBACK: Record<string, number> = {
  GEN:50, EXO:40, LEV:27, NUM:36, DEU:34,
  JOS:24, JDG:21, RUT:4, '1SA':31, '2SA':24,
  '1KI':22, '2KI':25, '1CH':29, '2CH':36,
  EZR:10, NEH:13, EST:10, JOB:42, PSA:150,
  PRO:31, ECC:12, SNG:8, ISA:66, JER:52,
  LAM:5, EZK:48, DAN:12, HOS:14, JOL:3,
  AMO:9, OBA:1, JON:4, MIC:7, NAM:3,
  HAB:3, ZEP:3, HAG:2, ZEC:14, MAL:4,

  MAT:28, MRK:16, LUK:24, JHN:21, ACT:28,
  ROM:16, '1CO':16, '2CO':13, GAL:6, EPH:6,
  PHP:4, COL:4, '1TH':5, '2TH':3, '1TI':6,
  '2TI':4, TIT:3, PHM:1, HEB:13, JAS:5,
  '1PE':5, '2PE':3, '1JN':5, '2JN':1,
  '3JN':1, JUD:1, REV:22,
}

function normalize(id?: string | null) {
  return String(id ?? '').trim().toUpperCase()
}

/* ──────────────────────────────────────────────────────────────
   EXPORTS REQUIRED BY YOUR COMPONENT
────────────────────────────────────────────────────────────── */

export function resolveCanon(
  book?: Partial<BookCollectionItem> | Partial<BibleIndexBook> | null
): BibleCanon {
  if (book?.canon) return book.canon
  return OLD_TESTAMENT.has(normalize(book?.id))
    ? 'old_testament'
    : 'new_testament'
}

export function resolveChapterCount(
  bookId: string,
  books?: BibleIndexBook[]
): number {
  const id = normalize(bookId)

  const found = books?.find(
    (b) => normalize(b.id) === id || normalize(b.abbreviation) === id
  )

  if (found?.chapters?.length) return found.chapters.length

  return CHAPTER_FALLBACK[id] ?? 0
}

/* ──────────────────────────────────────────────────────────────
   HOOKS
────────────────────────────────────────────────────────────── */

export function useBibleTranslations() {
  return useQuery<BibleVersion[]>({
    queryKey: ['translations'],
    queryFn: () => getTranslationsClient(['en']),
    staleTime: 1000 * 60 * 60,
  })
}

export function useBibleBooks(
  bibleId: number = DEFAULT_BIBLE_ID
) {
  return useQuery<BookCollectionItem[]>({
    queryKey: ['books', bibleId],
    queryFn: () => getBooksClient(bibleId),
    enabled: !!bibleId,
    staleTime: 1000 * 60 * 60,
  })
}

export function useBibleIndex(
  bibleId: number = DEFAULT_BIBLE_ID
) {
  return useQuery<BibleIndex>({
    queryKey: ['index', bibleId],
    queryFn: () => getBibleIndexClient(bibleId),
    enabled: !!bibleId,
    staleTime: 1000 * 60 * 60,
  })
}

export function useBibleChapter(
  bibleId: number,
  bookId?: string,
  chapter?: string,
  enabled = true
) {
  return useQuery<ResolvedChapter>({
    queryKey: ['chapter', bibleId, bookId, chapter],
    queryFn: () =>
      getChapterClient(bibleId, String(bookId), String(chapter)),
    enabled: Boolean(bibleId && bookId && chapter && enabled),
  })
}

export function useVerseOfDay(
  bibleId: number = DEFAULT_BIBLE_ID
) {
  return useQuery<BiblePassage>({
    queryKey: ['verse-of-day', bibleId],
    queryFn: () => getVerseOfDayClient(bibleId),
    enabled: !!bibleId,
    staleTime: 1000 * 60 * 30,
  })
}