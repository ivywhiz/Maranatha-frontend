export interface ResourceArticle {
  id: number
  title: string
  publishedDate: string
  author: string
  readTime: string
  thumbnail: string
  inlineImage?: string
  sections: {
    heading: string
    body?: string
    bullets?: string[]
  }[]
}

export const RESOURCES: ResourceArticle[] = [
  {
    id: 1,
    title: "Equip Yourself for a Deeper Walk With God",
    publishedDate: "October 08, 2025",
    author: "George Wayne",
    readTime: "2 mins read",
    thumbnail: "/images/resource-bible.jpg",
    inlineImage: "/images/resource-bible.jpg",
    sections: [
      {
        heading: "Introduction",
        body: "When we accept God's free-gift of salvation provided through the death and resurrection of Jesus Christ, Jesus' blood washes away our sins. We also teach that humans are destined to die only once, and after death, God's judgement will follow (Hebrews 9 verse 27). We preach that according to the bible, there is only one way provided for humanity to escape God's judgement. This way is only through the blood of Jesus Christ and there is no other way.",
      },
      {
        heading: "Challenges",
        bullets: [
          "When we accept God's free-gift of salvation provided through the death and resurrection of Jesus Christ, Jesus' blood washes away our sins. We also teach that humans are destined to die only once, and after death, God's judgement will follow (Hebrews 9 verse 27). We preach that according to the bible, there is only one way provided for humanity to escape God's judgement. This way is only through the blood of Jesus Christ and there is no other way.",
          "Maranatha's bible teachings help prepare and fortify participants and listeners for a Christ centered living that depends on the Word of God. Our teaching emphasizes biblical principles of Living faith. Our goal is to be like the Christ, and ultimately spend eternity with the Christ when He comes back again to rapture His people.",
        ],
      },
      {
        heading: "Conclusion",
        body: "When we accept God's free-gift of salvation provided through the death and resurrection of Jesus Christ, Jesus' blood washes away our sins. We also teach that humans are destined to die only once, and after death, God's judgement will follow (Hebrews 9 verse 27). We preach that according to the bible, there is only one way provided for humanity to escape God's judgement. This way is only through the blood of Jesus Christ and there is no other way.",
      },
    ],
  },
  {
    id: 2,
    title: "Equip Yourself for a Deeper Walk With God",
    publishedDate: "October 08, 2025",
    author: "George Wayne",
    readTime: "3 mins read",
    thumbnail: "/images/resource-library.jpg",
    sections: [
      {
        heading: "Introduction",
        body: "When we accept God's free-gift of salvation provided through the death and resurrection of Jesus Christ, Jesus' blood washes away our sins.",
      },
      {
        heading: "Conclusion",
        body: "Maranatha's bible teachings help prepare and fortify participants and listeners for a Christ centered living.",
      },
    ],
  },
  {
    id: 3,
    title: "Equip Yourself for a Deeper Walk With God",
    publishedDate: "October 08, 2025",
    author: "George Wayne",
    readTime: "4 mins read",
    thumbnail: "/images/resource-library.jpg",
    sections: [
      {
        heading: "Introduction",
        body: "When we accept God's free-gift of salvation provided through the death and resurrection of Jesus Christ, Jesus' blood washes away our sins.",
      },
    ],
  },
]

export interface DevotionCard {
  id: number
  reference: string
  version: string
  preview: string
  fullText: string
  thumbnail: string
}

export const DEVOTIONS: DevotionCard[] = [
  {
    id: 1,
    reference: "John 3:16",
    version: "NKJV",
    preview: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him sho...",
    fullText: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.",
    thumbnail: "/images/devotion-bg.jpg",
  },
  {
    id: 2,
    reference: "John 3:16",
    version: "NKJV",
    preview: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him sho...",
    fullText: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.",
    thumbnail: "/images/devotion-bg.jpg",
  },
  {
    id: 3,
    reference: "John 3:16",
    version: "NKJV",
    preview: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him sho...",
    fullText: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.",
    thumbnail: "/images/devotion-bg.jpg",
  },
]

export const BIBLE_VERSES = [
  { verse: 1, text: "Another time Jesus went into the synagogue, and a man with a shriveled hand was there." },
  { verse: 2, text: "Some of them were looking for a reason to accuse Jesus, so they watched him closely to see if he would heal him on the Sabbath. 3Jesus said to the man with the shriveled hand, \"Stand up in front of everyone.\"" },
  { verse: 3, text: "Jesus said to the man with the shriveled hand, \"Stand up in front of everyone.\"" },
  { verse: 4, text: "Then Jesus asked them, \"Which is lawful on the Sabbath: to do good or to do evil, to save life or to kill?\" But they remained silent." },
  { verse: 5, text: "He looked around at them in anger and, deeply distressed at their stubborn hearts, said to the man, \"Stretch out your hand.\" He stretched it out, and his hand was completely restored." },
]