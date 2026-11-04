import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

const RSVP_COLLECTION = "rismaIchsan_rsvp";

// Menambahkan data RSVP / Wish baru ke Firestore
export const addRSVP = async (data) => {
  return await addDoc(collection(db, RSVP_COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

// Mengambil seluruh data RSVP satu kali (opsional)
export const getRSVP = async () => {
  const snapshot = await getDocs(collection(db, RSVP_COLLECTION));
  return snapshot.docs.map((doc) => doc.data());
};

// Mendengarkan perubahan data secara real-time
export const listenRSVP = (callback) => {
  const q = query(
    collection(db, RSVP_COLLECTION),
    orderBy("createdAt", "desc"),
  );

  //   return onSnapshot(q, (snapshot) => {
  //     const data = snapshot.docs.map((doc) => doc.data());
  //     callback(data);
  //   });
  return onSnapshot(
    q,
    (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      callback(data);
    },
    (error) => {
      console.error("Gagal mengambil data RSVP:", error.code, error.message);
    },
  );
};
