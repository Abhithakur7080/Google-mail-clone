import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMultipleDocsFromFirestore } from "../../firebase/builds";
import { sortMail } from "../../firebase/utils";

export const fetchImportantMails = createAsyncThunk(
  "important/fetchImportantMails",
  async (email, { rejectWithValue }) => {
    try {
      const mails = await getMultipleDocsFromFirestore("important", "receiver", email);
      const importantMails = mails.data.map((mail) => ({
        ...mail,
        isImportant: true,
        createdAt: mail.createdAt.toDate().toUTCString(),
        snoozedTime: mail.snoozedTime ? mail.createdAt.toDate().toUTCString() : ""
      }));
      return sortMail(importantMails);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const importantSlice = createSlice({
  name: "important",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImportantMails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImportantMails.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchImportantMails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const importantSelector = (state) => state.importantReducer;
export default importantSlice.reducer;
