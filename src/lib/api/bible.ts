/**
 * src/lib/api/bible.ts
 *
 * All functions call the Next.js API routes.
 * Responses are normalized into the ResolvedVerse / ResolvedChapter UI types
 * so the UI layer never has to deal with raw backend shapes.
 */

import type {
  BibleVersion,
  BibleIndex,
  BibleIndexBook,
  BookCollectionItem,
  ChapterCollectionItem,
  VerseCollectionItem,
  BiblePassage,
  Highlight,
  HighlightRequest,
  CollectionEnvelope,
  ResolvedVerse,
  ResolvedChapter,
} from '../../types/api'

export const DEFAULT_BIBLE_ID = 111

type APIResponse<T> = {
  success?: boolean
  data?: T
  error?: string
  message?: string
}

async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    cache: 'no-store',
  })

  if (!res.ok) {
    let msg = `HTTP ${res.status}`

    try {
      const j = await res.json()
      msg = j?.error ?? j?.message ?? j?.data?.error ?? msg
    } catch {
      // ignore JSON parse errors
    }

    throw new Error(msg)
  }

  return res.json() as Promise<T>
}

function unwrapApiData<T>(payload: unknown): T {
  const maybeWrapped = payload as APIResponse<T>

  if (
    maybeWrapped &&
    typeof maybeWrapped === 'object' &&
    'data' in maybeWrapped
  ) {
    return maybeWrapped.data as T
  }

  return payload as T
}

/** Returns all English Bible translations. */
export async function getTranslations(
  languageRanges: string[] = ['en']
): Promise<BibleVersion[]> {
  const qs = new URLSearchParams()
  languageRanges.forEach((lr) => qs.append('language_ranges[]', lr))
  qs.set('page_size', '100')

  const raw = await apiFetch<
    APIResponse<CollectionEnvelope<BibleVersion>> |
    CollectionEnvelope<BibleVersion> |
    BibleVersion[]
  >(`/api/bible/translations?${qs.toString()}`)

  const unwrapped = unwrapApiData<
    CollectionEnvelope<BibleVersion> | BibleVersion[]
  >(raw)

  if (Array.isArray(unwrapped)) return unwrapped
  if (unwrapped && Array.isArray(unwrapped.data)) return unwrapped.data
  return []
}

export const getTranslationsClient = getTranslations

/** Returns the flat list of books for a given bible ID. */
export async function getBooks(
  bibleId: number = DEFAULT_BIBLE_ID,
  canon?: 'old_testament' | 'new_testament' | 'deuterocanon'
): Promise<BookCollectionItem[]> {
  const qs = canon ? `?canon=${canon}` : ''

  const raw = await apiFetch<
    APIResponse<CollectionEnvelope<BookCollectionItem>> |
    CollectionEnvelope<BookCollectionItem> |
    BookCollectionItem[]
  >(`/api/bible/${bibleId}/books${qs}`)

  const unwrapped = unwrapApiData<
    CollectionEnvelope<BookCollectionItem> | BookCollectionItem[]
  >(raw)

  if (Array.isArray(unwrapped)) return unwrapped
  if (unwrapped && Array.isArray(unwrapped.data)) return unwrapped.data
  return []
}

export const getBooksClient = (bibleId: number = DEFAULT_BIBLE_ID) =>
  getBooks(Number(bibleId))

/** Returns the full bible index (all books + chapters + verses metadata). */
export async function getBibleIndex(
  bibleId: number = DEFAULT_BIBLE_ID
): Promise<BibleIndex> {
  const raw = await apiFetch<APIResponse<BibleIndex> | BibleIndex>(
    `/api/bible/${bibleId}/index`
  )
  return unwrapApiData<BibleIndex>(raw)
}

export const getBibleIndexClient = (bibleId: number = DEFAULT_BIBLE_ID) =>
  getBibleIndex(Number(bibleId))

/** Returns a single book with its chapter/verse structure. */
export async function getBook(
  bibleId: number = DEFAULT_BIBLE_ID,
  bookId: string
): Promise<BibleIndexBook> {
  const raw = await apiFetch<APIResponse<BibleIndexBook> | BibleIndexBook>(
    `/api/bible/${bibleId}/books/${bookId}`
  )
  return unwrapApiData<BibleIndexBook>(raw)
}

/** Returns chapter list for a book (lightweight, no verse text). */
export async function getChapters(
  bibleId: number = DEFAULT_BIBLE_ID,
  bookId: string
): Promise<ChapterCollectionItem[]> {
  const raw = await apiFetch<
    APIResponse<CollectionEnvelope<ChapterCollectionItem>> |
    CollectionEnvelope<ChapterCollectionItem> |
    ChapterCollectionItem[]
  >(`/api/bible/${bibleId}/books/${bookId}/chapters`)

  const unwrapped = unwrapApiData<
    CollectionEnvelope<ChapterCollectionItem> | ChapterCollectionItem[]
  >(raw)

  if (Array.isArray(unwrapped)) return unwrapped
  if (unwrapped && Array.isArray(unwrapped.data)) return unwrapped.data
  return []
}

