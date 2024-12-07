import {
  onValue,
  push,
  ref,
  remove,
  set,
  update,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../configs/firebase";
import { getAuth } from "firebase/auth";

/**
 * Hook for Firebase Realtime Database operations scoped to the current user.
 * @param {string} path - Path to the node in the database.
 * @returns {object} - API object with methods for database operations.
 */
export const useRealtimeDB = (path) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = getAuth()?.currentUser?.uid;

  if (!userId) {
    setError("User not authenticated");
    return {
      data,
      loading,
      error,
      createData: () => {},
      updateData: () => {},
      deleteData: () => {},
      readData: () => {},
    };
  }

  const dbRef = ref(db, path);

  // Read data for the authenticated user
  const readData = () => {
    setLoading(true);
    setError(null);

    const userQuery = query(dbRef, orderByChild("userId"), equalTo(userId));

    onValue(
      userQuery,
      (snapshot) => {
        const value = snapshot.val();
        setData(value);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  };

  // Create data scoped to the current user
  const createData = async (newItem) => {
    try {
      setLoading(true);
      setError(null);

      const newRef = push(dbRef);
      await set(newRef, { ...newItem, userId });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update user-specific data
  const updateData = async (key, updatedItem) => {
    try {
      setLoading(true);
      setError(null);

      const itemRef = ref(db, `${path}/${key}`);
      await update(itemRef, updatedItem);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete user-specific data
  const deleteData = async (key) => {
    try {
      setLoading(true);
      setError(null);

      const itemRef = ref(db, `${path}/${key}`);
      await remove(itemRef);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) readData();
    return () => setData(null);
  }, [path, userId]);

  return { data, loading, error, createData, updateData, deleteData, readData };
};
