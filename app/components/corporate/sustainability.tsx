"use client"; // Client bileşeni olduğunu belirtir

import React, { useEffect } from 'react';
import Image from 'next/image';
import AOS from 'aos'; // AOS kütüphanesini ekliyoruz
import 'aos/dist/aos.css'; // AOS CSS dosyasını ekliyoruz
import kusakImage from '/public/images/kusak.png'; // İlk resmin yolu

const SustainabilityComponent = () => {
  // AOS'u başlatıyoruz
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animasyon süresi
      once: true, // Bir kez çalışması yeterli
    });
    AOS.refresh();
  }, []);

  return (
    <section className="sustainability-section py-12" data-aos="fade-up">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        {/* Sol kısım - Daha büyük resim */}
        <div className="left-content lg:w-1/2 flex justify-center lg:justify-start mb-8 lg:mb-0">
          <Image src={kusakImage} alt="Kuşak" width={500} height={500} className="mb-6" /> {/* Daha büyük resim */}
        </div>

        {/* Sağ kısım - Renklendirilmiş metin */}
        <div className="right-content lg:w-1/2 flex flex-col items-center lg:items-start">
          <h2 className="text-5xl font-extrabold mb-8 text-center lg:text-left"> {/* mb-8 ile başlık altına boşluk eklendi */}
            Learn <span className="text-green-500">Sustainability</span> for your business from the best
          </h2>
          <p className="text-lg text-gray-600 text-center lg:text-left">
            Join those making a difference for the future by embracing sustainability with your company and employees through 
            <span className="text-orange-500 font-bold"> CeRRoute!</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityComponent;