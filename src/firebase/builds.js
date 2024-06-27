import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
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
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.log(error);
  }
};
export const getADataFromFirestoreRef = async (collectionName, reference) => {
  const docRef = doc(db, collectionName, reference);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};
export const getADataFromFirestoreRealtimeRef = (
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
export const getMultipleDocsFromFirestore = async (
  collectionName,
  key,
  value
) => {
  try {
    const q = query(collection(db, collectionName), where(key, "==", value));
    const snapshot = await getDocs(q);
    const allDatas = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return { data: allDatas };
  } catch (error) {
    console.error("Error fetching documents: ", error);
    return { data: [] };
  }
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
export const deleteDataFromFirestore = async (collectionName, reference) => {
  await deleteDoc(doc(db, collectionName, reference));
};
