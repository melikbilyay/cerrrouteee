// src/utils/fetchUserProfile.ts
import { db } from "@/app/firebaseConfig"; // Firebase yapılandırma dosyanızı kontrol edin
import { doc, getDoc } from "firebase/firestore";

export const fetchUserProfile = async (uid: string) => {
    try {
        const docRef = doc(db, 'usersIns', uid); // Koleksiyon adı 'users' olduğundan emin olun
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.error('No such document!');
            return null;
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }
};
