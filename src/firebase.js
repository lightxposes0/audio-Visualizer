import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {    getStorage, storage } from "firebase/storage"
const config = require("./config")

const firebaseConfig = {
apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
    measurementId: config.measurementId
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const Storage = getStorage(app);



