'use client';

import { useState } from "react";
import Link from 'next/link';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "@/app/firebaseConfig";
import { useRouter } from 'next/navigation';
import { doc, setDoc } from "firebase/firestore";

export default function InstructorSignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [areaOfExpertise, setAreaOfExpertise] = useState("");
    const [experience, setExperience] = useState("");
    const [preferredMode, setPreferredMode] = useState("");
    const [error, setError] = useState("");
    const router = useRouter(); // Initialize router for navigation

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'usersIns', user.uid), {
                name,
                email,
                areaOfExpertise,
                experience,
                preferredMode
            });

            router.push('/instructor/instructorDash');
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error during sign up:', error.message);
                setError(error.message);
            } else {
                console.error('Unknown error during sign up');
                setError('An unknown error occurred');
            }
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            router.push('/instructor/instructorDash');
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return (
        <section className="bg-gradient-to-b from-orange-100 to-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-8">
                        <h1 className="h1">Become an Instructor</h1>
                        <p className="text-gray-600">Join our community of expert instructors and start teaching today!</p>
                    </div>

                    <div className="max-w-sm mx-auto">
                        <form onSubmit={handleSignUp}>
                            {/* Form fields */}
                            <div className="flex flex-wrap -mx-3 mb-4">
                                <div className="w-full px-3">
                                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">
                                        Name <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        className="form-input w-full text-gray-800"
                                        placeholder="Enter your name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-4">
                                <div className="w-full px-3">
                                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">
                                        Email <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        className="form-input w-full text-gray-800"
                                        placeholder="Enter your email address"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-4">
                                <div className="w-full px-3">
                                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">
                                        Password <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        className="form-input w-full text-gray-800"
                                        placeholder="Enter your password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-4">
                                <div className="w-full px-3">
                                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="areaOfExpertise">
                                        Area of Expertise <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        id="areaOfExpertise"
                                        type="text"
                                        className="form-input w-full text-gray-800"
                                        placeholder="Enter your area of expertise"
                                        required
                                        value={areaOfExpertise}
                                        onChange={(e) => setAreaOfExpertise(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-4">
                                <div className="w-full px-3">
                                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="experience">
                                        Years of Experience <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        id="experience"
                                        type="number"
                                        className="form-input w-full text-gray-800"
                                        placeholder="Enter your years of experience"
                                        required
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-4">
                                <div className="w-full px-3">
                                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="preferredMode">
                                        Preferred Teaching Mode <span className="text-red-600">*</span>
                                    </label>
                                    <select
                                        id="preferredMode"
                                        className="form-input w-full text-gray-800"
                                        required
                                        value={preferredMode}
                                        onChange={(e) => setPreferredMode(e.target.value)}
                                    >
                                        <option value="">Select mode</option>
                                        <option value="online">Online</option>
                                        <option value="offline">Offline</option>
                                    </select>
                                </div>
                            </div>
                            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                            <div className="flex flex-wrap -mx-3 mt-6">
                                <div className="w-full px-3">
                                    <button type="submit" className="btn text-white bg-orange-400 hover:bg-orange-300 w-full">
                                        Sign up as Instructor
                                    </button>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500 text-center mt-3">
                                By signing up, you agree to the <a className="underline" href="#0">terms & conditions</a>, and our <a className="underline" href="#0">privacy policy</a>.
                            </div>
                        </form>
                        <div className="flex items-center justify-center mt-6">
                            <button onClick={handleGoogleSignIn} className="btn text-white bg-blue-600 hover:bg-blue-500">
                                Sign up with Google
                            </button>
                        </div>
                        <div className="flex items-center justify-center mt-6 text-sm text-gray-500">
                            Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Log in</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
