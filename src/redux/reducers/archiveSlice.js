import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMultipleDocsFromFirestore } from "../../firebase/builds";
import { sortMail } from "../../firebase/utils";

export const fetchArchiveMails = createAsyncThunk(
  "archive/fetchArchiveMails",
  async (email, { rejectWithValue }) => {
    try {
      const mailsResult = await getMultipleDocsFromFirestore(
        "archive",
        "receiver",
        email
      );
      const mails = mailsResult.data.map((mail) => ({
        ...mail,
        createdAt: mail.createdAt.toDate().toUTCString(),
        isArchived: true,
      }));
      return sortMail(mails);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const archiveSlice = createSlice({
  name: "archive",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArchiveMails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArchiveMails.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchArchiveMails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const archiveSelector = (state) => state.archiveReducer;
export default archiveSlice.reducer;
