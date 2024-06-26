import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMultipleDocsFromFirestore } from "../../firebase/builds";
import { sortMail } from "../../firebase/utils";

export const fetchTrashMails = createAsyncThunk(
  "trash/fetchTrashMails",
  async (email, { rejectWithValue }) => {
    try {
      const mailsReceiver = await getMultipleDocsFromFirestore(
        "trash",
        "receiver",
        email
      );
      const mailsSender = await getMultipleDocsFromFirestore(
        "trash",
        "sender",
        email
      );
      const allMails = [...mailsReceiver.data, ...mailsSender.data]
      const mails = allMails.map((mail) => ({
        ...mail,
        createdAt: mail.createdAt.toDate().toUTCString(),
      }));
      return sortMail(mails);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const trashSlice = createSlice({
  name: "trash",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrashMails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrashMails.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchTrashMails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const trashSelector = (state) => state.trashReducer;
export default trashSlice.reducer;
