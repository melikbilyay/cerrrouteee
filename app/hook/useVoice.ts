import { useEffect, useRef, useState } from 'react';
import AWS from 'aws-sdk';
import { Console } from 'console';

// Amazon Polly API ayarları
AWS.config.update({
  region: 'REGION',
  accessKeyId: 'ACCESS_KEY',
  secretAccessKey: 'SECRET_ACCESS_KEY'
});

const Polly = new AWS.Polly();

const useVoice = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const visibleElementsRef = useRef<Set<HTMLElement>>(new Set());

  useEffect(() => {
    // Intersection Observer'ı başlat
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          const targetText = target.innerText.trim();

          // Metin zaten görünür elemanlar arasında var mı kontrol et
          const existingTexts = Array.from(visibleElementsRef.current).map((el) => el.innerText.trim());

          // Eğer metin yoksa ekle, varsa ekleme
          if (entry.isIntersecting && !existingTexts.includes(targetText)) {
            visibleElementsRef.current.add(target); // Elemanı ekle
            console.log("Görünür metin:", targetText);
          }
        });

        // Tüm metinleri birleştir
        const visibleTextArray = Array.from(visibleElementsRef.current)
          .map((el) => el.innerText.trim());  // Index eklemeden sadece metinleri alıyoruz

        const uniqueText = visibleTextArray.join(' ');  // Tüm metinleri birleştir
        setText(uniqueText);  // Güncellenmiş metni state'e set ediyoruz
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
      VoiceId: 'Amy',
      Engine: 'standard'
    };

    Polly.synthesizeSpeech(params, (err, data) => {
      if (err) {
        console.error(err);
      } else if (data?.AudioStream instanceof Buffer) {
        const blob = new Blob([data.AudioStream], { type: 'audio/mp3' });
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);

        // Okunan metni terminale bastır
        console.log("Okunan metin:", text);

        // Önceki ses çalıyorsa durdur
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }

        // Yeni ses dosyasını başlat
        audioRef.current = audio;
        audioRef.current.play();

        // Ses bittiğinde konuşma durumunu güncelle ve ref'i sıfırla
        audioRef.current.onended = () => {
          setIsSpeaking(false);
          audioRef.current = null;
        };
      }
    });
  };

  const toggleSpeech = () => {
    if (isSpeaking && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsSpeaking(false);
    } else if (!isSpeaking && text !== '' && audioRef.current === null) {
      setIsSpeaking(true);
      fetchSpeechFromPolly(text);
    }
  };

  return { isSpeaking, toggleSpeech };
};

export default useVoice;