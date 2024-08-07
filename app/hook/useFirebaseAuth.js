// hooks/useFirebaseAuth.js

import { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig'; // Path to your Firebase configuration file

const useFirebaseAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signIn = async (email, password) => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.error('Error signing in:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    const signOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error('Error signing out:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    return {
        user, // Assuming `user` can initially be `null`, which is handled in the component
        loading,
        signIn,
        signOut
    };
};

export default useFirebaseAuth;
