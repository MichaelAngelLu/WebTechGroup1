import { ref, set, get, onValue } from "firebase/database";
import { database } from "./initFirebase";

export const writeData = (path, data) => { 
    const dataRef = ref(database, path);
    return set(dataRef, data);
};

export const readData = (path) => {
    const dataRef = ref(database, path);
    return get(dataRef).then((snapshot) => snapshot.val());
  };
  
  export const subscribeToData = (path, callback) => {
    const dataRef = ref(database, path);
    onValue(dataRef, (snapshot) => {
      callback(snapshot.val());
    });
  };