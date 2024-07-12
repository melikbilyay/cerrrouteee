import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';

function Voice() {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false); // Sesli okuma durumunu izlemek için bir state
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null); // Konuşma durumunu kaydetmek için bir referans

  useEffect(() => {
    // Sayfa içeriğini al
    const content = document.body.innerText; // Veya belirli bir elementin içeriğini almak için uygun bir selector kullanabilirsiniz
    setText(content);
  }, []);

  const toggleSpeech = () => {
    if ('speechSynthesis' in window) {
      if (!isSpeaking) {
        // Başlamamış bir konuşma varsa başlat
        const newSpeech = new SpeechSynthesisUtterance(text);
        newSpeech.lang = 'en-US'; // Dil ayarı: İngilizce (Amerikan)
        window.speechSynthesis.speak(newSpeech);
        utteranceRef.current = newSpeech; // Konuşmayı referans olarak kaydet
        setIsSpeaking(true);

        newSpeech.onend = () => {
          setIsSpeaking(false);
        };
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
    >
      <FontAwesomeIcon icon={isSpeaking ? faVolumeXmark : faVolumeHigh} size="2x" />
    </button>
  );
}

export default Voice;