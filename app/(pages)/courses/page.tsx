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
    category: string;
    level: string;
    photoURL?: string; // Make URL field optional if not always present
    // Add optional language field
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
                        title: data.title || "", // Ensure to handle optional fields properly
                        description: data.description || "",
                        instructor: data.instructor || "",
                        duration: data.duration || "",
                        category: data.category || "",
                        level: data.level || "",
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
        (filter.level ? course.level === filter.level : true)
    );

    return (
        <div className="mt-12 flex justify-center">
            <div className="flex w-full max-w-7xl">
                <div className="w-1/4 p-4 border-r border-gray-200">
                    <h2 className="text-lg font-semibold mb-4">Filter Courses</h2>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={filter.title}
                            onChange={handleFilterChange}
                            placeholder="Filter by title"
                            className="w-full p-2 border border-orange-200 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Instructor</label>
                        <input
                            type="text"
                            name="instructor"
                            value={filter.instructor}
                            onChange={handleFilterChange}
                            placeholder="Filter by instructor"
                            className="w-full p-2 border border-orange-200 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Duration</label>
                        <input
                            type="text"
                            name="duration"
                            value={filter.duration}
                            onChange={handleFilterChange}
                            placeholder="Filter by duration"
                            className="w-full p-2 border border-orange-200 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Category</label>
                        <select
                            name="category"
                            value={filter.category}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">All Categories</option>
                            <option value="Programming">Programming</option>
                            <option value="Design">Design</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Business">Business</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Level</label>
                        <select
                            name="level"
                            value={filter.level}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">All Levels</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Language</label>
                        <select
                            name="level"
                            value={filter.language}
                            onChange={handleFilterChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">All Languages</option>
                            <option value="Beginner">English</option>
                            <option value="Intermediate">Türkçe</option>
                            <option value="Advanced">Deutsch</option>
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
