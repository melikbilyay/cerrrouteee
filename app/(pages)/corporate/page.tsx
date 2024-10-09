
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
            <Hero />
            <Slider />
            <SustainabilityComponent />
            <UpskillComponent />
            <TestimonialComponent />
            <PopularCoursesSlider />
            <div className="my-12"></div>
            <Newsletter />
            <Footer />
        </div>
    );
}
