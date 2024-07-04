"use client"

import Hero from '@/components/hero'
import Features from '@/components/features'
import FeaturesBlocks from '@/components/features-blocks'
import Testimonials from '@/components/testimonials'
import Newsletter from '@/components/newsletter'
import Wave from "@/components/Wave";

export default function Home() {


    return (
        <>
            <Hero />
            <Wave />
            <FeaturesBlocks />

            <Features />
            <Testimonials />
            <Newsletter />
        </>
    )
}
