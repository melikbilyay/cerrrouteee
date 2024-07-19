"use client"

import Hero from '../components/hero'
import Features from '../components/features'
import FeaturesBlocks from '../components/features-blocks'
import Testimonials from '../components/testimonials'
import Newsletter from '../components/newsletter'
import Chatbot from '../components/Chatbot'
import {useState} from "react";

export default function Home() {
    const [showChatbot, setShowChatbot] = useState(false);
    const toggleChatbot = () => {
        setShowChatbot(!showChatbot);
    };
  return (
      <>
          <Hero/>
          <div className="home-container">
              <button className="chatbot-toggle-button" onClick={toggleChatbot}>
                  CR

              </button>
              {showChatbot && <Chatbot/>}
          </div>
          <FeaturesBlocks/>
          <Features/>
          <Testimonials/>
          <Newsletter/>
      </>
  )
}
