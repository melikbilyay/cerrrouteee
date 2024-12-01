import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../contexts/CartContext'; // Adjust the import path as needed

interface Course {
    id: string; // Document ID
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

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const router = useRouter();
    const { addToCart } = useCart(); // Use the addToCart function from CartContext

    const handleCardClick = () => {
        router.push(`/courses/${course.id}`); // Navigate using document ID
    };

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Prevent triggering handleCardClick
        const cartItem = {
            id: course.id,
            title: course.title,
            description: course.description,
            price: 0, // Replace with actual price if available
            image: course.photoURL || '', // Fallback if photoURL is undefined
        };
        addToCart(cartItem);
    };

    return (
        <div
            className="relative max-w-sm shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl"
            onClick={handleCardClick}
        >
            {/* Container for the image with padding */}
            <div className="p-2">
                <img
                    className="w-full h-full object-cover rounded-lg" // Added rounded corners for the image
                    src={course.photoURL || '/default-image.jpg'}
                    alt={course.title}
                />
            </div>
            <div className="px-6 py-4 bg-white">
                <div className="font-bold text-xl mb-2">{course.title}</div>
                <p className="text-gray-700">Instructor: {course.instructor}</p>
                <p className="text-gray-700">Duration: {course.duration}</p>
                <button
                    className="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-200"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default CourseCard;
