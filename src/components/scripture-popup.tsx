// src/components/scripture-popup.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";

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
  // You can continue adding more verses up to ~20
  {
    text: "Whoever believes in the Son has eternal life, but whoever rejects the Son will not see life, for God’s wrath remains on them.",
    reference: "John 3:36",
  },
];

export default function ScripturePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(null);

  const showPopup = () => {
    const randomIndex = Math.floor(Math.random() * verses.length);
    setCurrentVerse(verses[randomIndex]);
    setIsOpen(true);

    // Auto-close after 15 seconds
    setTimeout(() => {
      setIsOpen(false);
    }, 15000);
  };

  useEffect(() => {
    // First appearance: 5 seconds after page load
    const initialTimer = setTimeout(showPopup, 5000);

    // Then repeat every 120 seconds (2 minutes)
    const intervalId = setInterval(showPopup, 120_000);

    // Cleanup
    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalId);
    };
  }, []);

  if (!currentVerse) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className={`
          sm:max-w-lg
          bg-white
          border-2 border-purple-200
          shadow-2xl
          rounded-2xl
          p-8
          text-center
          overflow-hidden
        `}
      >
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl md:text-3xl font-bold text-purple-800">
            A Word from Scripture
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <DialogDescription
            asChild
            className="text-lg leading-relaxed text-gray-800 italic px-2 md:px-6"
          >
            <div>“{currentVerse.text}”</div>
          </DialogDescription>

          <p className="text-xl font-semibold text-purple-700">
            — {currentVerse.reference}
          </p>
        </div>

        <div className="mt-8">
          <DialogClose asChild>
            <Button
              className="
                bg-purple-700
                hover:bg-purple-800
                text-white
                text-lg
                px-10
                py-6
                rounded-xl
                shadow-md
                transition-all
              "
            >
              Thank You, Lord
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}