// pages/courses/index.tsx
'use client';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import CourseCard from '../../components/CourseCard';
import LoadingCard from '../../components/LoadingCard';
import CourseFilter from '../../components/CourseFilter';

interface Course {
    id: string; // Document ID
    title: string;
    description: string;
    instructor: string;
    duration: string;
    category: string;
    level: string;
    language: string; // Added language field
    photoURL?: string;
}

const CoursesPage = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState({
        title: '',
        instructor: '',
        duration: '',
        category: '',
        level: '',
        language: ''
    });

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'courses'));
                const coursesData: Course[] = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        title: data.title || "",
                        description: data.description || "",
                        instructor: data.instructor || "",
                        duration: data.duration || "",
                        category: data.category || "",
                        level: data.level || "",
                        language: data.language || "",
                        photoURL: data.photoURL || "",
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

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilter({
            ...filter,
            [name]: value
        });
    };

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(filter.title.toLowerCase()) &&
        course.instructor.toLowerCase().includes(filter.instructor.toLowerCase()) &&
        course.duration.toLowerCase().includes(filter.duration.toLowerCase()) &&
        (filter.category ? course.category === filter.category : true) &&
        (filter.level ? course.level === filter.level : true) &&
        (filter.language ? course.language === filter.language : true)
    );

    return (
        <div className="mt-12 flex justify-center">
            <div className="flex w-full max-w-7xl">
                {/* Filter Section */}
                <CourseFilter filter={filter} onFilterChange={handleFilterChange} />

                {/* Courses Section */}
                <div className="container mx-auto flex flex-col items-center p-4">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {[...Array(8)].map((_, index) => (
                                <LoadingCard key={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredCourses.length > 0 ? (
                                filteredCourses.map(course => (
                                    <CourseCard key={course.id} course={course} />
                                ))
                            ) : (
                                <div className="col-span-4 text-center text-gray-600">
                                    No courses found matching your criteria.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoursesPage;
