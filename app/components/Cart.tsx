'use client'


import React, { useEffect, useRef, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface CartProps {
    onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
    const { cart, removeFromCart } = useCart();
    const cartRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Match this timeout with the exit animation duration
    };

    // Close cart on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                handleClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed inset-y-0 right-0 z-50 bg-white w-96 shadow-lg overflow-y-auto"
                    ref={cartRef}
                >
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-500 to-orange-400 text-white">
                        <h2 className="text-xl font-bold">Shopping Cart</h2>
                        <button className="text-gray-300 hover:text-white" onClick={handleClose}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-6">
                        {cart.length === 0 ? (
                            <p className="text-center text-gray-600 font-medium">Your cart is empty.</p>
                        ) : (
                            <ul>
                                {cart.map((item) => (
                                    <li key={item.id} className="mb-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                                <p className="text-gray-600">{item.description}</p>
                                            </div>
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="absolute bottom-0 p-2 bg-white shadow-inner">
                            <input
                                type="text"
                                className="w-full p-2 mb-2 border border-gray-300 rounded"
                                placeholder="Enter coupon code"
                            />
                            <button className="bg-gray-500 text-white py-2 px-4 rounded w-full mb-4">
                                Apply Coupon
                            </button>
                            <Link href="/cart">
                                <button
                                    className="bg-orange-400 text-white py-2 px-4 rounded w-full"
                                    onClick={handleClose}
                                >
                                    Go to Cart
                                </button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Cart;
