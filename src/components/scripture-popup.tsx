// src/components/scripture-popup.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import {
  Heart,
  X,
  Share2,
  BookOpen,
  Copy,
  Check,
} from "lucide-react";

interface Verse {
  text: string;
  reference: string;
}

const verses: Verse[] = [
  {
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    reference: "John 3:16",
  },
  {
    text: "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'",
    reference: "John 14:6",
  },
  {
    text: "If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved.",
    reference: "Romans 10:9",
  },
  {
    text: "For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God — not by works, so that no one can boast.",
    reference: "Ephesians 2:8-9",
  },
  {
    text: "Salvation is found in no one else, for there is no other name under heaven given to mankind by which we must be saved.",
    reference: "Acts 4:12",
  },
  {
    text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
    reference: "Romans 5:8",
  },
  {
    text: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.",
    reference: "Romans 6:23",
  },
  {
    text: "Come to me, all you who are weary and burdened, and I will give you rest.",
    reference: "Matthew 11:28",
  },
  {
    text: "For everyone who calls on the name of the Lord will be saved.",
    reference: "Romans 10:13",
  },
  {
    text: "Here I am! I stand at the door and knock. If anyone hears my voice and opens the door, I will come in and eat with that person, and they with me.",
    reference: "Revelation 3:20",
  },
  {
    text: "Whoever believes in the Son has eternal life, but whoever rejects the Son will not see life, for God's wrath remains on them.",
    reference: "John 3:36",
  },
  {
    text: "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures; He leads me beside the still waters.",
    reference: "Psalm 23:1-2",
  },
  {
    text: "I can do all things through Christ who strengthens me.",
    reference: "Philippians 4:13",
  },
  {
    text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    reference: "Joshua 1:9",
  },
  {
    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
  },
  {
    text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
    reference: "Psalm 34:18",
  },
  {
    text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    reference: "Isaiah 40:31",
  },
  {
    text: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
    reference: "2 Corinthians 5:17",
  },
  {
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reference: "Romans 8:28",
  },
  {
    text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
    reference: "John 14:27",
  },
];

// Persist favorites across sessions
const FAVORITES_KEY = "maranatha-scripture-favorites";

function loadFavorites(): Set<string> {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveFavorites(favs: Set<string>) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(favs)));
  } catch {
    // silently ignore
  }
}

