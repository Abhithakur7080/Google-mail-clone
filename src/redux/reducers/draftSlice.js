import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMultipleDocsFromFirestore } from "../../firebase/builds";
import { sortMail } from "../../firebase/utils";

export const fetchDraftMails = createAsyncThunk(
  "draft/fetchDraftMails",
  async (email, { rejectWithValue }) => {
    try {
      const mailsResult = await getMultipleDocsFromFirestore("draft", "sender", email);
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

const draftSlice = createSlice({
  name: "draft",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDraftMails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDraftMails.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchDraftMails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const draftSelector = (state) => state.draftReducer;
export default draftSlice.reducer;
