"use client"

import Hero from '../components/hero'
import Features from '../components/features'
import FeaturesBlocks from '../components/features-blocks'
import Testimonials from '../components/testimonials'
import Newsletter from '../components/newsletter'

import {useState} from "react";
import Voice from '../components/voice'


export default function Home() {
    const [showChatbot, setShowChatbot] = useState(false);
    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };
  return (
      <>
          <Hero/>
          <FeaturesBlocks/>
          <Features/>
          <Testimonials/>
          <Newsletter/>
      </>
  )
}
