
// pages/CourseDetailPage.js
'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '../../firebaseConfig'; // Adjust path as per your project structure
import { doc, getDoc } from 'firebase/firestore';

const CourseDetailPage = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const docRef = doc(db, 'courses', courseId);
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
    }, [courseId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
            <img className="w-full h-64 object-cover mb-4" src={course.photoURL} alt={course.title} />
            <p className="text-gray-700 text-base">{course.description}</p>
            <p className="text-gray-600">Instructor: {course.instructor}</p>
            <p className="text-gray-600">Duration: {course.duration}</p>
        </div>
    );
};

export default CourseDetailPage;

