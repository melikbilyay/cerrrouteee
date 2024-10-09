// hooks/useFirebaseAuth.js

import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig'; // Path to your Firebase configuration file
import { User, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth'; // Import methods directly

const useFirebaseAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password); // Pass the auth object as the first argument
        } catch (error) {
            console.error('Error signing in:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth); // Use firebaseSignOut for sign out
        } catch (error) {
            console.error('Error signing out:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    return {
        user,
        loading,
        signIn,
        signOut
    };
};

export default useFirebaseAuth;
