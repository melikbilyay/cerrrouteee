export const metadata = {
    title: 'CeRRoute',
    description: 'Make your own ',
}

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

            <FeaturesBlocks />
            <Features />
            <Testimonials />
            <Newsletter />
        </>
    )
}
