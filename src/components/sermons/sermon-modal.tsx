"use client"

import { useRef, useState, useEffect, useCallback, useMemo } from "react"
import {
  X, Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  SkipBack, SkipForward, Rewind, FastForward,
  Send, User, MessageCircle
} from "lucide-react"

export interface Sermon {
  id: number
  title: string
  description: string
  thumbnail: string
  videoUrl?: string
  duration: string
  tags: string[]
  timeAgo: string
  prayerPoints: string[]
  comments: { name: string; text: string; timeAgo?: string }[]
}

interface SermonModalProps {
  sermon: Sermon | null
  onClose: () => void
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export default function SermonModal({ sermon, onClose }: SermonModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const commentsEndRef = useRef<HTMLDivElement>(null)

  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [controlsTimer, setControlsTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
  const [commentName, setCommentName] = useState("")
  const [commentText, setCommentText] = useState("")
  // FIX: Derive initial comments from sermon prop without useEffect setState
  const [extraComments, setExtraComments] = useState<{ name: string; text: string; timeAgo?: string }[]>([])
  const [tab, setTab] = useState<"prayer" | "comments">("prayer")
  const [buffered, setBuffered] = useState(0)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  // FIX: Track which sermon id we've initialized for, reset extras when sermon changes
  const prevSermonIdRef = useRef<number | undefined>(undefined)
  if (sermon?.id !== prevSermonIdRef.current) {
    prevSermonIdRef.current = sermon?.id
    // Reset derived state synchronously during render (safe, no cascading effect)
    if (extraComments.length > 0) setExtraComments([])
  }

  // FIX: Combine base sermon comments with user-added comments via useMemo (no setState in effect)
  const localComments = useMemo(
    () => [...extraComments, ...(sermon?.comments ?? [])],
    [extraComments, sermon?.comments]
  )

  // Reset video state when sermon changes — only touches non-React external systems
  useEffect(() => {
    if (!sermon) return
    setPlaying(false)
    setCurrentTime(0)
    setCommentName("")
    setCommentText("")
    const v = videoRef.current
    if (v) {
      v.pause()
      v.currentTime = 0
    }
  }, [sermon?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (tab === "comments") {
      commentsEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [localComments, tab])

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (playing) { v.pause(); setPlaying(false) }
    else { v.play().catch(() => {}); setPlaying(true) }
  }, [playing])

  const skip = useCallback((secs: number) => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + secs))
  }, [])

  const toggleMute = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = !muted
    setMuted(!muted)
  }, [muted])

  useEffect(() => {
    if (!sermon) return
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.code === "Space") { e.preventDefault(); togglePlay() }
      if (e.code === "ArrowRight") skip(10)
      if (e.code === "ArrowLeft") skip(-10)
      if (e.code === "KeyM") toggleMute()
      if (e.code === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [sermon, togglePlay, skip, toggleMute, onClose])

  const resetControlsTimer = useCallback(() => {
    setShowControls(true)
    if (controlsTimer) clearTimeout(controlsTimer)
    const t = setTimeout(() => { if (playing) setShowControls(false) }, 3000)
    setControlsTimer(t)
  }, [controlsTimer, playing])

  const handleProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = progressRef.current
    const v = videoRef.current
    if (!el || !v) return
    const rect = el.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    v.currentTime = pct * v.duration
  }

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current
    const val = parseFloat(e.target.value)
    if (!v) return
    v.volume = val
    setVolume(val)
    setMuted(val === 0)
    v.muted = val === 0
  }

  const toggleFullscreen = async () => {
    const el = containerRef.current
    if (!el) return
    if (!document.fullscreenElement) {
      await el.requestFullscreen()
      setFullscreen(true)
    } else {
      await document.exitFullscreen()
      setFullscreen(false)
    }
  }

  const submitComment = () => {
    if (!commentName.trim() || !commentText.trim()) return
    const newComment = {
      name: commentName.trim(),
      text: commentText.trim(),
      timeAgo: "Just now"
    }
    // Prepend to extraComments so it merges correctly with sermon.comments
    setExtraComments((prev) => [newComment, ...prev])
    setCommentName("")
    setCommentText("")
  }

  if (!sermon) return null

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal container — YouTube-style: fills viewport, single scroll */}
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-3 sm:p-6">
        <div
          className="relative w-full max-w-6xl bg-[#0F0A1A] rounded-2xl shadow-2xl overflow-hidden pointer-events-auto my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* ── YOUTUBE-STYLE LAYOUT ── */}
          {/* On mobile: stacked. On desktop: video left (sticky), content right (scrolls) */}
          <div className="flex flex-col lg:flex-row lg:items-start">

            {/* LEFT COLUMN — Sticky video player */}
            <div className="lg:sticky lg:top-0 w-full lg:w-[60%] xl:w-[65%] flex-shrink-0 bg-black">
              <div
                ref={containerRef}
                className="relative w-full"
                style={{ aspectRatio: "16/9" }}
                onMouseMove={resetControlsTimer}
                onMouseLeave={() => { if (playing) setShowControls(false) }}
                onClick={togglePlay}
              >
                {sermon.videoUrl ? (
                  <video
                    ref={videoRef}
                    src={sermon.videoUrl}
                    className="w-full h-full object-contain"
                    poster={sermon.thumbnail}
                    onTimeUpdate={() => {
                      const v = videoRef.current
                      if (!v) return
                      setCurrentTime(v.currentTime)
                      if (v.buffered.length) setBuffered((v.buffered.end(0) / v.duration) * 100)
                    }}
                    onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
                    onEnded={() => setPlaying(false)}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                  />
                ) : (
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${sermon.thumbnail})` }}
                  />
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 pointer-events-none" />

                {/* Big play button */}
                {!playing && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-20 h-20 rounded-full bg-[#800080]/90 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                      <Play className="w-9 h-9 text-white fill-white ml-1" />
                    </div>
                  </div>
                )}

                {/* Controls */}
                <div
                  className={`absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10 transition-opacity duration-300 ${
                    showControls || !playing ? "opacity-100" : "opacity-0"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Progress bar */}
                  <div className="mb-3 group/bar">
                    <div
                      ref={progressRef}
                      className="relative h-1.5 hover:h-2.5 bg-white/20 rounded-full cursor-pointer transition-all duration-150"
                      onClick={handleProgress}
                    >
                      <div className="absolute inset-y-0 left-0 bg-white/30 rounded-full" style={{ width: `${buffered}%` }} />
                      <div className="absolute inset-y-0 left-0 bg-[#800080] rounded-full" style={{ width: `${progress}%` }} />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity"
                        style={{ left: `calc(${progress}% - 7px)` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-[10px] text-white/50">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration || 0)}</span>
                    </div>
                  </div>

                  {/* Buttons row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button onClick={() => skip(-10)} className="w-9 h-9 flex items-center justify-center text-white hover:text-[#E99E2E] transition-colors rounded-lg hover:bg-white/10">
                        <Rewind className="w-4 h-4" />
                      </button>
                      <button onClick={() => skip(-30)} className="w-9 h-9 flex items-center justify-center text-white hover:text-[#E99E2E] transition-colors rounded-lg hover:bg-white/10">
                        <SkipBack className="w-4 h-4" />
                      </button>
                      <button onClick={togglePlay} className="w-11 h-11 rounded-full bg-[#800080] hover:bg-[#9a009a] flex items-center justify-center shadow-lg transition-colors mx-1">
                        {playing ? <Pause className="w-5 h-5 text-white fill-white" /> : <Play className="w-5 h-5 text-white fill-white ml-0.5" />}
                      </button>
                      <button onClick={() => skip(30)} className="w-9 h-9 flex items-center justify-center text-white hover:text-[#E99E2E] transition-colors rounded-lg hover:bg-white/10">
                        <SkipForward className="w-4 h-4" />
                      </button>
                      <button onClick={() => skip(10)} className="w-9 h-9 flex items-center justify-center text-white hover:text-[#E99E2E] transition-colors rounded-lg hover:bg-white/10">
                        <FastForward className="w-4 h-4" />
                      </button>

                      {/* Volume */}
                      <div className="relative flex items-center gap-1">
                        <button
                          onClick={toggleMute}
                          onMouseEnter={() => setShowVolumeSlider(true)}
                          className="w-9 h-9 flex items-center justify-center text-white hover:text-[#E99E2E] transition-colors rounded-lg hover:bg-white/10"
                        >
                          {muted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        {showVolumeSlider && (
                          <div className="flex items-center" onMouseLeave={() => setShowVolumeSlider(false)}>
                            <input
                              type="range" min={0} max={1} step={0.05}
                              value={muted ? 0 : volume}
                              onChange={handleVolume}
                              className="w-20 accent-[#800080] cursor-pointer"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="text-white text-xs font-medium mr-2 hidden sm:block max-w-[160px] truncate">
                        {sermon.title}
                      </span>
                      <button onClick={toggleFullscreen} className="w-9 h-9 flex items-center justify-center text-white hover:text-[#E99E2E] transition-colors rounded-lg hover:bg-white/10">
                        {fullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title + tags — below video on desktop, scrolls with the right column on mobile */}
              <div className="hidden lg:block px-5 pt-4 pb-4 border-b border-white/10">
                <h2
                  className="text-white font-bold text-base sm:text-lg leading-snug mb-2"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {sermon.title}
                </h2>
                <div className="flex items-center gap-2 flex-wrap">
                  {sermon.timeAgo && (
                    <span className="text-[#E99E2E] text-xs font-medium">{sermon.timeAgo}</span>
                  )}
                  {sermon.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs text-white/60 bg-white/8 border border-white/10">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN — Scrollable content (comments + prayer points) */}
            <div className="w-full lg:w-[40%] xl:w-[35%] flex flex-col border-l border-white/8 bg-[#0F0A1A]">

              {/* Mobile-only: title below video */}
              <div className="lg:hidden px-5 pt-4 pb-3 border-b border-white/10">
                <h2
                  className="text-white font-bold text-base leading-snug mb-2"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {sermon.title}
                </h2>
                <div className="flex items-center gap-2 flex-wrap">
                  {sermon.timeAgo && (
                    <span className="text-[#E99E2E] text-xs font-medium">{sermon.timeAgo}</span>
                  )}
                  {sermon.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs text-white/60 bg-white/8 border border-white/10">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tab switcher — sticky at top of right panel */}
              <div className="flex border-b border-white/10 bg-[#0F0A1A] sticky top-0 z-10">
                {(["prayer", "comments"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 py-3 text-xs font-semibold uppercase tracking-widest transition-colors ${
                      tab === t
                        ? "text-[#E99E2E] border-b-2 border-[#E99E2E]"
                        : "text-white/40 hover:text-white/70"
                    }`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {t === "prayer" ? "🙏 Prayer Points" : `💬 Comments (${localComments.length})`}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="px-5 py-4 pb-8 overflow-y-auto lg:max-h-[calc(100vh-10rem)]">
                {tab === "prayer" ? (
                  <ul className="space-y-3">
                    {sermon.prayerPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-[#800080] font-bold text-sm mt-0.5 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {point}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="space-y-4">
                    {/* Comment form */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-xs text-white/50 mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Share your thoughts or encouragement
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 border border-white/10 focus-within:border-[#E99E2E]/50 transition-colors">
                          <User className="w-3.5 h-3.5 text-white/40 shrink-0" />
                          <input
                            type="text"
                            placeholder="Your first name"
                            value={commentName}
                            onChange={(e) => setCommentName(e.target.value)}
                            className="flex-1 bg-transparent text-sm text-white placeholder-white/30 focus:outline-none"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                          />
                        </div>
                        <div className="flex gap-2">
                          <textarea
                            placeholder="Write your comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            rows={2}
                            className="flex-1 bg-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#E99E2E]/50 border border-white/10 resize-none"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault()
                                submitComment()
                              }
                            }}
                          />
                          <button
                            onClick={submitComment}
                            disabled={!commentName.trim() || !commentText.trim()}
                            className="w-10 h-10 rounded-lg bg-[#800080] disabled:opacity-30 hover:bg-[#9a009a] flex items-center justify-center transition-colors shrink-0"
                          >
                            <Send className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Comments list */}
                    {localComments.length === 0 ? (
                      <div className="text-center py-8">
                        <MessageCircle className="w-8 h-8 text-white/20 mx-auto mb-2" />
                        <p className="text-white/30 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          Be the first to share a comment.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {localComments.map((comment, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#800080] to-[#41076A] flex items-center justify-center shrink-0 text-xs text-white font-semibold shadow-md">
                              {comment.name ? comment.name[0].toUpperCase() : "?"}
                            </div>
                            <div className="flex-1 bg-white/6 rounded-xl px-4 py-3 border border-white/10">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="text-xs font-semibold text-[#E99E2E]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                  {comment.name ?? "Anonymous"}
                                </span>
                                {comment.timeAgo && (
                                  <span className="text-xs text-white/30">{comment.timeAgo}</span>
                                )}
                              </div>
                              <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                                {comment.text}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div ref={commentsEndRef} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}