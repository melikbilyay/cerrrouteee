import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';

function Voice() {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const visibleElementsRef = useRef<Set<HTMLElement>>(new Set());
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            visibleElementsRef.current.add(target);
          } else {
            visibleElementsRef.current.delete(target);
          }
        });


        const visibleText = Array.from(visibleElementsRef.current)
          .map((el) => el.innerText)
          .join(' ');
        setText(visibleText);
      },
      { threshold: 0.5 }
    );


    const elementsToObserve = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, div');
    elementsToObserve.forEach((el) => observerRef.current?.observe(el));

    return () => {

      elementsToObserve.forEach((el) => observerRef.current?.unobserve(el));
      observerRef.current?.disconnect();
    };
  }, []);

  const toggleSpeech = () => {
    if ('speechSynthesis' in window) {
      if (!isSpeaking) {

        const newSpeech = new SpeechSynthesisUtterance(text);
        newSpeech.lang = 'en-US';
        newSpeech.onend = () => {
          setIsSpeaking(false);
        };
        window.speechSynthesis.speak(newSpeech);
        utteranceRef.current = newSpeech;
        setIsSpeaking(true);
      } else {

        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    } else {
      alert('Your browser does not support speech synthesis.');
    }
  };

  return (
    <button
      className="floating-button text-white"
      onClick={toggleSpeech}
      ref={buttonRef}
    >
      <FontAwesomeIcon icon={isSpeaking ? faVolumeXmark : faVolumeHigh} size="lg" />
    </button>
  );
}

export default Voice;
