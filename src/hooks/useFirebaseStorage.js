import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { storage } from "../configs/firebase";

export const useFirebaseStorage = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = async (file, path) => {
    return new Promise((resolve, reject) => {
      setIsUploading(true);
      setError(null);
      setUploadProgress(0);

      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (err) => {
          setError(err.message);
          setIsUploading(false);
          reject(err);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setIsUploading(false);
            resolve(downloadURL);
          } catch (err) {
            setError(err.message);
            setIsUploading(false);
            reject(err);
          }
        }
      );
    });
  };

  const downloadFile = async (path) => {
    try {
      setIsDownloading(true);
      setError(null);
      const storageRef = ref(storage, path);
      const downloadURL = await getDownloadURL(storageRef);
      setIsDownloading(false);
      return downloadURL;
    } catch (err) {
      setError(err.message);
      setIsDownloading(false);
      throw err;
    }
  };

  const deleteFile = async (path) => {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    uploadFile,
    downloadFile,
    deleteFile,
    uploadProgress,
    isUploading,
    isDownloading,
    error,
  };
};
