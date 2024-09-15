'use client'
import InstructorLayout from "@/app/(pages)/instructor/instructorDash/InstructorLayout";

export default function SettingsPage() {
    return (
        <InstructorLayout>
            <h1 className="text-2xl font-semibold mb-4">Settings</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                {/* Add settings options here */}
                <p>Settings options will be displayed here.</p>
            </div>
        </InstructorLayout>
    );
}
