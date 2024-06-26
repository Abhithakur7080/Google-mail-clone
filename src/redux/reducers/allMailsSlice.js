import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMultipleDocsFromFirestore } from "../../firebase/builds";
import { sortMail } from "../../firebase/utils";

export const fetchAllMails = createAsyncThunk(
  "allMail/fetchAllMails",
  async (email, { rejectWithValue }) => {
    try {
      const mailsSender = await getMultipleDocsFromFirestore("inbox", "sender", email);
      const mailsReceiver = await getMultipleDocsFromFirestore("inbox", "receiver", email);
      const allMailsResults = [...mailsSender.data, ...mailsReceiver.data];
      const mails = allMailsResults.map((mail) => ({
        ...mail,
        createdAt: mail.createdAt.toDate().toUTCString(),
      }));
      return sortMail(mails);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const allMailSlice = createSlice({
  name: "allMail",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMails.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchAllMails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const allMailSelector = (state) => state.allMailReducer;
export default allMailSlice.reducer;
