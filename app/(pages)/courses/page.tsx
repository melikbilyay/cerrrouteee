'use client';
import { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import CourseCard from '../../components/CourseCard';
import LoadingCard from '../../components/LoadingCard';

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
                        language: data.language || "", // Make sure this is consistent
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
                <div className="w-1/4 p-4">
                    <h2 className="text-lg font-semibold mb-4 text-center">Filter Courses</h2>

                    <div className="space-y-4">
                        {/* Filter by Title */}
                        <input
                            type="text"
                            name="title"
                            placeholder="Search by title"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={filter.title}
                            onChange={handleFilterChange}
                        />

                        {/* Filter by Instructor */}
                        <input
                            type="text"
                            name="instructor"
                            placeholder="Search by instructor"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={filter.instructor}
                            onChange={handleFilterChange}
                        />

                        {/* Filter by Duration */}
                        <input
                            type="text"
                            name="duration"
                            placeholder="Search by duration"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={filter.duration}
                            onChange={handleFilterChange}
                        />

                        {/* Filter by Category */}
                        <select
                            name="category"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={filter.category}
                            onChange={handleFilterChange}
                        >
                            <option value="">Select Category</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Design">Design</option>
                            {/* Add more categories as needed */}
                        </select>

                        {/* Filter by Level */}
                        <select
                            name="level"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={filter.level}
                            onChange={handleFilterChange}
                        >
                            <option value="">Select Level</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>

                        {/* Filter by Language */}
                        <select
                            name="language"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={filter.language}
                            onChange={handleFilterChange}
                        >
                            <option value="">Select Language</option>
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            {/* Add more languages as needed */}
                        </select>
                    </div>
                </div>
                <div className="w-3/4 p-4">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {[...Array(8)].map((_, index) => (
                                <LoadingCard key={index}/>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredCourses.map(course => (
                                <CourseCard key={course.id} course={course}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoursesPage;
