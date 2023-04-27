import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { FirebaseConfig } from "../Firebase.Config";
import { FirebaseConfig } from './../Firebase.Config';
import { createContext, useEffect, useState } from "react";

const firebaseConfig = FirebaseConfig;
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const allContext = createContext();

const AuthContext = ({ children }) => {
    const [user, SetUser] = useState();
    const [client, setClient] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [loader, setLoader] = useState(true);

    const signIn = (email, password) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const signUp = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const logOut = () => {
        setLoader(true);
        return signOut(auth);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            SetUser(currentUser);
            setLoader(false);
        })

        return () => {
            return unsubscribe();
        }
    }, [])
    const authInfo = {
        user,
        signIn,
        signUp,
        logOut,
        setAdmin,
        setClient,
        admin,
        client,
        loader
    }
    return (
        <allContext.Provider value={authInfo}>
            {children}
        </allContext.Provider>
    )
}
export default AuthContext;

