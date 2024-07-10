// pages/courses.js

'use client'
import { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig'; // Adjust path as per your project structure
import { collection, getDocs } from 'firebase/firestore';
import CourseCard from '../../components/CourseCard'; // Import the CourseCard component
import LoadingCard from '../../components/LoadingCard'; // Import the LoadingCard component

interface Course {
    id: string;
    title: string;
    description: string;
    instructor: string;
    duration: string;
    photoURL?: string; // Make URL field optional if not always present
}

const CoursesPage = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'courses'));
                const coursesData: Course[] = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        title: data.title || "", // Ensure to handle optional fields properly
                        description: data.description || "",
                        instructor: data.instructor || "",
                        duration: data.duration || "",
                        photoURL: data.photoURL || "" // Handle optional URL field correctly
                    };
                });
                setCourses(coursesData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses: ', error);
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return (
            <div className="mt-12 flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl">
                    {[...Array(8)].map((_, index) => (
                        <LoadingCard key={index} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mt-12 flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl">
                {courses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
};

export default CoursesPage;
