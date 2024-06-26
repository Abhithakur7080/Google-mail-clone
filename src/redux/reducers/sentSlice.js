import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMultipleDocsFromFirestore } from "../../firebase/builds";
import { sortMail } from "../../firebase/utils";

export const fetchSentMails = createAsyncThunk(
  "sent/fetchSentMails",
  async (email, { rejectWithValue }) => {
    try {
      const mailsResult = await getMultipleDocsFromFirestore(
        "inbox",
        "sender",
        email
      );
      const mails = mailsResult.data.map((mail) => ({
        ...mail,
        createdAt: mail.createdAt.toDate().toUTCString(),
      }));
      return sortMail(mails);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const sentSlice = createSlice({
  name: "sent",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSentMails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSentMails.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchSentMails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const sentSelector = (state) => state.sentReducer;
export default sentSlice.reducer;
