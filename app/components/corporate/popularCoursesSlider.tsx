"use client";

import React, { useState, useEffect } from 'react';

const PopularCoursesSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Her 4 kutu bir "sayfa" gibi düşünülüyor, her daire bir sayfayı temsil eder.
  const totalPages = Math.ceil(8 / 4);

  // Sliderın otomatik kayması için useEffect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
    }, 5000); // Her 5 saniyede bir geçiş yapar

    return () => clearInterval(intervalId); // Bileşen temizlenince interval durdurulur
  }, [totalPages]);

  // Daireye tıklayınca slider'ı değiştirir
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Kutuların gösterilmesi
  const visibleCourses = [
    ...Array(8).fill(null).slice(currentIndex * 4, currentIndex * 4 + 4), // Sayfa başına 4 kutu gösteriliyor
  ];

  return (
    <section className="popular-courses-section py-12" style={{ backgroundColor: '#FFA500' }}> {/* Arka plan turuncu */}
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Popular Courses</h2>

        {/* Slider */}
        <div className="flex space-x-4 overflow-x-auto p-4">
          {visibleCourses.map((_, index) => (
            <div
              key={index}
              className="min-w-[250px] h-[150px] bg-white rounded-lg shadow-lg flex items-center justify-center"
            >
              <p className="text-gray-500">Course {currentIndex * 4 + index + 1}</p> {/* Kutunun içi */}
            </div>
          ))}
        </div>

        {/* Slider Noktaları */}
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                currentIndex === index ? 'bg-orange-700' : 'bg-gray-300'
              }`}
              onClick={() => handleDotClick(index)} // Tıklanıldığında slider'ı değiştir
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCoursesSlider;