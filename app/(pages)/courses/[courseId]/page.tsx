// components/CourseDetailPage.tsx
'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '@/app/firebaseConfig'; // Adjust path as per your project structure
import { doc, getDoc } from 'firebase/firestore';

const CourseDetailPage = ({ params }: { params: { courseId: string } }) => {
    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!params.courseId) return;

        const fetchCourse = async () => {
            try {
                const docRef = doc(db, 'courses', params.courseId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setCourse(docSnap.data());
                } else {
                    console.log('No such document!');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching course: ', error);
                setLoading(false);
            }
        };

        fetchCourse();
    }, [params.courseId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <Link href="/courses">
                <span className=" font-semibold text-orange-400 mb-6 inline-block">&lt; Back to Courses</span>
            </Link>
            <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
            <img className="w-full h-64 object-cover mb-4" src={course.photoURL} alt={course.title} />
            <p className="text-gray-700 text-base">{course.description}</p>
            <p className="text-gray-600">Instructor: {course.instructor}</p>
            <p className="text-gray-600">Duration: {course.duration}</p>
        </div>
    );
};

export default CourseDetailPage;
