'use client';
import { useState } from 'react';
import { storage, db } from '@/app/firebaseConfig'; // Adjust import based on your project structure
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import InstructorLayout from "@/app/(pages)/instructor/instructorDash/InstructorLayout";

export default function UploadFile() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [coverPhoto, setCoverPhoto] = useState<File | null>(null); // Added state for cover photo
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [coverPhotoUrl, setCoverPhotoUrl] = useState<string | null>(null); // State for cover photo URL

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructor, setInstructor] = useState('');
    const [duration, setDuration] = useState('');
    const [category, setCategory] = useState('');
    const [level, setLevel] = useState('');
    const [language, setLanguage] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setCoverPhoto(e.target.files[0]);
        }
    };

    const handleFileUpload = async () => {
        if (!selectedFile || !coverPhoto) return;

        setUploading(true);

        try {
            // Upload course file
            const fileRef = ref(storage, `instructor_files/${selectedFile.name}`);
            await uploadBytes(fileRef, selectedFile);
            const fileUrl = await getDownloadURL(fileRef);
            setFileUrl(fileUrl);

            // Upload cover photo
            const coverPhotoRef = ref(storage, `cover_photos/${coverPhoto.name}`);
            await uploadBytes(coverPhotoRef, coverPhoto);
            const coverPhotoUrl = await getDownloadURL(coverPhotoRef);
            setCoverPhotoUrl(coverPhotoUrl);

            setUploadError(null);

            // Save course information to Firestore
            await addDoc(collection(db, 'courses'), {
                title,
                description,
                instructor,
                duration,
                category,
                level,
                language,
                photoURL: coverPhotoUrl, // Use cover photo URL
                fileUrl
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                setUploadError(error.message);
            } else {
                setUploadError('An unknown error occurred');
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <InstructorLayout>
            <h1 className="text-2xl font-semibold mb-4">Upload File</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="mb-4"
                />
                <input
                    type="file"
                    onChange={handleCoverPhotoChange} // Handle cover photo change
                    className="mb-4"
                />
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                />
                <input
                    type="text"
                    placeholder="Instructor"
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                />
                <input
                    type="text"
                    placeholder="Duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                />
                <input
                    type="text"
                    placeholder="Level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                />
                <input
                    type="text"
                    placeholder="Language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg mb-2"
                />
                <button
                    onClick={handleFileUpload}
                    className="btn bg-orange-400 text-white hover:bg-blue-400"
                    disabled={uploading}
                >
                    {uploading ? 'Uploading...' : 'Upload File'}
                </button>
                {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}
                {fileUrl && (
                    <div className="mt-4">
                        <p>File uploaded successfully! <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">View File</a></p>
                    </div>
                )}
                {coverPhotoUrl && (
                    <div className="mt-4">
                        <p>Cover photo uploaded successfully! <a href={coverPhotoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Cover Photo</a></p>
                    </div>
                )}
            </div>
        </InstructorLayout>
    );
}
