'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBookOpen,
    faVideo,
    faGlobe,
    faChalkboardTeacher,
} from '@fortawesome/free-solid-svg-icons';
import Footer from '@/app/components/ui/footer';
import instructor from '/public/images/instructor.webp';

const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
};

const InstructorPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header Section */}
            <header className="bg-gradient-to-r from-orange-300 to-red-300 text-white py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row items-center">
                    {/* Left Text Section */}
                    <motion.div
                        className="lg:w-1/2 text-center lg:text-left"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                            Become a World-Class Instructor
                        </h1>
                        <p className="text-lg md:text-xl leading-relaxed mb-8">
                            Empower learners globally by creating transformative courses. Share your expertise and make an impact.
                        </p>
                        <a
                            href="/instructor/instructorRegister"
                            className="bg-white text-orange-400 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition"
                        >
                            Join as an Instructor
                        </a>
                    </motion.div>

                    {/* Right Image Section */}
                    <motion.div
                        className="lg:w-2/5 lg:pl-28 mb-8 lg:mb-0"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <Image
                            src={instructor}
                            alt="Instructors collaborating"
                            className="rounded-lg shadow-lg object-cover"
                        />
                    </motion.div>
                </div>
            </header>

            {/* Why Become an Instructor Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <motion.h2
                        className="text-3xl font-extrabold text-center mb-12"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.8 }}
                    >
                        Why Teach with Us?
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: 'Global Reach',
                                description: 'Connect with learners from over 100 countries.',
                                icon: faGlobe,
                            },
                            {
                                title: 'Flexible Schedule',
                                description: 'Teach at your convenience, on your terms.',
                                icon: faChalkboardTeacher,
                            },
                            {
                                title: 'Creative Freedom',
                                description: 'Design courses that reflect your expertise.',
                                icon: faVideo,
                            },
                            {
                                title: 'Earn as You Teach',
                                description: 'Generate income by sharing your knowledge.',
                                icon: faBookOpen,
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition-transform transform hover:scale-105"
                                initial="hidden"
                                animate="visible"
                                variants={fadeIn}
                                transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
                            >
                                <FontAwesomeIcon
                                    icon={item.icon}
                                    className="text-4xl text-orange-400 mb-4"
                                />
                                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="bg-gradient-to-r from-orange-300 to-red-300 text-white py-20 text-center">
                <div className="max-w-3xl mx-auto px-6 md:px-12">
                    <motion.h2
                        className="text-3xl md:text-4xl font-extrabold mb-6"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.8 }}
                    >
                        Ready to Share Your Expertise?
                    </motion.h2>
                    <motion.p
                        className="text-lg mb-8"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        Join a thriving community of educators. Create impactful courses and unlock new opportunities.
                    </motion.p>
                    <motion.a
                        href="/instructor/instructorRegister"
                        className="bg-white text-orange-400 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        Get Started Today
                    </motion.a>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default InstructorPage;
