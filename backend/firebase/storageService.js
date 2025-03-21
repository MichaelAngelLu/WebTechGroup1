import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./initFirebase";

export const uploadFile = async (path, file) => {
  const fileRef = ref(storage, path);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
};

export const getFileURL = async (path) => {
  const fileRef = ref(storage, path);
  return getDownloadURL(fileRef);
};