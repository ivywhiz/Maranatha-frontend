"use client"

import {
  HandHeart,
  RefreshCw,
  Users,
  ShieldAlert,
  Music4,
  GraduationCap,
  DoorOpen,
  HeartPulse,
} from "lucide-react"

type CardItem = {
  label: string
  icon: React.ElementType
  bg: string
  textColor: string
  iconColor: string
  height: number
}

const col1: CardItem[] = [
  {
    label: "Prayer Ministries",
    icon: HandHeart,
    bg: "#C9B8F0",
    textColor: "#2D1B6B",
    iconColor: "#5B35B8",
    height: 180,
  },
  {
    label: "Persecuted Believers Ministries",
    icon: ShieldAlert,
    bg: "#C9B8F0",
    textColor: "#2D1B6B",
    iconColor: "#5B35B8",
    height: 250,
  },
]

const col2: CardItem[] = [
  {
    label: "New Converts Program",
    icon: RefreshCw,
    bg: "#F2C8C8",
    textColor: "#3D1A1A",
    iconColor: "#B05050",
    height: 230,
  },
  {
    label: "Prison Ministries",
    icon: DoorOpen,
    bg: "#F5DDD0",
    textColor: "#3D2010",
    iconColor: "#A0602A",
    height: 170,
  },
]

const col3: CardItem[] = [
  {
    label: "New Believers Ministries",
    icon: Users,
    bg: "#F5DDD0",
    textColor: "#3D2010",
    iconColor: "#A0602A",
    height: 185,
  },
  {
    label: "Prayer Band Ministries",
    icon: Music4,
    bg: "#C47060",
    textColor: "#fff",
    iconColor: "rgba(255,255,255,0.9)",
    height: 215,
  },
  {
    label: "Hospital and Health Ministries",
    icon: HeartPulse,
    bg: "#7A4F4F",
    textColor: "#fff",
    iconColor: "rgba(255,255,255,0.9)",
    height: 190,
  },
]

const col4: CardItem[] = [
  {
    label: "Persecuted Believers Ministries",
    icon: ShieldAlert,
    bg: "#6B3D3D",
    textColor: "#fff",
    iconColor: "rgba(255,255,255,0.9)",
    height: 210,
  },
  {
    label: "Campus and School Ministries",
    icon: GraduationCap,
    bg: "#D4C8F5",
    textColor: "#2D1B6B",
    iconColor: "#5B35B8",
    height: 230,
  },
]

function MinistryCard({ item }: { item: CardItem }) {
  const Icon = item.icon
  return (
    <div
      className="rounded-2xl p-5 flex flex-col justify-between"
      style={{ backgroundColor: item.bg, height: item.height }}
    >
      <div>
        <Icon size={26} color={item.iconColor} strokeWidth={1.7} />
      </div>
      <p
        className="text-[15px] font-semibold leading-snug"
        style={{ color: item.textColor }}
      >
        {item.label}
      </p>
    </div>
  )
}

export default function OutreachMinistriesSection() {
  return (
    <section style={{ backgroundColor: "#F5F0FB" }} className="py-16 lg:py-24">
      <div className="max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
          Our Outreach <br />Ministries
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-start">
          <div className="flex flex-col gap-4">
            {col1.map((item) => <MinistryCard key={item.label + item.bg} item={item} />)}
          </div>
          <div className="flex flex-col gap-4">
            {col2.map((item) => <MinistryCard key={item.label + item.bg} item={item} />)}
          </div>
          <div className="flex flex-col gap-4">
            {col3.map((item) => <MinistryCard key={item.label + item.bg} item={item} />)}
          </div>
          <div className="flex flex-col gap-4">
            {col4.map((item) => <MinistryCard key={item.label + item.bg} item={item} />)}
          </div>
        </div>
      </div>
    </section>
  )
}