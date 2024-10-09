'use client'
import { useEffect } from 'react';
import Link from 'next/link';
import useFirebaseAuth from '../../firebase/useFirebaseAuth'; // Adjust path as per your project structure

interface User {
    displayName?: string;
    email: string;
    photoURL?: string;
}

const ProfilePage = () => {
    const { user, signOut } = useFirebaseAuth() as { user: User | null; signOut: () => Promise<void> };

    // Ensure user is authenticated or redirect
    useEffect(() => {
        if (!user) {
            // Redirect to signin page if user is not logged in
        }
    }, [user]);

    const handleLogout = async () => {
        try {
            await signOut();
            // Redirect to signin page after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="container mx-auto mt-8">
            {!user ? (
                <div className="flex items-center justify-center h-2/3">
                    <div className="animate-pulse text-center">
                        <div className="loader mb-4"></div>
                        <p>Loading...</p>
                    </div>
                </div>
            ) : (
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <div className="  flex items-center mb-6">
                        <img
                            className="h-16 w-16 rounded-full object-cover mr-6 border-2 border-gray-300"
                            src={user.photoURL || 'https://i.ibb.co/GF74SDT/vecteezy-cr-letter-initial-logo-vector-icon-illustration-6640924.jpg'} // Ensure user is logged in before accessing user properties
                            alt="Profile Picture"
                        />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{user.displayName || 'Guest'}</h1>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                    </div>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Courses</h2>
                        <ul className="list-disc pl-5">
                            <li className="mb-2">
                                <Link href="/courses/course-id">
                                    <span className="text-blue-600 hover:underline">Course Name</span>
                                </Link>

                            </li>
                            <li className="mb-2">
                                <Link href="/courses/course-id">
                                    <span className="text-blue-600 hover:underline">Course Name</span>
                                </Link>

                            </li>

                            {/* Repeat for other courses */}
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Progress</h2>
                        <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                        Progress
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-semibold inline-block text-blue-600">
                                        60%
                                    </span>
                                </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                <div style={{ width: "60%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Settings</h2>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">Display Name</label>
                                <input
                                    type="text"
                                    id="displayName"
                                    name="displayName"
                                    defaultValue={user.displayName || ''}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            {/* Add more fields for email, password, etc. */}
                            <button
                                type="submit"
                                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Update Profile
                            </button>
                        </form>
                    </section>

                    <div className="mt-8">
                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
