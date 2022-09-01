import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  updateProfile,
  NextOrObserver,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
  collection,
  query,
  getDocs,
} from "firebase/firestore";
import { blogType } from "../../Components/Blog/blog";
import { UserType } from "../../Context/userContext";

const firebaseConfig = {
  apiKey: "AIzaSyAyA6oFDi1rqvhFYhNy1PbLLD4QW8Wf3Xs",
  authDomain: "blog-app-90794.firebaseapp.com",
  projectId: "blog-app-90794",
  storageBucket: "blog-app-90794.appspot.com",
  messagingSenderId: "979226588983",
  appId: "1:979226588983:web:6d1e0778e93992e2e74cb2",
};

type errorType = {
  code: string;
  message: string;
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
      return "error occurred";
  }
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
  name: string
) => {
  if (!email || !password) return;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: name,
      });
    }
    return auth.currentUser;
  } catch (error) {
    const code = (error as errorType).code;
    throw generateErrorMessage(code);
  }
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error: unknown) {
      throw (error as errorType).message;
    }
  }
};

export const getBlogs = async () => {
  const collectionRef = collection(db, "blogs");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const blogs: blogType[] = [];
  querySnapshot.docs.map((docSnapshot) => {
    const { title, content, date, userId, author, id } = docSnapshot.data();
    blogs.push({
      title,
      content,
      date: date.toDate(),
      author,
      userId,
      id,
    });
    return blogs;
  }, {});

  return blogs;
};

export const createBlog = async (
  user: UserType,
  content: string,
  title: string,
  additionalInformation = {}
) => {
  const id = "id" + new Date().getTime();
  const userDocRef = doc(db, "blogs", id);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email, uid } = user;
    const date = new Date();

    try {
      await setDoc(userDocRef, {
        author: email.split("@")[0],
        date,
        title,
        content,
        userId: uid,
        id,
        ...additionalInformation,
      });
    } catch (error: unknown) {
      throw (error as errorType).message;
    }
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
    throw generateErrorMessage(code);
  }
};

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const signOutUser = async () => await signOut(auth);
