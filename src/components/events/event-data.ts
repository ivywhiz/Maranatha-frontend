export interface EventItem {
  id: number
  title: string
  category: string
  description: string
  venue: string
  dateTime: string
  thumbnail: string
  photos: string[]
}

export const EVENTS: EventItem[] = [
  {
    id: 1,
    title: "Harvesters Outreach",
    category: "Outreach",
    description:
      "When we accept God's free-gift of salvation provided through the death and resurrection of Jesus Christ, Jesus' blood washes away our sins. We also teach that humans are destined to die only once, and after death, God's judgement will follow (Hebrews 9 verse 27). We preach that according to the bible, there is only one way provided for humanity to escape God's judgement. This way is only through the blood of Jesus Christ and there is no other way.",
    venue: "Virtual",
    dateTime: "Wed, 18 September, 2025 at 9 PM",
    thumbnail: "/images/event-photo.png",
    photos: [
      "/images/event-photo.png",
      "/images/event-photo.png",
      "/images/event-photo.png",
      "/images/event-photo.png",
    ],
  },
  {
    id: 2,
    title: "Harvesters Outreach",
    category: "Outreach",
    description:
      "When we accept God's free-gift of salvation provided through the death and resurrection of Jesus Christ, Jesus' blood washes away our sins. We also teach that humans are destined to die only once, and after death, God's judgement will follow (Hebrews 9 verse 27). We preach that according to the bible, there is only one way provided for humanity to escape God's judgement.",
    venue: "Virtual",
    dateTime: "Wed, 18 September, 2025 at 9 PM",
    thumbnail: "/images/event-photo.png",
    photos: [
      "/images/event-photo-1.jpg",
      "/images/event-photo-2.jpg",
      "/images/event-photo-3.jpg",
      "/images/event-photo-4.jpg",
    ],
  },
  {
    id: 3,
    title: "Harvesters Outreach",
    category: "Outreach",
    description:
      "When we accept God's free-gift of salvation provided through the death and resurrection of Jesus Christ, Jesus' blood washes away our sins. We also teach that humans are destined to die only once, and after death, God's judgement will follow (Hebrews 9 verse 27).",
    venue: "Virtual",
    dateTime: "Wed, 18 September, 2025 at 9 PM",
    thumbnail: "/images/event-photo.png",
    photos: [
      "/images/event-photo.png",
      "/images/event-photo-2.jpg",
      "/images/event-photo-3.jpg",
      "/images/event-photo-4.jpg",
    ],
  },
  {
    id: 4,
    title: "Harvesters Outreach",
    category: "Outreach",
    description:
      "When we accept God's free-gift of salvation provided through the death and resurrection of Jesus Christ, Jesus' blood washes away our sins. We also teach that humans are destined to die only once, and after death, God's judgement will follow (Hebrews 9 verse 27).",
    venue: "Virtual",
    dateTime: "Wed, 18 September, 2025 at 9 PM",
    thumbnail: "/images/event-photo.png",
    photos: [
      "/images/event-photo.png",
      "/images/event-photo-2.jpg",
      "/images/event-photo-3.jpg",
      "/images/event-photo-4.jpg",
    ],
  },
]