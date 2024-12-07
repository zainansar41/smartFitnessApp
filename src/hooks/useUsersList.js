import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../configs/firebase";

/**
 * Hook to fetch the list of all users on the platform.
 * @returns {object} - Contains users data, loading state, and error.
 */
export const useUsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const usersRef = ref(db, "users");

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onValue(
      usersRef,
      (snapshot) => {
        const data = snapshot.val();
        const userList = data
          ? Object.entries(data).map(([key, value]) => ({
              id: key,
              ...value,
            }))
          : [];
        setUsers(userList);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { users, loading, error };
};
