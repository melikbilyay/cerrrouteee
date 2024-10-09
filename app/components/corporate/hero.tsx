"use client"; // Bu direktifi en üste ekliyoruz

import React, { useEffect } from 'react';
import AOS from 'aos'; // AOS kütüphanesini içe aktarıyoruz
import 'aos/dist/aos.css'; // AOS CSS dosyasını ekliyoruz
import womanImage from '/public/images/havali_bakan_kadin.png'; // Attığın görselin yolu
import Slider from '../corporate/slider'; // Slider bileşenini içe aktarıyoruz
import SustainabilityComponent from '../corporate/sustainability'; // Sustainability bileşenini içe aktarıyoruz

const Hero = () => {
  // Bileşen yüklendiğinde AOS'u başlatıyoruz
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animasyon süresi
      once: true, // Her öğe sadece bir kez animasyon oynar
    });
    AOS.refresh(); // Sayfa yenilendiğinde AOS'u yeniliyoruz
  }, []);

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero İçeriği */}
        <div className="pt-20 pb-12 md:pt-20 md:pb-20">
          <div className="flex flex-col md:flex-row items-center justify-between" data-aos="fade-up"> {/* Flex yapısını burada ekledik */}

            {/* Metin kısmı */}
            <div className="text-left md:w-1/2 pb-12 md:pb-0 md:pr-8">
              <h1 className="text-6xl md:text-7xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
                Your Future Your <span className="text-orange-400">Route</span>
              </h1>
              <div className="max-w-lg">
                <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">
                  Guiding your journey as you build a future
                </p>
                <ul className="list-none mb-8" data-aos="zoom-y-out" data-aos-delay="200">
                  <li className="text-xl text-gray-600">✔️ Tailored Learning</li>
                  <li className="text-xl text-gray-600">✔️ Expert Instructors</li>
                  <li className="text-xl text-gray-600">✔️ Flexible Schedule</li>
                  <li className="text-xl text-gray-600">✔️ Real-World Skills</li>
                </ul>
                <div
                  className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-start"
                  data-aos="zoom-y-out"
                  data-aos-delay="300"
                >
                  <div>
                    <button className="btn text-white bg-orange-400 hover:bg-orange-300 w-full mb-4 sm:w-auto sm:mb-0">
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Görsel kısmı */}
            <div className="hero-image md:w-1/2" data-aos="zoom-y-out" data-aos-delay="400">
              <img src={womanImage.src} alt="Confident Woman" className="mx-auto max-w-full h-auto rounded-lg" />
            </div>

          </div>

          {/* İstatistikler */}
          <div className="stats-section flex justify-around mt-12 border-t border-gray-300 pt-6" data-aos="fade-up" data-aos-delay="500">
            <div className="stat-item text-center">
              <span className="stat-number text-3xl font-bold">+30</span>
              <span className="stat-label block text-xl text-gray-600">Courses</span>
            </div>
            <div className="border-l border-gray-300 h-auto mx-4"></div> {/* Dikey çizgi */}
            <div className="stat-item text-center">
              <span className="stat-number text-3xl font-bold">+100</span>
              <span className="stat-label block text-xl text-gray-600">Instructors</span>
            </div>
            <div className="border-l border-gray-300 h-auto mx-4"></div> {/* Dikey çizgi */}
            <div className="stat-item text-center">
              <span className="stat-number text-3xl font-bold">+15</span>
              <span className="stat-label block text-xl text-gray-600">Partners</span>
            </div>
            <div className="border-l border-gray-300 h-auto mx-4"></div>
            <div className="stat-item text-center">
              <span className="stat-number text-3xl font-bold">+27</span>
              <span className="stat-label block text-xl text-gray-600">Companies</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
