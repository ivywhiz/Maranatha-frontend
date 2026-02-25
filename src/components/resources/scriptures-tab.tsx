"use client"

import { useState, useMemo } from "react"
import { ChevronDown, BookOpen, Search } from "lucide-react"
import {
  OLD_TESTAMENT,
  NEW_TESTAMENT,
  BIBLE_VERSIONS,
  SAMPLE_VERSES,
  type TestamentTab,
  type BibleBook,
  type BibleVerse,
} from "./bible-data"

// ── Reusable styled select ──────────────────────────────────────────
interface SelectProps {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder?: string
  disabled?: boolean
}

function Select({ label, value, onChange, options, placeholder = "Select", disabled = false }: SelectProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full appearance-none rounded-xl border px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 transition-colors ${
            disabled
              ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
              : "bg-white border-gray-200 text-gray-700 cursor-pointer hover:border-violet-300"
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((o: string) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown
          className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none ${
            disabled ? "text-gray-300" : "text-gray-400"
          }`}
        />
      </div>
    </div>
  )
}

// ── Main component ──────────────────────────────────────────────────
export default function ScripturesTab() {
  const [testament, setTestament] = useState<TestamentTab>("new")
  const [book, setBook] = useState<string>("")
  const [chapter, setChapter] = useState<string>("")
  const [verse, setVerse] = useState<string>("")
  const [version, setVersion] = useState<string>("NKJV")
  const [bookSearch, setBookSearch] = useState<string>("")

  const books: BibleBook[] = testament === "old" ? OLD_TESTAMENT : NEW_TESTAMENT

  const filteredBooks: BibleBook[] = useMemo(
    () => books.filter((b: BibleBook) => b.name.toLowerCase().includes(bookSearch.toLowerCase())),
    [books, bookSearch]
  )

  const selectedBook: BibleBook | undefined = books.find((b: BibleBook) => b.name === book)

  const chapterOptions: string[] = selectedBook
    ? Array.from({ length: selectedBook.chapters }, (_, i) => String(i + 1))
    : []

  const verseKey: string = book && chapter ? `${book}-${chapter}` : ""
  const verses: BibleVerse[] = SAMPLE_VERSES[verseKey] ?? []

  const displayedVerses: BibleVerse[] = verse && verses.length > 0
    ? verses.filter((v: BibleVerse) => v.verse === Number(verse))
    : verses

  const verseOptions: string[] = verses.map((v: BibleVerse) => String(v.verse))

  const handleBookChange = (b: string) => {
    setBook(b)
    setChapter("")
    setVerse("")
    setBookSearch("")
  }

  const handleTestamentChange = (t: TestamentTab) => {
    setTestament(t)
    setBook("")
    setChapter("")
    setVerse("")
    setBookSearch("")
  }

  const handleChapterChange = (c: string) => {
    setChapter(c)
    setVerse("")
  }

  const hasResults: boolean = !!(book && chapter)

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 items-start">

        {/* ── LEFT PANEL ── */}
        <div className="space-y-5 bg-[#FAFAFA] rounded-2xl border border-gray-100 p-6">

          {/* Testament toggle */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Testament
            </p>
            <div className="flex rounded-xl overflow-hidden border border-gray-200 bg-white">
              {(["old", "new"] as TestamentTab[]).map((t: TestamentTab) => (
                <button
                  key={t}
                  onClick={() => handleTestamentChange(t)}
                  className={`flex-1 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    testament === t ? "text-white" : "text-gray-500 hover:text-gray-700"
                  }`}
                  style={testament === t ? { backgroundColor: "#41076A" } : {}}
                >
                  {t === "old" ? "Old Testament" : "New Testament"}
                </button>
              ))}
            </div>
          </div>

          {/* Book search + scrollable list */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Book</p>
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search book..."
                value={bookSearch}
                onChange={(e) => setBookSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-violet-300"
              />
            </div>
            <div className="max-h-52 overflow-y-auto rounded-xl border border-gray-200 bg-white divide-y divide-gray-50">
              {filteredBooks.map((b: BibleBook) => (
                <button
                  key={b.name}
                  onClick={() => handleBookChange(b.name)}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    book === b.name
                      ? "font-semibold text-white"
                      : "text-gray-700 hover:bg-violet-50 hover:text-violet-700"
                  }`}
                  style={book === b.name ? { backgroundColor: "#800080" } : {}}
                >
                  {b.name}
                </button>
              ))}
              {filteredBooks.length === 0 && (
                <p className="px-4 py-3 text-sm text-gray-400 text-center">No books found</p>
              )}
            </div>
          </div>

          {/* Chapter */}
          <Select
            label="Chapter"
            value={chapter}
            onChange={handleChapterChange}
            options={chapterOptions}
            placeholder={selectedBook ? "Select chapter" : "Select a book first"}
            disabled={!selectedBook}
          />

          {/* Verse — optional */}
          <Select
            label="Verse (optional)"
            value={verse}
            onChange={setVerse}
            options={verseOptions}
            placeholder={chapter ? "All verses" : "Select chapter first"}
            disabled={!chapter || verseOptions.length === 0}
          />

          {/* Version */}
          <Select
            label="Version"
            value={version}
            onChange={setVersion}
            options={BIBLE_VERSIONS}
          />
        </div>

        {/* ── RIGHT PANEL — verses ── */}
        <div className="min-h-[400px]">
          {!hasResults ? (
            <div className="flex flex-col items-center justify-center h-80 text-center space-y-4">
              <div
                className="h-16 w-16 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "#F5F0FB" }}
              >
                <BookOpen className="h-8 w-8" style={{ color: "#800080" }} />
              </div>
              <div className="space-y-1">
                <p className="text-base font-semibold text-gray-700">Select a book and chapter</p>
                <p className="text-sm text-gray-400 max-w-xs">
                  Choose your testament, pick a book, then select a chapter to start reading.
                </p>
              </div>
            </div>
          ) : displayedVerses.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-80 text-center space-y-3">
              <BookOpen className="h-10 w-10 text-gray-300" />
              <p className="text-sm text-gray-400">
                Connect a Bible API to load {book} {chapter} ({version})
              </p>
              <p className="text-xs text-gray-300">
                Recommended: scripture.api.bible
              </p>
            </div>
          ) : (
            <div>
              {/* Passage header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {book} {chapter}{verse ? `:${verse}` : ""}
                  </h3>
                  <p className="text-sm text-gray-400 mt-0.5">{version}</p>
                </div>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#F5F0FB", color: "#800080" }}
                >
                  {testament === "old" ? "Old Testament" : "New Testament"}
                </span>
              </div>

              {/* Verses */}
              <div className="space-y-5">
                {displayedVerses.map((v: BibleVerse) => (
                  <div key={v.verse} className="flex items-start gap-4">
                    <span
                      className="text-xs font-bold mt-1.5 w-6 text-right shrink-0"
                      style={{ color: "#800080" }}
                    >
                      {v.verse}
                    </span>
                    <p className="text-gray-700 text-base leading-relaxed flex-1">{v.text}</p>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-xs text-gray-300 text-center">
                Sample data · Connect a Bible API for full content
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}