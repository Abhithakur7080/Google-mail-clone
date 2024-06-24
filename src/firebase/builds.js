import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { auth, db } from "./firebase";

export const addDataToFirebase = async (collectionName, data) => {
  try {
    await addDoc(collection(db, collectionName), data);
  } catch (error) {
    console.log(error);
  }
};
export const setDataToFirestoreRef = async (
  collectionName,
  reference,
  data
) => {
  try {
    await setDoc(doc(db, collectionName, reference), data);
  } catch (error) {
    console.log(error);
  }
};
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  await signOut(auth);
  setCurrentUser(null);
};
//google login
export const signInWithGoogle = async () => {
  try {
    const googleProvider = new GoogleAuthProvider();
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.log(error);
  }
};
export const getADataFromFirestoreRef = (
  collectionName,
  reference,
  onDataReceived
) => {
  const unsubscribe = onSnapshot(
    doc(db, collectionName, reference),
    (docSnap) => {
      const data = docSnap.exists()
        ? { id: docSnap.id, ...docSnap.data() }
        : null;
      onDataReceived(data);
    }
  );
  return unsubscribe;
};
export const getAllDocsFromFirestore = (collectionName, onDataReceived) => {
  const unsubscribe = onSnapshot(collection(db, collectionName), (snapshot) => {
    const allDatas = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    onDataReceived(allDatas);
  });
  return unsubscribe;
};
export const getMultipleDocsFromFirestore = (collectionName, key, value) => {
  let data = [];
  const unsubscribe = onSnapshot(
    query(collection(db, collectionName), orderBy(key, value)),
    (snapshot) => {
      const allDatas = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      data = allDatas ? allDatas : [];
    }
  );
  return { data, unsubscribe };
};
export const updateDataFromFirestore = async (
  collectionName,
  reference,
  data
) => {
  try {
    await updateDoc(doc(db, collectionName, reference), data);
  } catch (error) {
    console.log(error);
  }
};
export const deleteDataFromFirestore = async(collectionName, reference) => {
    await deleteDoc(doc(db, collectionName, reference));
}
