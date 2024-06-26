import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMultipleDocsFromFirestore } from "../../firebase/builds";
import { sortMail } from "../../firebase/utils";

export const fetchStarredMails = createAsyncThunk(
  "starred/fetchStarredMails",
  async (email, { rejectWithValue }) => {
    try {
      const mails = await getMultipleDocsFromFirestore(
        "starred",
        "receiver",
        email
      );
      const starredMailsWithStarred = mails.data.map((mail) => ({
        ...mail,
        isStarred: true,
        createdAt: mail.createdAt.toDate().toUTCString(),
      }));
      return sortMail(starredMailsWithStarred);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const starredSlice = createSlice({
  name: "starred",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStarredMails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStarredMails.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchStarredMails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const starredSelector = (state) => state.starredReducer;
export default starredSlice.reducer;
