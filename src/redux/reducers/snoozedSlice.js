import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMultipleDocsFromFirestore } from "../../firebase/builds";
import { sortMail } from "../../firebase/utils";

export const fetchSnoozedMails = createAsyncThunk(
  "snoozed/fetchSnoozedMails",
  async (email, { rejectWithValue }) => {
    try {
      const mailsResult = await getMultipleDocsFromFirestore(
        "snoozed",
        "receiver",
        email
      );

      const mails = mailsResult.data.map((mail) => ({
        ...mail,
        createdAt: mail.createdAt.toDate().toUTCString(),
        snoozedTime: mail.snoozedTime.toDate().toUTCString(),
        isSnoozed: true,
      }));
      return sortMail(mails);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const snoozedSlice = createSlice({
  name: "snoozed",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSnoozedMails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSnoozedMails.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchSnoozedMails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const snoozedSelector = (state) => state.snoozedReducer;
export default snoozedSlice.reducer;
