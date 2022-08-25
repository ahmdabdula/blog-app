import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
  User,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAyA6oFDi1rqvhFYhNy1PbLLD4QW8Wf3Xs",
  authDomain: "blog-app-90794.firebaseapp.com",
  projectId: "blog-app-90794",
  storageBucket: "blog-app-90794.appspot.com",
  messagingSenderId: "979226588983",
  appId: "1:979226588983:web:6d1e0778e93992e2e74cb2",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore();

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  displayName: string;
  email: string;
};

const generateErrorMessage = (code: string) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "user with this email already exists";
    case "auth/wrong-password":
      return "password is incorrect";
    case "auth/user-not-found":
      return "user with this email does not exist";
    default:
      return "error occurred account creation failed";
  }
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const code = (error as { code: string }).code;
    throw generateErrorMessage(code);
  }
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const code = (error as { code: string }).code;
    console.log(code);
    throw generateErrorMessage(code);
  }
};
