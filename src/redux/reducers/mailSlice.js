import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDataToFirebase,
  deleteDataFromFirestore,
  getADataFromFirestoreRef,
  setDataToFirestoreRef,
} from "../../firebase/builds";

export const newMail = createAsyncThunk(
  "newMail",
  async (data, { rejectWithValue }) => {
    try {
      await addDataToFirebase("inbox", data)
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const draftMail = createAsyncThunk(
  "newMail",
  async (data, { rejectWithValue }) => {
    try {
      await addDataToFirebase("draft", data)
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const markAsStarred = createAsyncThunk(
  "markAsStarred",
  async (data, { rejectWithValue }) => {
    try {
      const starredData = await getADataFromFirestoreRef("starred", data.id)
      if(starredData){
        await deleteDataFromFirestore("starred", data.id)
      } else {
        await setDataToFirestoreRef("starred", data.id, data.mail);
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
      const starredData = await getADataFromFirestoreRef("important", data.id)
      if(starredData){
        await deleteDataFromFirestore("important", data.id)
      } else {
        await setDataToFirestoreRef("important", data.id, data.mail);
      }
      
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addToSnoozed = createAsyncThunk(
  "addToSnoozed",
  async (data, { rejectWithValue }) => {
    try {
      await setDataToFirestoreRef("snoozed", data.id, data.mail)
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
