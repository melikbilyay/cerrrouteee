// pages/index.js

import React from 'react';
import styles from './Home.module.css';
import Hero from '../../components/corporate/hero'; 
import Slider from '@/app/components/corporate/slider';
import SustainabilityComponent from '@/app/components/corporate/sustainability';
import UpskillComponent from '@/app/components/corporate/upskillComponent';
import TestimonialComponent from '@/app/components/corporate/testimonialComponent';
import Newsletter from '@/app/components/newsletter';
import Footer from '@/app/components/ui/footer';
import PopularCoursesSlider from '@/app/components/corporate/popularCoursesSlider';

export default function Home() {
    return (
        <div className={styles.container}>

            {/* Hero bileşenini buraya ekledik */}
            <Hero />

            {/* Slider ekleniyor */}
            <Slider />
            
            {/* Sürdürülebilirlik bileşeni ekleniyor */}    
            <SustainabilityComponent />
            <UpskillComponent />
            <TestimonialComponent />
            <PopularCoursesSlider />

            {/* Popüler Kurslar ile Newsletter arasında boşluk */}
            <div className="my-12"></div> {/* Bu satır boşluk ekler */}

            <Newsletter />
            <Footer />

        </div>
    );
}