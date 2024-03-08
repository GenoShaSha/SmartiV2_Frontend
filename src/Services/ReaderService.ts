import { FieldValue, Timestamp, addDoc, arrayUnion, collection, deleteDoc, deleteField, doc, getDoc, getDocs, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import database from '../Services/FirebaseService';
import moment from "moment";
import { Reader } from "../Models/Reader";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { ref as dbRef, get as getDB } from "firebase/database";
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
import { useState } from "react";



export const useReadersService = () => {
  const [readerData, setReaderData] = React.useState<Reader[]>([]);

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };
  const app = initializeApp(firebaseConfig);

  React.useEffect(() => {
    
    const fetchData = async () => {
      try {
        console.log(dbRef(getDatabase(app), '/customers/aZdK7hRGJdTS7qxMbIg2/readPoints/65e8603cbf35131fed254777'));
        const snapshot = await getDB(dbRef(getDatabase(app), '/customers/aZdK7hRGJdTS7qxMbIg2/readPoints/65e8603cbf35131fed254777'));
        if (snapshot.exists()) {
          // Data exists, extract it
          const data = snapshot.val();
          setReaderData(data); // Assuming Reader is the correct type
        } else {
          // No data found at the specified path
          console.log("No data available at the specified path");
        }
      } catch (error) {
        // Error fetching data
        console.error("Error getting data:", error);
      }
    };

    fetchData();

    return () => {
      // Perform any clean-up if needed
    };
  }, []);

  return readerData;
};

