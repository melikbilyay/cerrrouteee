// components/LoadingCard.tsx

import React from 'react';

const LoadingCard: React.FC = () => {
    return (
        <div className="bg-orange-200  shadow-lg rounded-lg overflow-hidden">
            <div className="animate-pulse w-96 h-72 bg-white"></div>
            <div className="px-6 py-4">
                <h2 className="font-semibold text-lg text-gray-600">Loading...</h2>
                <p className="text-gray-400 mt-2">Title:</p>
                <p className="mt-2 text-gray-400">Instructor: </p>
                <p className="text-gray-400">Duration: </p>
            </div>
        </div>
    );
};

export default LoadingCard;
