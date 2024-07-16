import React from 'react';
import { useRouter } from 'next/navigation';

interface Course {
    id: string;
    title: string;
    description: string;
    instructor: string;
    duration: string;
    category: string;
    level: string;
    photoURL?: string;
}

interface CourseCardProps {
    course: Course;
}

const toUrlFriendlyString = (str: string) => {
    return str
        .toLowerCase()
        .trim()
        .replace(/\s+/g, ''); // Boşlukları kaldır
};


const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const router = useRouter();
    const urlFriendlyTitle = toUrlFriendlyString(course.id);

    const handleCardClick = () => {
      
        router.push(`/courses/${urlFriendlyTitle}`);
    };

    return (
        <div
            className="max-w-sm shadow-lg rounded-lg overflow-hidden cursor-pointer"
            onClick={handleCardClick}
        >
            <img className="w-full h-64 object-cover" src={course.photoURL} alt={course.title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{course.title}</div>
                <p className="text-gray-700 text-base">{course.description}</p>
                <p className="text-gray-600">Instructor: {course.instructor}</p>
                <p className="text-gray-600">Duration: {course.duration}</p>
            </div>
        </div>
    );
};

export default CourseCard;
