import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as signOutUser,
  User as FirebaseUser,
  FacebookAuthProvider,
  UserCredential,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import store from '../app/redux/store';
import { clearUser, setAuthError, setUser } from '../features/slices/userSlice';
import { setExercises } from '../features/slices/exercisesSlice';

import { Exercise, User } from './type';

type signInUser = {
  email: string;
  password: string;
};

type NewUser = User & {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  displayName: string;
  uid: string;
};

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
const providergithub = new GithubAuthProvider();
const providerFacebook = new FacebookAuthProvider();

const buildUserStoreObject = (result: UserCredential) => {
  return {
    email: result.user?.email ?? '',
    uid: result.user.uid,
    displayName: result.user?.displayName ?? '',
    photoURL: result.user?.photoURL ?? '',
  };
};

const writeUserInfoToStore = (token: string, plainUser: string) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', plainUser);
};

const onSigninResult =
  (authProviderName: 'google' | 'facebook' | 'github') =>
  async (result: UserCredential): Promise<void> => {
    if (!result) return;
    const plainUserEntries = Object.entries(result.user).filter(([, value]) => typeof value !== 'object');
    const plainUser = Object.fromEntries(plainUserEntries);
    writeUserInfoToStore(await result.user.getIdToken(), JSON.stringify({ ...plainUser, authProviderName }));
    store.dispatch(setUser(buildUserStoreObject(result)));
  };
export const signInWithGoogle = () => {
  signInWithPopup(auth, googleAuthProvider)
    .then(onSigninResult('google'))
    .catch(error => {
      console.log(error);
    });
};
export const signInWithGithub = () => {
  signInWithPopup(auth, providergithub)
    .then(onSigninResult('github'))
    .catch(error => {
      console.log(error);
    });
};

export const signInWithFacebook = () => {
  signInWithPopup(auth, providerFacebook)
    .then(onSigninResult('facebook'))
    .catch(error => {
      console.log(error);
    });
};
const dispatchError = (err: any) => {
  return store.dispatch(setAuthError(err));
};

const updateUser = async (user: FirebaseUser) => {
  if (user) {
    const docRef = doc(db, 'users', user.email as string);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && user.email) {
      const userObj = {
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      return store.dispatch(setUser(userObj));
    }
  }

  dispatchError('User data not found!');
};

const signUp = async ({ firstName, lastName, email, password, isAdmin = false, displayName = 'sisay' }: NewUser) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser as any, { displayName }).catch(err => console.log(err));
    await setDoc(doc(db, 'users', email), {
      firstName,
      lastName,
      email,
      isAdmin,
    });
  } catch ({ message }) {
    dispatchError(message);
  }
};

const signIn = async ({ email, password }: signInUser) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch ({ message }) {
    dispatchError(message);
  }
};

const signOut = async () => {
  try {
    await signOutUser(auth);
    localStorage.removeItem('token');
    store.dispatch(clearUser());
  } catch ({ message }) {
    dispatchError(message);
  }
};

onAuthStateChanged(auth, async user => {
  if (user) {
    await updateUser(user);
    if (user.email) {
      const userObj = {
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      store.dispatch(setUser(userObj));
    }
  }
});

export const exerciseStore = () => {
  const fetch = (user_id: string = store.getState().user.user?.uid ?? 'no_user_id_providedd') => {
    const allExercises = collection(db, 'exercises');
    const userExercises = query(allExercises, where('userId', '==', user_id));

    return getDocs(userExercises).then(({ docs }) => {
      const exercises = docs.map(doc => ({ ...doc.data(), id: doc.id }));
      return store.dispatch(setExercises(exercises));
    });
  };
  const createOrUpdate = ({ id = '', ...exercise }: Exercise) => {
    if (!id?.length) {
      console.log({ createOrUpdate: true, exercise });
      return addDoc(collection(db, 'exercises'), exercise).then(() => fetch());
    }
    const exerciseDoc = doc(db, 'exercises', id);
    updateDoc(exerciseDoc, exercise).then(() => fetch());
  };

  const remove = ({ id = '' }: Exercise) => {
    deleteDoc(doc(db, 'exercises', `/${id}`)).then(() => {
      fetch();
    });
  };

  return { fetch, createOrUpdate, remove };
};

export { db, auth, signUp, signIn, signOut };
