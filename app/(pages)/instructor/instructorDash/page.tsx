'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from "@/app/firebaseConfig";
import InstructorLayout from "./InstructorLayout";

export default function InstructorProfile() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/login'); // Redirect to login page after logout
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error during sign out:', error.message);
            } else {
                console.error('Unknown error during sign out');
            }
        }
    };

    return (
        <InstructorLayout>
            <h1 className="text-2xl font-semibold mb-4">Instructor Dashboard</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Welcome to Your Dashboard</h2>
                <p className="mb-4">Here you can manage your profile, upload files, and adjust settings. Use the sidebar to navigate to different sections.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-orange-200 p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2">Profile</h3>
                        <p>Update your profile information and manage your personal details.</p>
                        <a href="/instructor/profile" className="text-red-600  hover:underline mt-2 inline-block">Go to Profile</a>
                    </div>
                    <div className="bg-orange-200 p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2">Upload Files</h3>
                        <p>Upload files to the platform and manage your submissions.</p>
                        <a href="/instructor/upload" className="text-red-600 hover:underline mt-2 inline-block">Go to Upload</a>
                    </div>
                    <div className="bg-orange-200 p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2">Settings</h3>
                        <p>Adjust your account settings and preferences.</p>
                        <a href="/instructor/settings" className="text-red-600 hover:underline mt-2 inline-block">Go to Settings</a>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <button onClick={handleLogout} className="btn text-white bg-red-500 hover:bg-red-400">
                        Logout
                    </button>
                </div>
            </div>
        </InstructorLayout>
    );
}
