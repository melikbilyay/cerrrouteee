'use client'
// Ensure to import necessary modules
import { useEffect } from 'react';
import Link from 'next/link';
import useFirebaseAuth from '../../hook/useFirebaseAuth'; // Adjust path as per your project structure
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
                <div>Loading...</div> // Handle loading state as needed
            ) : (
                <div className="bg-white p-6">
                    <div className="flex items-center mb-4">
                        <img
                            className="h-12 w-12 rounded-full object-cover mr-4"
                            src={user.photoURL || '/default-avatar.png'} // Ensure user is logged in before accessing user properties
                            alt="Profile Picture"
                        />
                        <div>
                            <h1 className="text-xl font-semibold">{user.displayName || 'Guest'}</h1>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                    </div>

                    {/* Example sections */}
                    <section className="mb-8">
                        <h2 className="text-lg font-semibold mb-4">My Courses</h2>
                        {/* Display user's enrolled courses */}
                        <ul>
                            <li>
                                <Link href="/courses/course-id">
                                    <span>Course Name</span>
                                </Link>
                            </li>
                            {/* Repeat for other courses */}
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-lg font-semibold mb-4">My Progress</h2>
                        {/* Show progress indicators */}
                        <p>Progress: 60%</p>
                        {/* Add more detailed progress tracking as needed */}
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold mb-4">Settings</h2>
                        {/* User settings form */}
                        <form>
                            <label htmlFor="displayName">Display Name: </label>
                            <input
                                type="text"
                                id="displayName"
                                name="displayName"
                                defaultValue={user.displayName || ''}
                                // Handle form submission and update profile
                            />
                            {/* Add more fields for email, password, etc. */}
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg">
                                Update Profile
                            </button>
                        </form>
                    </section>

                    <div className="mt-8">
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
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
