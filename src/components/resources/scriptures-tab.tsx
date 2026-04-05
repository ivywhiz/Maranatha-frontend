'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Search,
  X,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import {
  useBibleBooks,
  useBibleChapter,
  useBibleTranslations,
  useVerseOfDay,
  resolveCanon,
  resolveChapterCount,
  useBibleIndex,
} from '../../lib/hooks/use-bible'
import { DEFAULT_BIBLE_ID } from '../../lib/api/bible'
import type { BibleCanon, BibleVersion, BookCollectionItem } from '../../types/api'

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function findPreferredBibleId(translations: BibleVersion[] = []): number {
  const niv =
    translations.find(
      (t) =>
        t.localized_abbreviation?.toUpperCase() === 'NIV' ||
        t.abbreviation?.toUpperCase() === 'NIV' ||
        t.abbreviation?.toUpperCase() === 'NIV11'
    ) ?? null

  const kjv =
    translations.find(
      (t) =>
        t.localized_abbreviation?.toUpperCase() === 'KJV' ||
        t.abbreviation?.toUpperCase() === 'KJV'
    ) ?? null

  return niv?.id ?? kjv?.id ?? translations[0]?.id ?? DEFAULT_BIBLE_ID
}

function TranslationSelector({
  translations,
  bibleId,
  loading,
  onChange,
}: {
  translations: BibleVersion[]
  bibleId: number
  loading: boolean
  onChange: (id: number) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const active = translations?.find((t) => t.id === bibleId) ?? null

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-2xl border border-amber-200/60 bg-amber-50/50 px-4 py-3 text-sm font-semibold text-stone-800 transition hover:bg-amber-50 dark:border-amber-800/30 dark:bg-amber-900/10 dark:text-amber-100 dark:hover:bg-amber-900/20"
      >
        <span>
          {loading ? (
            <span className="flex items-center gap-2 text-stone-400">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading…
            </span>
          ) : active ? (
            <span className="flex items-center gap-2">
              <span className="rounded-md bg-amber-900/10 px-2 py-0.5 font-mono text-xs font-bold tracking-wider text-amber-900 dark:bg-amber-400/20 dark:text-amber-300">
                {active.localized_abbreviation || active.abbreviation}
              </span>
              <span className="truncate text-stone-700 dark:text-stone-300">
                {active.localized_title || active.title}
              </span>
            </span>
          ) : (
            'Select translation'
          )}
        </span>
        <ChevronRight
          className={cn(
            'h-4 w-4 shrink-0 text-amber-700 transition-transform dark:text-amber-400',
            open && 'rotate-90'
          )}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-amber-200/60 bg-white shadow-xl dark:border-amber-800/30 dark:bg-stone-900">
          {translations.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                onChange(t.id)
                setOpen(false)
              }}
              className={cn(
                'flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-amber-50 dark:hover:bg-amber-900/20',
                t.id === bibleId && 'bg-amber-50 dark:bg-amber-900/20'
              )}
            >
              <span className="w-12 shrink-0 rounded font-mono text-xs font-bold text-amber-800 dark:text-amber-400">
                {t.localized_abbreviation || t.abbreviation}
              </span>
              <span className="flex-1 truncate text-stone-700 dark:text-stone-300">
                {t.localized_title || t.title}
              </span>
              {t.id === bibleId && (
                <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-amber-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function BookPicker({
  books,
  bookId,
  loading,
  onChange,
}: {
  books: BookCollectionItem[]
  bookId: string
  loading: boolean
  onChange: (id: string) => void
}) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return books
    const q = query.toLowerCase()
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.abbreviation.toLowerCase().includes(q)
    )
  }, [books, query])

  if (loading) {
    return (
      <div className="grid grid-cols-4 gap-1.5">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="h-9 animate-pulse rounded-xl bg-stone-100 dark:bg-stone-800"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books…"
          className="w-full rounded-xl border border-stone-200 bg-stone-50 py-2 pl-8 pr-8 text-xs outline-none transition focus:border-amber-400 focus:bg-white dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:focus:border-amber-500"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-4 gap-1">
        {filtered.map((book) => (
          <button
            key={book.id}
            type="button"
            onClick={() => onChange(book.id)}
            title={book.full_title || book.title}
            className={cn(
              'truncate rounded-xl px-2 py-2 text-center text-xs font-semibold transition',
              book.id === bookId
                ? 'bg-amber-900 text-amber-50 shadow-sm dark:bg-amber-500 dark:text-stone-900'
                : 'bg-stone-100 text-stone-700 hover:bg-amber-100 hover:text-amber-900 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-amber-900/30 dark:hover:text-amber-300'
            )}
          >
            {book.abbreviation}
          </button>
        ))}
      </div>
    </div>
  )
}

