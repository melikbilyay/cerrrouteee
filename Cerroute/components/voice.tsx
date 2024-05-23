import React, { useEffect, useRef, useState } from 'react';

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
      className="btn text-white bg-gray-500 hover:bg-gray-400 w-40 h-15 sm:w-40 sm:h-15 sm:ml-4"
      onClick={toggleSpeech}
    >
      {isSpeaking ? 'Stop' : 'Start'}
    </button>
  );
}

export default Voice;
