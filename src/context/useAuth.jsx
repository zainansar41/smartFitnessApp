import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import { auth, googleConfig } from "../configs/firebase";
import { ref, set } from "firebase/database"; // Import these from the Firebase Realtime Database
import { db } from "../configs/firebase";

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId: googleConfig.androidClientId,
  });

  useEffect(() => {
    setLoading(true);
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch((e) => {
        setError(e.message);
        ToastAndroid.show("Authentication failed.", ToastAndroid.SHORT);
      });
    } else if (response?.type === "dismiss" || response?.type === "error") {
      setLoading(false);
      const errorMessage =
        response?.type === "error" ? "An error occurred" : null;
      setError(errorMessage);
      if (errorMessage) {
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      }
    }
  }, [response]);

  const getLocalUser = async () => {
    try {
      setLoading(true);
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON) : null;
      setUserInfo(userData);
    } catch (e) {
      setError("Error getting local user");
      console.error(e, "Error getting local user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocalUser();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        setUserInfo(user);
      } else {
        setUserInfo(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const loginWithGoogle = () => {
    setLoading(true);
    setError(null);
    promptAsync();
  };

  const loginWithEmail = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      if (!email || !password) {
        setError("Please enter both email and password.");
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (e) {
      const errorMessage = mapFirebaseError(e.code || e.message);
      setError(errorMessage);
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const mapFirebaseError = (errorCode) => {
    const errorMap = {
      "auth/invalid-email": "The email address is badly formatted.",
      "auth/user-disabled": "This user has been disabled.",
      "auth/user-not-found": "No user found with this email.",
      "auth/wrong-password": "Incorrect password. Please try again.",
      "auth/invalid-credential": "Invalid credentials provided.",
      default: "An unexpected error occurred. Please try again later.",
    };

    return errorMap[errorCode] || errorMap.default;
  };

  const registerWithEmail = async (email, password, displayName) => {
    try {
      setLoading(true);
      setError(null);
  
      // Register the user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Add user information to AsyncStorage
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: displayName || "Anonymous", // Provide a default name
      };
      await AsyncStorage.setItem("@user", JSON.stringify(userData));
      setUserInfo(userData);
  
      // Add user entry to Firebase Realtime Database
      const userRef = ref(db, `users/${user.uid}`); // Use the user's unique ID as the key
      await set(userRef, userData);
  
      ToastAndroid.show("Registration successful", ToastAndroid.SHORT);
    } catch (e) {
      setError(e.message || "Registration failed.");
      ToastAndroid.show("Registration failed.", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };
  

  const resetPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      await sendPasswordResetEmail(auth, email);
      ToastAndroid.show("Password reset email sent.", ToastAndroid.SHORT);
    } catch (e) {
      setError(e.message);
      ToastAndroid.show("Failed to send reset email.", ToastAndroid.SHORT);
      console.error(e, "Error sending password reset email");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await AsyncStorage.removeItem("@user");
      await auth.signOut();
      setUserInfo(null);
    } catch (e) {
      setError(e.message);
      console.error(e, "Error logging out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userInfo,
        loading,
        error,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        resetPassword,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
