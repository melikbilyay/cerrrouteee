'use client';

import { useEffect, useState } from "react";
import InstructorLayout from "@/app/(pages)/instructor/instructorDash/InstructorLayout";
import { fetchUserProfile } from "@/app/utils/fetchUserProfile"; // Bu dosyanın yolu doğru mu kontrol edin
import { auth } from "@/app/firebaseConfig"; // Firebase authentication'ı kontrol edin

export default function ProfilePage() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            if (auth.currentUser) {
                const user = auth.currentUser;
                const data = await fetchUserProfile(user.uid);
                if (data) {
                    setProfile(data);
                } else {
                    setError("Error fetching profile");
                }
                setLoading(false);
            } else {
                setError("No user logged in");
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <InstructorLayout>
            <h1 className="text-2xl font-semibold mb-4">Instructor Profile</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                {profile ? (
                    <div>
                        <p><strong>Name:</strong> {profile.name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Area of Expertise:</strong> {profile.areaOfExpertise}</p>
                        <p><strong>Years of Experience:</strong> {profile.experience}</p>
                        <p><strong>Preferred Teaching Mode:</strong> {profile.preferredMode}</p>
                    </div>
                ) : (
                    <p>No profile information available.</p>
                )}
            </div>
        </InstructorLayout>
    );
}
