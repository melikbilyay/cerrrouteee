// pages/cart.tsx
'use client'

import React from 'react';
import { useCart } from '@/app/contexts/CartContext';
import Link from 'next/link';

const CartPage: React.FC = () => {
    const { cart, removeFromCart } = useCart();

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            <div className="flex flex-wrap -mx-4">
                {/* Left Section - Cart Items */}
                <div className="w-full lg:w-2/3 px-4 mb-6 lg:mb-0">
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-600 font-medium">Your cart is empty.</p>
                    ) : (
                        <ul>
                            {cart.map((item) => (
                                <li key={item.id} className="mb-4 border p-4 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-semibold">{item.title}</h3>
                                            <p className="text-gray-600">{item.description}</p>
                                            {item.price !== undefined && (
                                                <p className="text-gray-800 font-bold">${item.price.toFixed(2)}</p>
                                            )}
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

                    <h3 className="text-lg font-semibold mb-4 mt-6">You May Also Like</h3>
                    <ul>
                        {/* Placeholder for recommended courses */}
                        <li className="mb-4 border p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold">Recommended Course Title</h3>
                                    <p className="text-gray-600">Recommended Course Description</p>
                                </div>
                                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                                    Add to Cart
                                </button>
                            </div>
                        </li>
                        {/* Additional recommended courses can be added here */}
                    </ul>
                </div>
                {/* Right Section - Checkout */}
                <div className="w-full lg:w-1/3 px-4">
                    <div className="border p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                        <div className="mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="text-gray-800 font-bold">
                                    ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
                                </span>
                            </div>
                        </div>
                        <Link href="/checkout">
                            <button className="bg-orange-400 text-white py-2 px-4 rounded w-full">
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
