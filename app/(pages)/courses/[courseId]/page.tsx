// components/CourseDetailPage.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '@/app/firebaseConfig'; // Adjust path as per your project structure
import { doc, getDoc } from 'firebase/firestore';
import { useCart } from '@/app/contexts/CartContext';
import Cart from '../../../components/Cart';

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
        <div className="container mx-auto p-4 flex">
            <div className="w-1/4 p-4">
                <Link href="/courses">
                    <span className="font-semibold text-orange-400 mb-6 inline-block">&lt; Back to Courses</span>
                </Link>
                <div className="bg-white p-4 rounded shadow">
                    <button
                        className="bg-orange-400 text-white py-2 px-4 rounded mb-4 w-full"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                    <input
                        type="text"
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                        className="bg-gray-500 text-white py-2 px-4 rounded w-full"
                        onClick={() => console.log(`Coupon ${couponCode} applied`)}
                    >
                        Apply Coupon
                    </button>
                </div>
            </div>
            <div className="w-3/4 p-4">
                <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
                <img className="w-full h-64 object-cover mb-4" src={course.photoURL} alt={course.title} />
                <p className="text-gray-700 text-base mb-4">{course.description}</p>
                <p className="text-gray-600 mb-2">Instructor: {course.instructor}</p>
                <p className="text-gray-600 mb-2">Duration: {course.duration}</p>
                <h2 className="text-xl font-semibold mb-2">Course Content</h2>
                <div className="mb-4">
                    {course.sections?.map((section: any, index: number) => (
                        <div key={index} className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                            <ul className="list-disc pl-5">
                                {section.lessons.map((lesson: any, lessonIndex: number) => (
                                    <li key={lessonIndex} className="mb-1">
                                        {lesson.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            {isCartOpen && <Cart onClose={handleCartClose} />}
        </div>
    );
};

export default CourseDetailPage;
