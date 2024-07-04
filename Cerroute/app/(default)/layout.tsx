'use client'

import { useEffect } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css'

import Footer from '@/components/ui/footer'


export default function DefaultLayout({
                                        children,
                                      }: {
  children: React.ReactNode
}) {


  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    })
  })
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const alanBtn = require('@alan-ai/alan-sdk-web');
            alanBtn({
                key: "04b0815c44b68e62d194f6b0e142d10e2e956eca572e1d8b807a3e2338fdd0dc/stage",

                rootEl: document.getElementById("alan-btn")
            });
        }
    }, []);

  return (
      <>
        <main className="grow">

          {children}

        </main>

        <Footer />
      </>
  )
}
