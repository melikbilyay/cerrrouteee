'use client';

import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/app/firebaseConfig'; // Path to your Firebase config

interface InstructorLayoutProps {
    children: ReactNode;
}

export default function InstructorLayout({ children }: InstructorLayoutProps) {
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
        <section className="bg-gray-100 min-h-screen flex">
            <aside className="w-64 bg-white shadow-lg">
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4">Instructor Dashboard</h2>
                    <nav>
                        <ul>
                            <li>
                                <Link href="/instructor/instructorDash/profile" className="block py-2 px-4 text-gray-800 hover:bg-gray-200">Profile</Link>
                            </li>
                            <li>
                                <Link href="/instructor/instructorDash/upload" className="block py-2 px-4 text-gray-800 hover:bg-gray-200">Upload Files</Link>
                            </li>
                            <li>
                                <Link href="/instructor/instructorDash/settings" className="block py-2 px-4 text-gray-800 hover:bg-gray-200">Settings</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="mt-6">
                        <button onClick={handleLogout} className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-400">
                            Logout
                        </button>
                    </div>
                </div>
            </aside>
            <main className="flex-1 p-6">
                {children}
            </main>
        </section>
    );
}
