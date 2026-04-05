// src/types/api.ts
// mirrors backend models exactly

// ─── Shared ───────────────────────────────────────────────────────────────────

export interface APIResponse<T> {
  success: boolean
  message?: string
  data?: T
  error?: string
  meta?: PaginationMeta
}

export interface PaginationMeta {
  page: number
  page_size: number
  total_items: number
  total_pages: number
}

export interface CollectionEnvelope<T> {
  data: T[]
  next_page_token?: string
  total_size?: number
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AdminPublic {
  id: string
  email: string
  full_name: string
  role: 'super_admin' | 'editor'
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
  admin: AdminPublic
}

// ─── Teachings ────────────────────────────────────────────────────────────────

export interface Teaching {
  id: string
  title: string
  description?: string
  video_url: string
  video_type: 'youtube' | 'vimeo'
  thumbnail_url?: string
  category?: string
  tags: string[]
  views: number
  is_published: boolean
  published_at?: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface CreateTeachingRequest {
  title: string
  description?: string
  video_url: string
  video_type: 'youtube' | 'vimeo'
  thumbnail_url?: string
  category?: string
  tags?: string[]
  is_published?: boolean
}

export type UpdateTeachingRequest = Partial<CreateTeachingRequest>

export interface TeachingFilters {
  page?: number
  page_size?: number
  category?: string
  tag?: string
  q?: string
}

// ─── Comments ─────────────────────────────────────────────────────────────────

export interface CommentPublic {
  id: string
  teaching_id: string
  guest_name: string
  content: string
  created_at: string
}

export interface Comment extends CommentPublic {
  guest_email: string
  status: 'pending' | 'approved' | 'rejected'
  ai_moderation_score?: number
  ai_moderation_reason?: string
  moderated_at?: string
  updated_at: string
}

export interface SubmitCommentRequest {
  guest_name: string
  guest_email: string
  content: string
}

// ─── Events ───────────────────────────────────────────────────────────────────

export interface EventMedia {
  id: string
  event_id: string
  media_type: 'image' | 'video' | 'link'
  url: string
  caption?: string
  display_order: number
  uploaded_by: string
  created_at: string
}

export interface Event {
  id: string
  title: string
  description: string
  type: 'virtual' | 'physical' | 'hybrid'
  address?: string
  city?: string
  state?: string
  country?: string
  postal_code?: string
  latitude?: number
  longitude?: number
  virtual_link?: string
  virtual_platform?: string
  start_datetime: string
  end_datetime: string
  registration_link?: string
  max_attendees?: number
  status: 'draft' | 'upcoming' | 'ongoing' | 'past' | 'cancelled'
  organizer?: string
  media: EventMedia[]
  created_at: string
  updated_at: string
}

export interface EventFilters {
  page?: number
  page_size?: number
  country?: string
  within_days?: 7 | 30
  lat?: number
  lng?: number
  radius_km?: number
  q?: string
}

export interface CreateEventRequest {
  title: string
  description: string
  type: 'virtual' | 'physical' | 'hybrid'
  address?: string
  city?: string
  state?: string
  country?: string
  postal_code?: string
  latitude?: number
  longitude?: number
  virtual_link?: string
  virtual_platform?: string
  start_datetime: string
  end_datetime: string
  registration_link?: string
  max_attendees?: number
  status: 'draft' | 'upcoming'
  organizer?: string
}

// ─── Bible ────────────────────────────────────────────────────────────────────
// All shapes mirror the Go backend models exactly (snake_case from JSON tags).

export type BibleCanon = 'old_testament' | 'new_testament' | 'deuterocanon'

/** Mirrors Go: BibleVersion */
export interface BibleVersion {
  id: number
  abbreviation: string
  promotional_content: string
  copyright: string
  info: string
  publisher_url: string
  language_tag: string
  localized_abbreviation: string
  localized_title: string
  title: string
  books?: string[]
  youversion_deep_link: string
  organization_id: string
}

/** Mirrors Go: BibleIndexVerse */
export interface BibleIndexVerse {
  id: number
  passage_id: string
  title: unknown
}

/** Mirrors Go: BibleIndexChapter */
export interface BibleIndexChapter {
  id: number
  passage_id: string
  title: unknown
  verses: BibleIndexVerse[]
}

/** Mirrors Go: BibleIndexIntro */
export interface BibleIndexIntro {
  id: string
  passage_id: string
  title: string
}

/** Mirrors Go: BibleIndexBook */
export interface BibleIndexBook {
  id: string
  title: string
  full_title: string
  abbreviation: string
  canon: BibleCanon
  chapters: BibleIndexChapter[]
  intro?: BibleIndexIntro
}

/** Mirrors Go: BibleIndex */
export interface BibleIndex {
  text_direction: string
  books: BibleIndexBook[]
}

/** Mirrors Go: BookCollectionItem */
export interface BookCollectionItem {
  id: string
  title: string
  full_title: string
  abbreviation: string
  canon: BibleCanon
}

/** Mirrors Go: VerseCollectionItem */
export interface VerseCollectionItem {
  id: unknown
  passage_id: string
  title: unknown
}

/** Mirrors Go: ChapterCollectionItem */
export interface ChapterCollectionItem {
  id: number
  passage_id: string
  title: unknown
  verses: VerseCollectionItem[]
}

/** Mirrors Go: Passage */
export interface BiblePassage {
  id: string
  content: string
  reference: string
}

/** Mirrors Go: Highlight */
export interface Highlight {
  bible_id: number
  passage_id: string
  color: string
}

/** Mirrors Go: HighlightRequest */
export interface HighlightRequest {
  bible_id: number
  passage_id: string
  color: string
}

/** Mirrors Go: VerseOfTheDayCalendar */
export interface VerseOfTheDayCalendar {
  day: number
  passage_id: string
}

// ─── Convenience UI types (derived/augmented from backend models) ─────────────

/**
 * A fully resolved verse ready for the reader UI.
 * Derived from VerseCollectionItem + passage data.
 */
export interface ResolvedVerse {
  id: string
  number: string
  reference: string
  content: string
}

/**
 * A fully resolved chapter ready for the reader UI.
 */
export interface ResolvedChapter {
  passage_id: string
  reference: string
  verseCount: number
  verses: ResolvedVerse[]
}

// ─── Legacy aliases kept for backward compat with other parts of the app ─────
// These are the old AoT-style camelCase shapes some non-bible parts may still use.

export interface BibleTranslation {
  id: string
  name: string
  nameLocal: string
  abbreviation: string
  description: string
  language: {
    id: string
    name: string
    nameLocal: string
  }
}

export interface BibleBook {
  id: string
  bibleId: string
  abbreviation: string
  name: string
  nameLong: string
  canon: BibleCanon
  chapterCount: number
}

export interface BibleVerse {
  id: string
  number: string
  reference: string
  content: string
}

export interface BibleChapter {
  id: string
  bibleId: string
  bookId: string
  number: string
  reference: string
  content: string
  verseCount: number
  verses: BibleVerse[]
}

export interface BibleSearchResult {
  query: string
  bibleId: string
  verses: {
    id: string
    reference: string
    text: string
  }[]
  total: number
}

// ─── Verses by Topic ──────────────────────────────────────────────────────────

export interface VerseTopic {
  id: string
  slug: string
  label: string
  description?: string
  icon?: string
  sort_order: number
  created_at: string
}

export interface TopicVerse {
  id: string
  topic_id: string
  verse_reference: string
  verse_text: string
  translation: string
  note?: string
  sort_order: number
  created_at: string
}

export interface VerseTopicWithVerses extends VerseTopic {
  verses: TopicVerse[]
}

// ─── Donations ────────────────────────────────────────────────────────────────

export interface CreateIntentRequest {
  amount_cents: number
  currency?: string
  donor_name?: string
  donor_email?: string
  message?: string
  cover_fees?: boolean
  is_anonymous?: boolean
}

export interface CreateIntentResponse {
  client_secret: string
  payment_intent_id: string
  amount_cents: number
  fee_amount_cents: number
  total_cents: number
  currency: string
}

export interface Donation {
  id: string
  stripe_payment_id: string
  amount_cents: number
  fee_amount_cents: number
  total_cents: number
  currency: string
  donor_name?: string
  donor_email?: string
  message?: string
  cover_fees: boolean
  is_anonymous: boolean
  status: 'pending' | 'succeeded' | 'failed' | 'refunded'
  created_at: string
  updated_at: string
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

export interface SubscribeRequest {
  email: string
  name?: string
}

export interface SubscribeResponse {
  email: string
  subscribed: boolean
  subscribed_at: string
}

export interface SubscriptionStatus {
  subscribed: boolean
  status?: 'active' | 'unsubscribed'
}

// ─── Contact ──────────────────────────────────────────────────────────────────

export interface ContactRequest {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactResponse {
  submitted: boolean
}