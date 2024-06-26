import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMultipleDocsFromFirestore } from "../../firebase/builds";
import { sortMail } from "../../firebase/utils";

export const fetchSpamMails = createAsyncThunk(
  "spam/fetchSpamMails",
  async (email, { rejectWithValue }) => {
    try {
      const mailsResult = await getMultipleDocsFromFirestore(
        "spam",
        "receiver",
        email
      );
      const mails = mailsResult.data.map((mail) => ({
        ...mail,
        createdAt: mail.createdAt.toDate().toUTCString(),
        isSpam: true,
      }));
      return sortMail(mails);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const spamSlice = createSlice({
  name: "spam",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpamMails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpamMails.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchSpamMails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const spamSelector = (state) => state.spamReducer;
export default spamSlice.reducer;
