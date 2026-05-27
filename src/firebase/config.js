import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";

const firebaseConfig = {

  apiKey: "AIzaSyBPXlp97RcR8jckwf68NI1HxfQw5kEpbHM",

  authDomain:
    "projetofrequencia-3b4d0.firebaseapp.com",

  databaseURL:
    "https://projetofrequencia-3b4d0-default-rtdb.firebaseio.com",

  projectId: "projetofrequencia-3b4d0",

  storageBucket:
    "projetofrequencia-3b4d0.firebasestorage.app",

  messagingSenderId: "121399718116",

  appId:
    "1:121399718116:web:6520195120db743a1ebcf1"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);