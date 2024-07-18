// pages/thank-you.tsx
'use client'

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ThankYouPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const purchasedItems = searchParams.get('purchasedItems');

    const [items, setItems] = useState([]);

    useEffect(() => {
        if (purchasedItems) {
            setItems(JSON.parse(purchasedItems));
        }
    }, [purchasedItems]);

    const goToHomepage = () => {
        router.push('/profile');
    };

    return (
        <div className="container mx-auto mt-8 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4 text-center">Thank You for Your Purchase!</h1>
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
                {items.length > 0 ? (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Purchased Items</h2>
                        {items.map((item: any) => (
                            <div key={item.id} className="flex items-center justify-between mb-2">
                                <div>
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-gray-600">Price: ${item.price}</p>
                                </div>
                                <p className="text-gray-600">Qty: 1</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No items found.</p>
                )}
            </div>
            <button
                onClick={goToHomepage}
                className="mt-6 bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-500"
            >
                Go to Courses
            </button>
        </div>
    );
};

export default ThankYouPage;
