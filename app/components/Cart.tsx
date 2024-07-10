// Import necessary dependencies
import { useState } from 'react';
import { motion } from 'framer-motion';

// Define interface for props
interface CartProps {
    onClose: () => void; // Callback function to close the cart
}

// Cart component
const Cart: React.FC<CartProps> = ({ onClose }) => {
    const [isOpen, setIsOpen] = useState(true); // State to manage cart visibility

    // Function to handle closing the cart
    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    return (
        <motion.div
            initial={{ x: '100%' }} // Initial position off-screen to the right
            animate={{ x: isOpen ? 0 : '100%' }} // Slide in when isOpen is true, otherwise slide out
            transition={{ type: 'spring', stiffness: 300, damping: 30 }} // Spring animation for smooth transition
            className="fixed inset-y-0 right-0 z-50 bg-white w-96 shadow-lg overflow-y-auto"
        >
            {/* Cart header */}
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-500 to-orange-400 text-white">
                <h2 className="text-xl font-bold">Shopping Cart</h2>
                {/* Close button */}
                <button className="text-gray-300 hover:text-white" onClick={handleClose}>
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
            {/* Cart content */}
            <div className="p-6">
                <p className="text-center text-gray-600 font-medium">Your cart is empty.</p>
            </div>
        </motion.div>
    );
};

export default Cart;
