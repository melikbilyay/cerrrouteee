import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import AWS from 'aws-sdk';

// Amazon Polly API ayarları (Access Key ve Secret Key'yi Amazon Console'dan alacaksın)
AWS.config.update({
  region: 'REGION',
  accessKeyId: 'ACCESS_KEY',
  secretAccessKey: 'SECRET_ACCESS_KEY'
});

const Polly = new AWS.Polly();

function Voice() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [text, setText] = useState(''); // Metni tutmak için state
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
      { threshold: 0.5 }
    );

    // Gözlemlenecek tüm elemanları seç
    const elementsToObserve = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, div');
    elementsToObserve.forEach((el) => observerRef.current?.observe(el));

    return () => {
      elementsToObserve.forEach((el) => observerRef.current?.unobserve(el));
      observerRef.current?.disconnect();
    };
  }, []);

  // Polly'den metni sesli olarak almak
  const fetchSpeechFromPolly = (text: string) => {
    const params = {
      OutputFormat: 'mp3',
      Text: text,
      VoiceId: 'justin', // Kadın İngiliz sesi, Polly'deki mevcut seslerden birini seçiyoruz
      Engine: 'standard'
    };

    Polly.synthesizeSpeech(params, (err, data) => {
      if (err) {
        console.error(err);
      } else if (data && data.AudioStream instanceof Blob) {
        const url = URL.createObjectURL(new Blob([data.AudioStream], { type: 'audio/mp3' }));
        const audio = new Audio(url);
        audio.play();
      }
    });
  };

  const toggleSpeech = () => {
    if (!isSpeaking && text !== '') {
      setIsSpeaking(true);
      fetchSpeechFromPolly(text); // Polly ile konuşmayı başlat

      setTimeout(() => {
        setIsSpeaking(false);
      }, 1500); // 1.5 saniyelik bir bekleme ekledik
    } else {
      // Devam eden konuşma varsa durdur
      setIsSpeaking(false);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="rate">Rate: </label>
        <input
          type="range"
          id="rate"
          min="0.5"
          max="2"
          value={rate}
          step="0.1"
          onChange={(e) => setRate(parseFloat(e.target.value))}
        />
        <span>{rate}</span>
      </div>

      <div>
        <label htmlFor="pitch">Pitch: </label>
        <input
          type="range"
          id="pitch"
          min="0"
          max="2"
          value={pitch}
          step="0.1"
          onChange={(e) => setPitch(parseFloat(e.target.value))}
        />
        <span>{pitch}</span>
      </div>

      <button
        className="floating-button text-white"
        onClick={toggleSpeech}
        ref={buttonRef} // Buton referansını ekle
      >
        <FontAwesomeIcon icon={isSpeaking ? faVolumeXmark : faVolumeHigh} size="lg" />
      </button>
    </div>
  );
}

export default Voice;