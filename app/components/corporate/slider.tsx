"use client"; // Client bileşeni olduğunu belirtir

import React, { useEffect, useState } from 'react';
import AOS from 'aos'; // AOS kütüphanesini içe aktarıyoruz
import 'aos/dist/aos.css'; // AOS CSS dosyasını ekliyoruz

// Firma logolarını diziye ekliyoruz
const logoList: string[] = [
  "/images/logoA.png",
  "/images/logoA.png",
  "/images/logoA.png",
  "/images/logoA.png",
  "/images/logoA.png",
  "/images/logoA.png",
  "/images/logoA.png",
];

const Slider: React.FC = () => {
  const [index, setIndex] = useState(0);

  // AOS'u başlatıyoruz
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animasyon süresi
      once: true, // Bir kez çalışması yeterli
    });
    AOS.refresh();
  }, []);

  // Logolar arasında geçiş yapma
  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  // Otomatik geçiş için useEffect kullanıyoruz
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) =>
        (prevIndex + 1) % logoList.length
      );
    }, 3000); // 3 saniyede bir geçiş

    return () => clearInterval(intervalId);
  }, []);

  // Dört tane logoyu sırayla gösteriyoruz
  const visibleLogos = [
    logoList[index % logoList.length],
    logoList[(index + 1) % logoList.length],
    logoList[(index + 2) % logoList.length],
    logoList[(index + 3) % logoList.length],
  ];

  return (
    <section
      className="logo-slider py-8 md:py-6 relative z-[1]"
      style={{ backgroundColor: '#F7F5ED' }}
      data-aos="fade-up" // AOS animasyonu eklendi
    >
      <div className="container px-4 mx-auto">
        <div className="mt-8">
          {/* Dörtlü şekilde sade logoları gösteriyoruz */}
          <div className="grid grid-cols-4 gap-4 items-center justify-center">
            {visibleLogos.map((logo, i) => (
              <div className="col-span-1 flex items-center justify-center" key={i}>
                <img
                  src={logo}
                  alt={`Logo ${i}`}
                  className="mx-auto"
                  style={{
                    maxWidth: '120px', // Logoların maksimum genişliği ayarlandı
                    maxHeight: '80px', // Logoların maksimum yüksekliği ayarlandı
                    objectFit: 'contain', // Logoların orijinal oranını koruyoruz
                  }}
                />
              </div>
            ))}
          </div>

          {/* Logolar arasında geçiş yapmayı sağlayan butonlar */}
          <div className="flex justify-center gap-2 m-0 mt-8">
            {Array(Math.ceil(logoList.length / 4)).fill(0).map((_, i) => (
              <button
                className={`w-2 h-2 rounded-full ${Math.floor(index / 4) === i ? 'scale-125 bg-orange-400' : 'bg-gray-400'}`}
                key={i}
                onClick={() => handleSelect(i * 4)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;