/**
 * Returns a single chapter with its verse list.
 * Resolves each verse into text passages for the UI.
 */
export async function getChapter(
  bibleId: number = DEFAULT_BIBLE_ID,
  bookId: string,
  chapterId: string
): Promise<ResolvedChapter> {
  const rawChapter = await apiFetch<
    APIResponse<ChapterCollectionItem> | ChapterCollectionItem
  >(`/api/bible/${bibleId}/books/${bookId}/chapters/${chapterId}`)

  const chapter = unwrapApiData<ChapterCollectionItem>(rawChapter)

  const chapterPassageId = `${bookId}.${chapterId}`

  const rawPassage = await apiFetch<
    APIResponse<BiblePassage> | BiblePassage
  >(`/api/bible/${bibleId}/passages/${chapterPassageId}?format=text`)

  const passage = unwrapApiData<BiblePassage>(rawPassage)

  const resolvedVerses: ResolvedVerse[] = (chapter.verses ?? []).map(
    (v: VerseCollectionItem, idx: number) => {
      const pid = String(
        (v as { passage_id?: string; passageId?: string }).passage_id ??
          (v as { passage_id?: string; passageId?: string }).passageId ??
          ''
      )

      const parts = pid.split('.')
      const verseNum =
        parts[parts.length - 1] ??
        String((v as { id?: unknown }).id ?? idx + 1)

      return {
        id: pid,
        number: verseNum,
        reference: pid
          .replace(/\./g, ' ')
          .replace(/(\w+)\s(\d+)\s(\d+)/, '$1 $2:$3'),
        content: '',
      }
    }
  )

  const verseTexts = await Promise.allSettled(
    resolvedVerses.map((v) =>
      apiFetch<APIResponse<BiblePassage> | BiblePassage>(
        `/api/bible/${bibleId}/passages/${v.id}?format=text`
      )
    )
  )

  verseTexts.forEach((result, idx) => {
    if (result.status === 'fulfilled') {
      const value = unwrapApiData<BiblePassage>(result.value)
      resolvedVerses[idx].content = value.content ?? ''
      if (value.reference) {
        resolvedVerses[idx].reference = value.reference
      }
    }
  })

  return {
    passage_id: passage.id,
    reference: passage.reference,
    verseCount: resolvedVerses.length,
    verses: resolvedVerses.filter((v) => v.content.trim() !== ''),
  }
}

export const getChapterClient = (
  bibleId: number = DEFAULT_BIBLE_ID,
  bookId: string,
  chapter: string
) => getChapter(Number(bibleId), bookId, chapter)

/** Fetches any arbitrary passage by its passage_id. */
export async function getPassage(
  bibleId: number = DEFAULT_BIBLE_ID,
  passageId: string,
  format: 'text' | 'html' = 'text'
): Promise<BiblePassage> {
  const raw = await apiFetch<APIResponse<BiblePassage> | BiblePassage>(
    `/api/bible/${bibleId}/passages/${passageId}?format=${format}`
  )
  return unwrapApiData<BiblePassage>(raw)
}

/** Returns today's verse of the day passage. */
export async function getVerseOfDay(
  bibleId: number = DEFAULT_BIBLE_ID
): Promise<BiblePassage> {
  const now = new Date()
  const dayOfYear = Math.ceil(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  )

  const raw = await apiFetch<APIResponse<BiblePassage> | BiblePassage>(
    `/api/bible/verse-of-day/${dayOfYear}?bible_id=${bibleId}&format=text`
  )

  return unwrapApiData<BiblePassage>(raw)
}

export const getVerseOfDayClient = (bibleId: number = DEFAULT_BIBLE_ID) =>
  getVerseOfDay(Number(bibleId))

export async function listHighlights(
  bibleId: number,
  passageId: string,
  token: string
): Promise<Highlight[]> {
  const raw = await apiFetch<
    APIResponse<{ data: Highlight[] }> | { data: Highlight[] }
  >(`/api/bible/highlights?bible_id=${bibleId}&passage_id=${passageId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const unwrapped = unwrapApiData<{ data: Highlight[] }>(raw)
  return Array.isArray(unwrapped?.data) ? unwrapped.data : []
}

export async function createHighlight(
  req: HighlightRequest,
  token: string
): Promise<Highlight> {
  const raw = await apiFetch<APIResponse<Highlight> | Highlight>(
    '/api/bible/highlights',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    }
  )

  return unwrapApiData<Highlight>(raw)
}

export async function deleteHighlight(
  bibleId: number,
  passageId: string,
  token: string
): Promise<void> {
  await apiFetch<void>(
    `/api/bible/highlights/${passageId}?bible_id=${bibleId}`,
    {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
}