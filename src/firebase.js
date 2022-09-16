import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {    getStorage, storage } from "firebase/storage"

const firebaseConfig = {
apiKey: "AIzaSyCEyWS1yR_HNT9c9Ujaxu94mde0cImP2jM",
    authDomain: "audiovisualizer-35bdf.firebaseapp.com",
    projectId: "audiovisualizer-35bdf",
    storageBucket: "audiovisualizer-35bdf.appspot.com",
    messagingSenderId: "360955257040",
    appId: "1:360955257040:web:3f319ab5b523b3ddc27ed5",
    measurementId: "G-MN84MHSXPH"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const Storage = getStorage(app);
