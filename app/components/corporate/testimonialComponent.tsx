"use client"; // Client bileşeni olduğunu belirtir

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AOS from 'aos'; // AOS kütüphanesini ekliyoruz
import 'aos/dist/aos.css'; // AOS CSS dosyasını ekliyoruz
import pembeKadin from '/public/images/pembeKadın.png'; // Görsel yolu

interface Testimonial {
  name: string;
  feedback: string;
}

const testimonialList: Testimonial[] = [
  {
    name: 'Maria A.',
    feedback: "Thanks to CeRRoute's user-friendly interface, our entire team has enhanced their awareness and competence through high-quality training.",
  },
  {
    name: 'John B.',
    feedback: "CeRRoute has improved our employee productivity by providing customized training programs for our industry.",
  },
  {
    name: 'Sarah C.',
    feedback: "The flexibility of CeRRoute's courses allowed me to balance my work and learning schedule effortlessly.",
  },
  {
    name: 'Michael D.',
    feedback: "I highly recommend CeRRoute for companies looking to upskill their workforce with real-world skills.",
  },
];

const TestimonialComponent: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // AOS'u başlatıyoruz
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animasyon süresi
      once: true, // Bir kez çalışması yeterli
    });
    AOS.refresh();
  }, []);

  // Testimonial geçişini ayarlıyoruz (otomatik olarak 5 saniyede bir geçiş)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialList.length);
    }, 5000); // Her 5 saniyede bir geçiş yapacak

    return () => clearInterval(intervalId); // Bileşen temizlendiğinde interval'i temizle
  }, []);

  // Daireye tıklanınca testimonial'ı değiştiren fonksiyon
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="testimonial-section py-12" data-aos="fade-up">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">What Do They Say?</h2>

        <div className="testimonial-item mb-12">
          {/* Fotoğraf */}
          <div className="flex justify-center mb-6">
            <Image
              src={pembeKadin}
              alt="Client"
              width={150}
              height={150}
              className="rounded-full"
            />
          </div>

          {/* İsim */}
          <h3 className="text-xl font-semibold mb-2">
            {testimonialList[currentIndex].name}
          </h3>

          {/* Yorum */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            "{testimonialList[currentIndex].feedback}"
          </p>
        </div>

        {/* Slider Noktaları */}
        <div className="flex justify-center space-x-2 mt-4">
          {testimonialList.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                currentIndex === index ? 'bg-orange-500' : 'bg-gray-300'
              }`}
              onClick={() => handleDotClick(index)} // Tıklanıldığında testimonial'ı değiştir
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialComponent;