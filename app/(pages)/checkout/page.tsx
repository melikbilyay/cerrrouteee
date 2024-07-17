'use client'// pages/checkout.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/contexts/CartContext';

const CheckoutPage: React.FC = () => {
    const router = useRouter();
    const { cart } = useCart();

    // State for form fields
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        couponCode: '',
    });

    // Placeholder for handling checkout logic
    const handleCheckout = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Implement your checkout logic here, e.g., processing payment, order creation, etc.
        alert('Checkout functionality will be implemented here.');
        // Redirect or navigate to the thank you page or order confirmation page
        router.push('/thank-you');
    };

    // Update form state on input change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Checkout</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                {/* Course summary */}
                {cart.length > 0 && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Course Summary</h2>
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center justify-between mb-2">
                                <div>
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-gray-600">Price: ${item.price}</p>
                                </div>
                                <p className="text-gray-600">Qty: 1</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Checkout form */}
                <form onSubmit={handleCheckout}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <label htmlFor="cardNumber" className="block text-gray-700 font-semibold mb-2">
                            Card Number
                        </label>
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label htmlFor="expirationDate" className="block text-gray-700 font-semibold mb-2">
                                Expiration Date
                            </label>
                            <input
                                type="text"
                                id="expirationDate"
                                name="expirationDate"
                                value={formData.expirationDate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="cvv" className="block text-gray-700 font-semibold mb-2">
                                CVV
                            </label>
                            <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <label htmlFor="couponCode" className="block text-gray-700 font-semibold mb-2">
                            Coupon Code (if any)
                        </label>
                        <input
                            type="text"
                            id="couponCode"
                            name="couponCode"
                            value={formData.couponCode}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-500"
                        >
                            Place Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
