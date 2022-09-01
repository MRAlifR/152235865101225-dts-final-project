import {
	createUserWithEmailAndPassword,
	getAuth,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const registerWithEmailAndPassword = async (email, password) => {
	await createUserWithEmailAndPassword(auth, email, password);
};

const loginWithEmailAndPassword = async (email, password) => {
	await signInWithEmailAndPassword(auth, email, password);
};

const resetPassword = async (email) => {
	await sendPasswordResetEmail(auth, email);
};

const logOut = async () => {
	await signOut(auth);
};

export {
	auth,
	registerWithEmailAndPassword,
	loginWithEmailAndPassword,
	resetPassword,
	logOut,
};