export default function ScripturePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  // Lazy initializer — reads localStorage once on mount, no effect needed
  const [favorites, setFavorites] = useState<Set<string>>(loadFavorites);
  const [copied, setCopied] = useState(false);
  const autoCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAutoClose = useCallback(() => {
    if (autoCloseTimer.current) {
      clearTimeout(autoCloseTimer.current);
      autoCloseTimer.current = null;
    }
  }, []);

  const openWithVerse = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      setIsOpen(true);
      clearAutoClose();
      autoCloseTimer.current = setTimeout(() => setIsOpen(false), 15000);
    },
    [clearAutoClose]
  );

  const showPopup = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * verses.length);
    openWithVerse(randomIndex);
  }, [openWithVerse]);

  // Cancel auto-close when user interacts
  const handleUserInteract = useCallback(() => {
    clearAutoClose();
  }, [clearAutoClose]);

  useEffect(() => {
    const initialTimer = setTimeout(showPopup, 5000);
    const intervalId = setInterval(showPopup, 120_000);
    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalId);
      clearAutoClose();
    };
  }, [showPopup, clearAutoClose]);


  const toggleFavorite = useCallback(
    (reference: string) => {
      handleUserInteract();
      setFavorites((prev) => {
        const next = new Set(prev);
        if (next.has(reference)) {
          next.delete(reference);
        } else {
          next.add(reference);
        }
        saveFavorites(next);
        return next;
      });
    },
    [handleUserInteract]
  );

  const copyVerse = useCallback(
    (verse: Verse) => {
      handleUserInteract();
      const text = `"${verse.text}" — ${verse.reference}`;
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    },
    [handleUserInteract]
  );

  const shareVerse = useCallback(
    (verse: Verse) => {
      handleUserInteract();
      const text = `"${verse.text}" — ${verse.reference}`;
      if (navigator.share) {
        navigator.share({ title: "Scripture", text });
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    },
    [handleUserInteract]
  );

  if (currentIndex === null) return null;

  const currentVerse = verses[currentIndex];
  const isFavorited = favorites.has(currentVerse.reference);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="sm:max-w-lg bg-gradient-to-br from-white to-[#F5F0FB] border-2 border-[#800080]/20 shadow-2xl rounded-2xl p-0 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300"
        onClick={handleUserInteract}
      >
        {/* Decorative top bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#800080] via-[#E99E2E] to-[#800080]" />

        {/* Top-right action cluster */}
        <div className="absolute right-4 top-4 z-20 flex items-center gap-1.5">
          {/* Copy */}
          <button
            onClick={() => copyVerse(currentVerse)}
            title="Copy verse"
            className="rounded-full p-1.5 bg-white/80 hover:bg-gray-100 transition-colors ring-1 ring-gray-200"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-gray-500" />
            )}
          </button>

          {/* Share */}
          <button
            onClick={() => shareVerse(currentVerse)}
            title="Share verse"
            className="rounded-full p-1.5 bg-white/80 hover:bg-gray-100 transition-colors ring-1 ring-gray-200"
          >
            <Share2 className="h-4 w-4 text-gray-500" />
          </button>

          {/* Favorite */}
          <button
            onClick={() => toggleFavorite(currentVerse.reference)}
            title={isFavorited ? "Remove from favorites" : "Save to favorites"}
            className="rounded-full p-1.5 bg-white/80 hover:bg-gray-100 transition-colors ring-1 ring-gray-200"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isFavorited ? "text-[#800080] fill-[#800080]" : "text-gray-500"
              }`}
            />
          </button>

          {/* Close */}
          <DialogClose className="rounded-full p-1.5 bg-white/80 hover:bg-gray-100 transition-colors ring-1 ring-gray-200">
            <X className="h-4 w-4 text-gray-500" />
          </DialogClose>
        </div>

        <div className="p-8 pt-10">
          <DialogHeader className="mb-4">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-full bg-[#800080]/10 flex items-center justify-center">
                <BookOpen className="h-7 w-7 text-[#800080]" />
              </div>
            </div>

            <DialogTitle
              className="text-2xl md:text-3xl font-bold text-center"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                background: "linear-gradient(135deg, #800080 0%, #41076A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              A Word from Scripture
            </DialogTitle>

            <DialogDescription asChild className="text-center text-gray-500 text-sm mt-2">
              <p style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Encouragement for your journey of faith
              </p>
            </DialogDescription>
          </DialogHeader>

          {/* Verse area */}
          <div className="space-y-5 py-4">
            {/* Open-quote */}
            <div className="flex justify-center">
              <svg
                className="h-8 w-8 text-[#E99E2E]/30"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14 17h3l2-4V7h-6v6h3l-2 4zm-8 0h3l2-4V7H5v6h3l-2 4z" />
              </svg>
            </div>

            <DialogDescription asChild>
              <div
                className="italic font-medium text-2xl md:text-3xl leading-relaxed text-gray-800 px-2 md:px-4 text-center"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                &ldquo;{currentVerse.text}&rdquo;
              </div>
            </DialogDescription>

            <p
              className="text-base font-semibold text-center"
              style={{ color: "#E99E2E", fontFamily: "'DM Sans', sans-serif" }}
            >
              — {currentVerse.reference} —
            </p>
          </div>


          {/* Favorites count hint */}
          {favorites.size > 0 && (
            <p
              className="text-center text-xs text-[#800080]/60 -mt-4 mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {favorites.size} verse{favorites.size > 1 ? "s" : ""} saved ♥
            </p>
          )}

          {/* CTA button */}
          <div className="flex justify-center">
            <DialogClose asChild>
              <Button
                className="group text-white text-base font-semibold px-8 py-3 rounded-xl shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #800080 0%, #41076A 100%)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <Heart className="h-4 w-4 group-hover:scale-110 transition-transform" />
                Thank You, Lord
              </Button>
            </DialogClose>
          </div>
        </div>

        {/* Decorative bottom bar */}
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#E99E2E]/50 to-transparent mt-2" />
      </DialogContent>
    </Dialog>
  );
}