function ChapterGrid({
  count,
  chapter,
  onChange,
}: {
  count: number
  chapter: string
  onChange: (ch: string) => void
}) {
  return (
    <div className="grid grid-cols-6 gap-1 sm:grid-cols-8">
      {Array.from({ length: count }, (_, i) => String(i + 1)).map((ch) => (
        <button
          key={ch}
          type="button"
          onClick={() => onChange(ch)}
          className={cn(
            'rounded-xl py-2 text-xs font-bold transition',
            ch === chapter
              ? 'bg-amber-900 text-amber-50 shadow-sm dark:bg-amber-500 dark:text-stone-900'
              : 'bg-stone-100 text-stone-600 hover:bg-amber-100 hover:text-amber-900 dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-amber-900/30 dark:hover:text-amber-300'
          )}
        >
          {ch}
        </button>
      ))}
    </div>
  )
}

export default function ScripturesTab() {
  const [bibleId, setBibleId] = useState<number>(DEFAULT_BIBLE_ID)
  const [canon, setCanon] = useState<BibleCanon>('new_testament')
  const [bookId, setBookId] = useState('JHN')
  const [chapter, setChapter] = useState('3')
  const [selectedVerseId, setSelectedVerseId] = useState<string | null>(null)
  const [readerMode, setReaderMode] = useState<'verse' | 'chapter'>('verse')

  const verseRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const userSelectedRef = useRef(false)
  const didInitTranslationRef = useRef(false)

  const {
    data: rawTranslations,
    isLoading: translationsLoading,
  } = useBibleTranslations()

  const translations = Array.isArray(rawTranslations) ? rawTranslations : []

  const {
    data: rawBooks,
    isLoading: booksLoading,
  } = useBibleBooks(bibleId)

  const books = Array.isArray(rawBooks) ? rawBooks : []

  const { data: indexData } = useBibleIndex(bibleId)

  const {
    data: chapterData,
    isLoading: chapterLoading,
    isFetching: chapterFetching,
    error: chapterError,
  } = useBibleChapter(bibleId, bookId, chapter, !!bibleId && !!bookId && !!chapter)

  const { data: verseOfDay } = useVerseOfDay(bibleId)

  useEffect(() => {
    if (didInitTranslationRef.current) return
    if (!Array.isArray(translations) || translations.length === 0) return

    const preferred = findPreferredBibleId(translations)
    didInitTranslationRef.current = true
    setBibleId(preferred)
  }, [translations])

  const filteredBooks = useMemo(
    () => books.filter((b) => resolveCanon(b) === canon),
    [books, canon]
  )

  useEffect(() => {
    if (!filteredBooks.length) return
    if (!filteredBooks.some((b) => b.id === bookId)) {
      setBookId(filteredBooks[0].id)
      setChapter('1')
      setSelectedVerseId(null)
    }
  }, [filteredBooks, bookId])

  const currentBook = useMemo(
    () =>
      filteredBooks.find((b) => b.id === bookId) ??
      books.find((b) => b.id === bookId) ??
      null,
    [filteredBooks, books, bookId]
  )

  const chapterCount = useMemo(
    () => resolveChapterCount(bookId, indexData?.books),
    [bookId, indexData]
  )

  const selectedVerse = useMemo(
    () => chapterData?.verses?.find((v) => v.id === selectedVerseId) ?? null,
    [chapterData, selectedVerseId]
  )

  const activeTranslation =
    translations.find((t) => t.id === bibleId) ?? null

  useEffect(() => {
    if (userSelectedRef.current) return
    if (!chapterData?.verses?.length || bookId !== 'JHN' || chapter !== '3') return
    const verse16 = chapterData.verses.find((v) => v.number === '16')
    if (verse16) setSelectedVerseId(verse16.id)
  }, [chapterData, bookId, chapter])

  useEffect(() => {
    if (!selectedVerseId) return
    const el = verseRefs.current[selectedVerseId]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [selectedVerseId])

  const goPrevChapter = () => {
    const cur = Number(chapter)
    if (cur > 1) {
      setChapter(String(cur - 1))
      setSelectedVerseId(null)
    }
  }

  const goNextChapter = () => {
    const cur = Number(chapter)
    if (cur < chapterCount) {
      setChapter(String(cur + 1))
      setSelectedVerseId(null)
    }
  }

  return (
    <section className="w-full font-serif">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600&display=swap');
        .scripture-font { font-family: 'Lora', Georgia, serif; }
        .ui-font { font-family: 'DM Sans', system-ui, sans-serif; }
        .verse-fade-in { animation: verseFade 0.35s ease both; }
        @keyframes verseFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .drop-cap::first-letter {
          float: left; font-size: 3.2em; line-height: 0.8; padding-right: 0.1em;
          padding-top: 0.05em; font-weight: 700; color: #92400e;
        }
        .dark .drop-cap::first-letter { color: #fbbf24; }
      `}</style>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="ui-font space-y-4">
          <div className="overflow-hidden rounded-3xl border border-amber-200/60 bg-white shadow-sm dark:border-amber-900/30 dark:bg-stone-900">
            <div className="border-b border-amber-100 bg-gradient-to-br from-amber-50 to-stone-50 px-5 py-4 dark:border-amber-900/20 dark:from-stone-900 dark:to-stone-900">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-900 text-amber-50 dark:bg-amber-500 dark:text-stone-900">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="scripture-font text-base font-semibold text-stone-900 dark:text-stone-100">
                    Scripture Reader
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Navigate the Holy Bible
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                  Translation
                </label>
                <TranslationSelector
                  translations={translations}
                  bibleId={bibleId}
                  loading={translationsLoading}
                  onChange={(id) => {
                    setBibleId(id)
                    setSelectedVerseId(null)
                  }}
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                  Testament
                </label>
                <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-stone-100 p-1 dark:bg-stone-800">
                  {(['old_testament', 'new_testament'] as BibleCanon[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCanon(c)}
                      className={cn(
                        'rounded-xl py-2 text-xs font-semibold transition',
                        canon === c
                          ? 'bg-white text-amber-900 shadow-sm dark:bg-stone-950 dark:text-amber-400'
                          : 'text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200'
                      )}
                    >
                      {c === 'old_testament' ? 'Old Testament' : 'New Testament'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                  Book —{' '}
                  <span className="normal-case font-medium text-stone-700 dark:text-stone-300">
                    {currentBook?.title ?? '—'}
                  </span>
                </label>
                <BookPicker
                  books={filteredBooks}
                  bookId={bookId}
                  loading={booksLoading}
                  onChange={(id) => {
                    setBookId(id)
                    setChapter('1')
                    setSelectedVerseId(null)
                  }}
                />
              </div>

              {chapterCount > 0 && (
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                    Chapter —{' '}
                    <span className="normal-case font-medium text-stone-700 dark:text-stone-300">
                      {chapter}
                    </span>
                  </label>
                  <ChapterGrid
                    count={chapterCount}
                    chapter={chapter}
                    onChange={(ch) => {
                      setChapter(ch)
                      setSelectedVerseId(null)
                    }}
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                  Reading Mode
                </label>
                <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-stone-100 p-1 dark:bg-stone-800">
                  {(['verse', 'chapter'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setReaderMode(mode)}
                      className={cn(
                        'rounded-xl py-2 text-xs font-semibold transition',
                        readerMode === mode
                          ? 'bg-white text-amber-900 shadow-sm dark:bg-stone-950 dark:text-amber-400'
                          : 'text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200'
                      )}
                    >
                      {mode === 'verse' ? 'Verse by Verse' : 'Chapter Flow'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {verseOfDay && (
            <div className="relative overflow-hidden rounded-3xl border border-amber-200/60 bg-gradient-to-br from-amber-50 via-amber-50/60 to-white p-5 shadow-sm dark:border-amber-800/30 dark:from-amber-900/20 dark:via-amber-900/10 dark:to-stone-900">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-amber-200/30 dark:bg-amber-600/10" />
              <div className="relative">
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <span className="ui-font text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400">
                    Verse of the Day
                  </span>
                </div>
                <p className="scripture-font mb-3 text-sm italic leading-7 text-stone-700 dark:text-stone-200">
                  &ldquo;{verseOfDay.content}&rdquo;
                </p>
                <p className="ui-font text-xs font-semibold text-amber-900 dark:text-amber-400">
                  — {verseOfDay.reference}
                </p>
              </div>
            </div>
          )}

          {selectedVerse && (
            <div className="rounded-3xl border border-sky-200/60 bg-gradient-to-br from-sky-50 to-white p-5 shadow-sm dark:border-sky-800/30 dark:from-sky-900/20 dark:to-stone-900">
              <p className="ui-font mb-3 text-xs font-bold uppercase tracking-widest text-sky-700 dark:text-sky-400">
                Selected Verse
              </p>
              <p className="scripture-font text-sm leading-7 text-stone-700 dark:text-stone-200">
                {selectedVerse.content}
              </p>
              <p className="ui-font mt-3 text-xs font-semibold text-sky-800 dark:text-sky-400">
                {selectedVerse.reference}
              </p>
            </div>
          )}
        </aside>

        <div className="min-w-0">
          <div className="overflow-hidden rounded-3xl border border-amber-200/60 bg-white shadow-sm dark:border-amber-900/30 dark:bg-stone-900">
            <div className="sticky top-0 z-10 border-b border-amber-100 bg-white/95 px-6 py-4 backdrop-blur dark:border-amber-900/20 dark:bg-stone-900/95">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="ui-font text-xs font-semibold uppercase tracking-[0.2em] text-amber-800/60 dark:text-amber-500/60">
                    {activeTranslation?.localized_abbreviation ||
                      activeTranslation?.abbreviation ||
                      ''}
                  </p>
                  <h1 className="scripture-font mt-0.5 text-2xl font-semibold text-stone-900 dark:text-stone-100">
                    {chapterData?.reference || `${currentBook?.title ?? 'John'} ${chapter}`}
                  </h1>
                </div>

                <div className="ui-font flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrevChapter}
                    disabled={Number(chapter) <= 1}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-stone-200 text-stone-600 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-900 disabled:cursor-not-allowed disabled:opacity-30 dark:border-stone-700 dark:text-stone-400 dark:hover:border-amber-700 dark:hover:bg-amber-900/20 dark:hover:text-amber-400"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="min-w-[3ch] text-center text-sm font-semibold text-stone-700 dark:text-stone-300">
                    {chapter}
                  </span>
                  <button
                    type="button"
                    onClick={goNextChapter}
                    disabled={Number(chapter) >= chapterCount}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-stone-200 text-stone-600 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-900 disabled:cursor-not-allowed disabled:opacity-30 dark:border-stone-700 dark:text-stone-400 dark:hover:border-amber-700 dark:hover:bg-amber-900/20 dark:hover:text-amber-400"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="px-6 py-8 sm:px-10 sm:py-10">
              {(chapterLoading || chapterFetching) && (
                <div className="space-y-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-stone-100 dark:bg-stone-800" />
                      <div className="flex-1 space-y-2 pt-1">
                        <div
                          className="h-4 animate-pulse rounded bg-stone-100 dark:bg-stone-800"
                          style={{ width: `${75 + (i % 3) * 8}%` }}
                        />
                        <div
                          className="h-4 animate-pulse rounded bg-stone-100 dark:bg-stone-800"
                          style={{ width: `${50 + (i % 4) * 10}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!chapterLoading && !chapterFetching && chapterError && (
                <div className="flex flex-col items-center gap-4 py-20 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-red-100 dark:bg-red-900/30">
                    <AlertCircle className="h-7 w-7 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="scripture-font text-base font-semibold text-stone-700 dark:text-stone-300">
                      Could not load chapter
                    </p>
                    <p className="ui-font mt-1 text-sm text-stone-400 dark:text-stone-500">
                      {(chapterError as Error)?.message ?? 'Please try again.'}
                    </p>
                  </div>
                </div>
              )}

              {!chapterLoading &&
                !chapterFetching &&
                chapterData &&
                !!chapterData.verses?.length &&
                readerMode === 'chapter' && (
                  <div className="rounded-3xl bg-amber-50/40 p-6 dark:bg-stone-950/60 sm:p-8">
                    <div className="scripture-font space-y-0 text-[1.05rem] leading-[1.9] text-stone-800 dark:text-stone-200">
                      {chapterData.verses.map((verse) => (
                        <span
                          key={verse.id}
                          onClick={() => {
                            userSelectedRef.current = true
                            setSelectedVerseId(verse.id)
                          }}
                          className={cn(
                            'mr-1 inline cursor-pointer rounded-lg px-1 py-0.5 transition',
                            selectedVerseId === verse.id
                              ? 'bg-amber-300/70 text-amber-950 dark:bg-amber-500/40 dark:text-amber-100'
                              : 'hover:bg-amber-100/60 dark:hover:bg-amber-900/20'
                          )}
                        >
                          <sup className="mr-0.5 select-none font-mono text-[0.6rem] font-bold text-amber-700/70 dark:text-amber-500/70">
                            {verse.number}
                          </sup>
                          {verse.content}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {!chapterLoading &&
                !chapterFetching &&
                chapterData &&
                !!chapterData.verses?.length &&
                readerMode === 'verse' && (
                  <div className="space-y-2">
                    {chapterData.verses.map((verse, i) => (
                      <button
                        key={verse.id}
                        ref={(el) => {
                          verseRefs.current[verse.id] = el
                        }}
                        type="button"
                        onClick={() => {
                          userSelectedRef.current = true
                          setSelectedVerseId(
                            verse.id === selectedVerseId ? null : verse.id
                          )
                        }}
                        style={{ animationDelay: `${Math.min(i * 20, 300)}ms` }}
                        className={cn(
                          'verse-fade-in block w-full rounded-2xl border px-5 py-4 text-left transition',
                          selectedVerseId === verse.id
                            ? 'border-amber-300 bg-gradient-to-r from-amber-50 to-amber-50/30 shadow-sm dark:border-amber-600/50 dark:from-amber-900/20 dark:to-transparent'
                            : 'border-transparent hover:border-stone-200 hover:bg-stone-50/60 dark:hover:border-stone-700 dark:hover:bg-stone-800/40'
                        )}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              'ui-font flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition',
                              selectedVerseId === verse.id
                                ? 'bg-amber-900 text-amber-50 dark:bg-amber-500 dark:text-stone-900'
                                : 'bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400'
                            )}
                          >
                            {verse.number}
                          </div>
                          <div className="min-w-0 flex-1 pt-0.5">
                            <p
                              className={cn(
                                'scripture-font text-[0.975rem] leading-8 transition',
                                selectedVerseId === verse.id
                                  ? 'text-stone-900 dark:text-stone-100'
                                  : 'text-stone-700 dark:text-stone-300'
                              )}
                            >
                              {verse.content}
                            </p>
                            {selectedVerseId === verse.id && (
                              <p className="ui-font mt-1.5 text-xs font-semibold text-amber-800/70 dark:text-amber-400/70">
                                {verse.reference}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

              {!chapterLoading && !chapterFetching && !chapterData && !chapterError && (
                <div className="flex flex-col items-center gap-4 py-20 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-100 dark:bg-amber-900/30">
                    <BookOpen className="h-8 w-8 text-amber-700 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="scripture-font text-lg font-semibold text-stone-700 dark:text-stone-300">
                      Open the Word
                    </p>
                    <p className="ui-font mt-1 text-sm text-stone-400 dark:text-stone-500">
                      Select a translation, book, and chapter to begin reading.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {chapterData && (
              <div className="ui-font border-t border-amber-100 px-6 py-4 dark:border-amber-900/20">
                <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                  <button
                    type="button"
                    onClick={goPrevChapter}
                    disabled={Number(chapter) <= 1}
                    className="flex items-center gap-1 font-semibold transition hover:text-amber-800 disabled:opacity-30 dark:hover:text-amber-400"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    {Number(chapter) > 1
                      ? `${currentBook?.title} ${Number(chapter) - 1}`
                      : 'Previous'}
                  </button>
                  <span className="font-medium">{chapterData.verseCount} verses</span>
                  <button
                    type="button"
                    onClick={goNextChapter}
                    disabled={Number(chapter) >= chapterCount}
                    className="flex items-center gap-1 font-semibold transition hover:text-amber-800 disabled:opacity-30 dark:hover:text-amber-400"
                  >
                    {Number(chapter) < chapterCount
                      ? `${currentBook?.title} ${Number(chapter) + 1}`
                      : 'Next'}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}