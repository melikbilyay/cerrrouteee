"use client"; // Client bileşeni olduğunu belirtir

import React, { useEffect } from 'react';
import Image from 'next/image';
import AOS from 'aos'; // AOS kütüphanesini ekliyoruz
import 'aos/dist/aos.css'; // AOS CSS dosyasını ekliyoruz
import macImage from '/public/images/mac.png'; // Görsel yolu

const UpskillComponent: React.FC = () => {
  // AOS'u başlatıyoruz
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animasyon süresi
      once: true, // Bir kez çalışması yeterli
    });
    AOS.refresh();
  }, []);

  return (
    <section className="upskill-section bg-gray-100" data-aos="fade-up">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between bg-[#f7f5ed] p-8 rounded-lg">
        {/* Sol kısım - Bullet Points */}
        <div className="left-content lg:w-1/2">
          <h3 className="text-2xl font-bold mb-6 text-orange-500">
            Upskill Employees
          </h3>
          <ul className="list-disc list-inside space-y-4 text-lg">
            <li>Improve employee retention by offering growth opportunities</li>
            <li>Equip your workforce with the latest industry skills</li>
            <li>Increase productivity and efficiency in your teams</li>
            <li>Ensure your company remains competitive in the marketplace</li>
            <li>Boost employee satisfaction and engagement</li>
          </ul>
        </div>

        {/* Sağ kısım - Macbook Görseli */}
        <div className="right-content lg:w-1/2 flex justify-center">
          <Image
            src={macImage}
            alt="Skill Skore on Macbook"
            width={500}
            height={300}
            className="w-full max-w-md h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default UpskillComponent;