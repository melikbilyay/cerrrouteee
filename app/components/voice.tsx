import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';

function Voice() {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false); // Sesli okuma durumunu izlemek için bir state
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null); // Konuşma durumunu kaydetmek için bir referans
  const observerRef = useRef<IntersectionObserver | null>(null); // Intersection Observer referansı
  const visibleElementsRef = useRef<Set<HTMLElement>>(new Set()); // Görünür elemanları takip etmek için Set
  const buttonRef = useRef<HTMLButtonElement | null>(null); // Buton referansı

  useEffect(() => {
    // Intersection Observer'ı başlat
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

        // Görünür elemanların metinlerini birleştir
        const visibleText = Array.from(visibleElementsRef.current)
          .map((el) => el.innerText)
          .join(' ');
        setText(visibleText);
      },
      { threshold: 0.5 } // Elemanın %50'si görünür olduğunda tetiklenir
    );

    // Gözlemlenecek tüm elemanları seç
    const elementsToObserve = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, div');
    elementsToObserve.forEach((el) => observerRef.current?.observe(el));

    return () => {
      // Temizleme işlemi
      elementsToObserve.forEach((el) => observerRef.current?.unobserve(el));
      observerRef.current?.disconnect();
    };
  }, []);

  const toggleSpeech = () => {
    if ('speechSynthesis' in window) {
      if (!isSpeaking) {
        // Başlamamış bir konuşma varsa başlat
        const newSpeech = new SpeechSynthesisUtterance(text);
        newSpeech.lang = 'en-US'; // Dil ayarı: İngilizce (Amerikan)
        newSpeech.onend = () => {
          setIsSpeaking(false); // Okuma tamamlandığında veya durdurulduğunda isSpeaking durumunu false yap
        };
        window.speechSynthesis.speak(newSpeech);
        utteranceRef.current = newSpeech; // Konuşmayı referans olarak kaydet
        setIsSpeaking(true);
      } else {
        // Devam eden bir konuşma varsa durdur
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
      ref={buttonRef} // Buton referansını ekle
    >
      <FontAwesomeIcon icon={isSpeaking ? faVolumeXmark : faVolumeHigh} size="lg" />
    </button>
  );
}

export default Voice;