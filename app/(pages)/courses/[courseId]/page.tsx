'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '@/app/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useCart } from '@/app/contexts/CartContext';
import Cart from '../../../components/Cart';
import ReactPlayer from 'react-player';

// Modal component
const VideoModal: React.FC<{ url: string; onClose: () => void; }> = ({ url, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white p-4 rounded-lg relative w-3/4 max-w-2xl h-3/4 max-h-96">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                >
                    &times; {/* Close button */}
                </button>
                <ReactPlayer url={url} controls width="100%" height="100%" />
            </div>
        </div>
    );
};

interface CourseDetailPageProps {
    params: {
        courseId: string;
    };
}

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ params }) => {
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [couponCode, setCouponCode] = useState<string>('');
    const { addToCart } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);

    useEffect(() => {
        if (!params.courseId) return;

        const fetchCourse = async () => {
            try {
                const docRef = doc(db, 'courses', params.courseId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setCourse(docSnap.data());
                } else {
                    console.error('No such document with ID:', params.courseId);
                    setCourse(null);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching course with ID', params.courseId, ':', error);
                setLoading(false);
            }
        };

        fetchCourse();
    }, [params.courseId]);

    const handleAddToCart = () => {
        if (course) {
            addToCart(course);
            setIsCartOpen(true);
        } else {
            console.error('No course data available to add to cart');
        }
    };

    const handleCartClose = () => {
        setIsCartOpen(false);
    };

    const handlePlayVideo = () => {
        console.log('Attempting to play video...');
        if (course && course.fileUrl) {
            console.log('Video URL:', course.fileUrl);
            setShowPlayer(true);
        } else {
            console.error('No video URL available');
        }
    };

    const handleCloseModal = () => {
        console.log('Closing video modal');
        setShowPlayer(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div>Loading...</div>
            </div>
        );
    }

    if (!course) {
        return <div>Course not found or failed to fetch course details</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <Link href="/courses">
                    <button className="text-orange-400 py-2 px-4 hover:text-orange-300">
                        Back to Courses
                    </button>
                </Link>
            </div>
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-3/4 pr-8">
                    <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                    <p className="text-lg text-gray-600 mb-6">{course.description}</p>

                    {/* Rating, student count, last updated date */}
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="flex items-center text-orange-400 text-xl">
                            {typeof course.rating === 'number' && !isNaN(course.rating) && course.rating >= 0 && course.rating <= 5 ? (
                                <>
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}
                                              className={i < Math.floor(course.rating) ? 'text-orange-400' : 'text-gray-300'}>
                        ★
                    </span>
                                    ))}
                                </>
                            ) : (
                                <span>No Rating</span>
                            )}
                            <span className="ml-2">{course.rating}</span>
                        </div>
                        <span className="text-gray-600">{course.studentCount} students</span>
                        <span className="text-gray-600">Last updated: {course.lastUpdated}</span>
                    </div>


                    {/* Instructor Info */}
                    <div className="flex items-center mb-6">
                        <img src={course.instructorImage} alt="Instructor" className="w-12 h-12 rounded-full mr-4"/>
                        <p className="text-lg text-gray-700">Instructor: {course.instructor}</p>
                    </div>

                    {/* Learning Objectives */}
                    <h2 className="text-2xl font-semibold mb-4">What You'll Learn</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        {course.learningPoints}
                    </ul>
                </div>

                <div className="w-full lg:w-1/4 lg:sticky lg:top-4 bg-white shadow-lg p-6 rounded-lg">
                    {/* Course Cover */}
                    <div className="mb-4 relative">
                        <img
                            src={course.photoURL}
                            alt="Course Cover"
                            className="w-full h-36 object-cover rounded-lg cursor-pointer"
                            onClick={handlePlayVideo} // Click on the cover to play the video

                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <button className="bg-white rounded-full p-2 shadow-lg" onClick={handlePlayVideo}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-orange-500"
                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M14.752 11.168l-5.4-3.12v6.24l5.4-3.12z"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Price and Add to Cart Button */}
                    <div className="text-2xl font-bold mb-4">{course.price} ₺</div>
                    <button
                        className="bg-orange-500 text-white py-2 px-4 w-full rounded-lg hover:bg-orange-600 mb-4"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>

                    {/* Coupon Code Input */}
                    <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                        className="bg-gray-600 text-white py-2 px-4 w-full rounded-lg hover:bg-gray-700"
                        onClick={() => console.log(`Coupon ${couponCode} applied`)}
                    >
                        Apply Coupon
                    </button>
                </div>
            </div>

            {/* Cart Panel */}
            {isCartOpen && <Cart onClose={handleCartClose}/>}

            {/* Video Modal */}
            {showPlayer && <VideoModal url={course.fileUrl} onClose={handleCloseModal}/>}
        </div>
    );
};

export default CourseDetailPage;
