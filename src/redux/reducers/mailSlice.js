import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDataToFirebase,
  deleteDataFromFirestore,
  getADataFromFirestoreRef,
  setDataToFirestoreRef,
} from "../../firebase/builds";
import { isSpam } from "../../firebase/utils";

export const newMail = createAsyncThunk(
  "newMail",
  async (data, { rejectWithValue }) => {
    try {
      const isSpamMail = isSpam(data);
      if (isSpamMail) {
        await addDataToFirebase("spam", data);
      } else {
        await addDataToFirebase("inbox", data);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const markAsReadUnread = createAsyncThunk(
  "markAsReadUnread",
  async (data, { rejectWithValue }) => {
    try {
      if (data.mail.read) {
        await setDataToFirestoreRef("inbox", data.id, {
          ...data.mail,
          read: false
        });
      } else {
        await setDataToFirestoreRef("inbox", data.id, {
          ...data.mail,
          read: true
        });
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const draftMail = createAsyncThunk(
  "newMail",
  async (data, { rejectWithValue }) => {
    try {
      await addDataToFirebase("draft", data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const markAsStarred = createAsyncThunk(
  "markAsStarred",
  async (id, { rejectWithValue }) => {
    try {
      const starredData = await getADataFromFirestoreRef("starred", id);
      if (starredData) {
        await deleteDataFromFirestore("starred", id);
      } else {
        const inboxedData = await getADataFromFirestoreRef("inbox", id);
        await setDataToFirestoreRef("starred", id, inboxedData);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const markAsImportant = createAsyncThunk(
  "markAsImportant",
  async (data, { rejectWithValue }) => {
    try {
      const importantData = await getADataFromFirestoreRef(
        "important",
        data.id
      );
      if (importantData) {
        await deleteDataFromFirestore("important", data.id);
      } else {
        await setDataToFirestoreRef("important", data.id, data.mail);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const addToArchive = createAsyncThunk(
  "addToArchive",
  async (id, { rejectWithValue }) => {
    try {
      const archivedData = await getADataFromFirestoreRef("archive", id);
      if (archivedData) {
        await deleteDataFromFirestore("archive", id);
        await setDataToFirestoreRef("inbox", id, archivedData);
      } else {
        const inboxedData = await getADataFromFirestoreRef("inbox", id);
        await deleteDataFromFirestore("inbox", id);
        await deleteDataFromFirestore("starred", id);
        await deleteDataFromFirestore("snoozed", id);
        await deleteDataFromFirestore("important", id);
        await setDataToFirestoreRef("archive", id, inboxedData);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const trashRestore = createAsyncThunk(
  'trashRestore',
  async (data, { rejectWithValue }) => {
    try {
      const trashedData = await getADataFromFirestoreRef('trash', data.id);
      
      if (trashedData) {
        // Check if 'trashBy' exists and isn't the same as the current user
        if (trashedData.trashBy && trashedData.trashBy !== data.email) {
          await deleteDataFromFirestore('trash', data.id);
          delete trashedData.trashBy;
          await setDataToFirestoreRef('inbox', data.id, { ...trashedData });
        } else {
          delete trashedData.data.trashBy;
          await setDataToFirestoreRef('inbox', data.id, { ...trashedData });
        }
      } else {
        const inboxData = await getADataFromFirestoreRef('inbox', data.id);
        if (inboxData) {
          await setDataToFirestoreRef('trash', data.id, {
            ...inboxData,
            trashBy: data.email,
          });
          await deleteDataFromFirestore('inbox', data.id);
          await deleteDataFromFirestore('important', data.id);
          await deleteDataFromFirestore('draft', data.id);
          await deleteDataFromFirestore('snoozed', data.id);
          await deleteDataFromFirestore('starred', data.id);
          await deleteDataFromFirestore('spam', data.id);
          await deleteDataFromFirestore('archive', data.id);
        } else {
          throw new Error(`No data found for id: ${data.id}`);
        }
      }
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);
export const addToSnoozed = createAsyncThunk(
  "addToSnoozed",
  async (data, { rejectWithValue }) => {
    try {
      await setDataToFirestoreRef("snoozed", data.id, data.mail);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const toggleSpam = createAsyncThunk(
  "toggleUnspam",
  async (data, { rejectWithValue }) => {
    try {
      if (data.isSpam) {
        const mail = await getADataFromFirestoreRef("spam", data.id);
        await deleteDataFromFirestore("spam", data.id);
        await setDataToFirestoreRef("inbox", data.id, mail);
      } else {
        const inboxMail = await getADataFromFirestoreRef("inbox", data.id);
        await deleteDataFromFirestore("inbox", data.id);
        await deleteDataFromFirestore("starred", data.id);
        await deleteDataFromFirestore("snoozed", data.id);
        await deleteDataFromFirestore("important", data.id);
        await setDataToFirestoreRef("spam", data.id, inboxMail);
      }
    } catch (error) {
      console.error("Error in Toggle Spam:", error);
      return rejectWithValue(error);
    }
  }
);
