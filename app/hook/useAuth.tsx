import { useState, useEffect } from 'react';
import { auth } from './../firebaseConfig';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        await auth.signInWithEmailAndPassword(email, password);
    };

    const logout = async () => {
        await auth.signOut();
    };

    return { user, loading, login, logout };
};

export default useAuth;

export class useAuth {
}
