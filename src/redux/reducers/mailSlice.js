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
export const markAsStarred = createAsyncThunk(
  "newMail",
  async (data, { rejectWithValue }) => {
    try {
      const mailData = null
      getADataFromFirestoreRef("starred", data.id, (d) => {
        mailData = d
      })
      if(d){
        await deleteDataFromFirestore("starred", data.id)
      } else {
        await setDataToFirestoreRef("starred", data.id, data.mail);
      }
      
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
