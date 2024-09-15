import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../contexts/CartContext'; // Adjust the import path as needed
import Cart from './Cart'; // Adjust the import path as needed

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
    const [isCartVisible, setCartVisible] = useState(false);
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
        setCartVisible(true); // Show the cart when item is added
    };

    const handleCloseCart = () => {
        setCartVisible(false); // Hide the cart
    };

    return (
        <div
            className="max-w-sm shadow-lg rounded-lg overflow-hidden cursor-pointer"
            onClick={handleCardClick}
        >
            <img className="w-full h-64 object-cover" src={course.photoURL || '/default-image.jpg'} alt={course.title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{course.title}</div>
                <p className="text-gray-700 text-base">{course.description}</p>
                <p className="text-gray-600">Instructor: {course.instructor}</p>
                <p className="text-gray-600">Duration: {course.duration}</p>
                <button
                    className="mt-4 bg-orange-400 text-white py-2 px-4 rounded"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>
            {isCartVisible && <Cart onClose={handleCloseCart} />}
        </div>
    );
};

export default CourseCard;
