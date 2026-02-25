"use client"

import Image from "next/image"
import { Leaf } from "lucide-react"

export default function WhatWeDoSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-[96rem] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Section heading — centered */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            What We Do
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — badge + image */}
          <div className="space-y-6">
            {/* God's work badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 text-violet-600 text-sm font-semibold ring-1 ring-violet-100">
              <Leaf className="h-4 w-4" />
              God&apos;s work
            </div>

            <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/about-what-we-do.jpg"
                alt="What we do - ministry work"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right — body text */}
          <div className="space-y-4 text-gray-600 text-base leading-relaxed">
            <p>
              Maranatha connects seekers of God to the God of the bible, and to our
              LORD and Savior Jesus Christ through the power of the Holy Spirit. We
              exercise as we link people to seek Jesus the Christ as their LORD and
              personal Savior so that they might have abundant life in Christ Jesus.
            </p>
            <p>
              We affirm that Jesus is the Messiah, the Savior of the world. We teach
              that Jesus is the Way the Truth and the Life, and that humans cannot
              reach God except through Jesus the Christ. (John Chapter 14, verse 6).
              &ldquo;Salvation is found in no one else, for there is no other name under
              heaven given to mankind by which we must be saved&rdquo; (Acts Chapter 4
              verse 12). We communicate to people that only Jesus can save us from
              our sins and guarantee us eternal Life in heaven when we die. We teach
              that humans cannot attain God&apos;s righteous requirements to wash away
              our sins through good works. God&apos;s righteous requirement to forgive
              our sins is only possible by accepting the free gift of God&apos;s salvation
              through Jesus Christ His Son.
            </p>
            <p>
              When we accept God&apos;s free gift of salvation provided through the
              death and resurrection of Jesus Christ, Jesus&apos; blood washes away our
              sins. We also teach that humans are destined to die only once, and
              after death, God&apos;s judgement will follow (Hebrews 9 verse 27). We
              preach that according to the bible, there is only one way provided for
              humanity to escape God&apos;s judgement. This way is only through the
              hood of Jesus Christ and there is no other way.
            </p>
            <p>
              We declare that Jesus died on the cross for our sins and rose again for
              our justification (Romans Chapter 4 verse 25). Our message of God&apos;s
              transformative Word lifts people from darkness into the marvelous
              light of Jesus Christ. The Bible states: &ldquo;But you are a chosen people, a
              royal priesthood, a holy nation, God&apos;s special possession, that you may
              declare the praises of Him who called you, out of darkness into His
              wonderful light.&rdquo; (1 Peter Chapter 2 verse 9). We seriously urge people
              to believe the gospel because God&apos;s Word informs us that God has
              appointed a day in which He will judge this present world through Jesus
              Christ His Son. (Acts Chapter 17 verse 31).
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}