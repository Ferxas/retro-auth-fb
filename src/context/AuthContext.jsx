import { createContext, useContext, useEffect, useState } from 'react';
import { loginGoogle, loginUser } from '../services/authService';
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from '../services/firebaseConfig';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return () => unsubscribe();
    }, []);
    

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}