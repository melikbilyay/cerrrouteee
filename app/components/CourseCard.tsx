// components/CourseCard.js

import React from 'react';

interface Course {
    id: string;
    title: string;
    description: string;
    instructor: string;
    duration: string;
    photoURL?: string;  // Assuming photoURL is always present based on previous discussions
    // Add other fields as needed
}

interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    return (
        <div className="max-w-sm shadow-lg rounded-lg overflow-hidden">
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
