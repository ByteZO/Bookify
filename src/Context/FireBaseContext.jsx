import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAmEGLGxrw0yMr4z-8Ddz3eeGbBlH34jH4",
  authDomain: "bookify-this.firebaseapp.com",
  projectId: "bookify-this",
  storageBucket: "bookify-this.appspot.com",
  messagingSenderId: "317557661972",
  appId: "1:317557661972:web:4edca1acf65971d544a201",
};

const FireBaseAppIniticalization = initializeApp(firebaseConfig);
const fireBaseAuth = getAuth(FireBaseAppIniticalization);
const googleProvider = new GoogleAuthProvider();
const fireStoreDataBase = getFirestore(FireBaseAppIniticalization);
const stroage = getStorage(FireBaseAppIniticalization);

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export const FireBaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(fireBaseAuth, (user) => {
      user ? setUser(user) : setUser(null);
    });
  }, []);

  const signUpUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(fireBaseAuth, email, password);
  const logInwithEmailandPassword = (email, password) =>
    signInWithEmailAndPassword(fireBaseAuth, email, password);
  const loginWithGoogle = () => signInWithPopup(fireBaseAuth, googleProvider);
  const isLoggedIn = user ? true : false;

  const handleBookUploadListing = async (
    bookName,
    bookPrice,
    bookISDB,
    cover
  ) => {
    const image = ref(stroage, `upload/image/${Date.now()}-${cover}`);
    const imageInfo = await uploadBytes(image, cover);
    return (Response = await addDoc(collection(fireStoreDataBase, "books"), {
      bookName,
      bookISDB,
      bookPrice,
      imageUrl: imageInfo.ref.fullPath,
      userID: user.uid,
      author: user.displayName,
      photoUrl: user.photoURL,
    }));
  };
  const getBookList = async () => {
    const response = await getDocs(collection(fireStoreDataBase, "books"));
    return response;
  };

  const downloadCover = async (path) => {
    const response = getDownloadURL(ref(stroage, path));
    return response;
  };

  return (
    <FirebaseContext.Provider
      value={{
        signUpUserWithEmailAndPassword,
        logInwithEmailandPassword,
        loginWithGoogle,
        isLoggedIn,
        handleBookUploadListing,
        getBookList,
        downloadCover,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
