import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { fireStore } from "../configs/firebase";
import { getAuth } from "firebase/auth";

/**
 * Hook for Firestore CRUD operations scoped to the current user.
 * @param {string} collectionPath - Path to the Firestore collection.
 */
export const useFirestore = (collectionPath) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = getAuth()?.currentUser?.uid;

  useEffect(() => {
    if (!userId) {
      setData([]);
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    setError(null);

    const collectionRef = collection(fireStore, collectionPath);
    const q = query(collectionRef, where("userId", "==", userId));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const documents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(documents);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionPath, userId]);

  const createData = async (newItem) => {
    if (!userId) {
      setError("User not authenticated");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(fireStore, collectionPath), {
        ...newItem,
        userId,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (id, updatedFields) => {
    try {
      setLoading(true);
      const docRef = doc(fireStore, collectionPath, id);
      await updateDoc(docRef, updatedFields);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id) => {
    try {
      setLoading(true);
      const docRef = doc(fireStore, collectionPath, id);
      await deleteDoc(docRef);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, createData, updateData, deleteData };
};
