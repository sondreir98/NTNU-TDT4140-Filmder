import { initializeApp } from "firebase/app";
import {
	browserLocalPersistence,
	getAuth,
	setPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

const firebaseConfig = {
	apiKey: "AIzaSyBmUPtiAg7RlzdQiwC9rnDUDzuxWrq4QUo",

	authDomain: "filmder-1e55e.firebaseapp.com",

	projectId: "filmder-1e55e",

	storageBucket: "filmder-1e55e.firebasestorage.app",

	messagingSenderId: "224658403710",

	appId: "1:224658403710:web:9e1c657038ceb8622ec32f",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

await setPersistence(auth, browserLocalPersistence);
