import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMultipleDocsFromFirestore } from "../../firebase/builds";
import { sortMail } from "../../firebase/utils";

export const fetchInboxMails = createAsyncThunk(
  "inbox/fetchMails",
  async (email, { rejectWithValue }) => {
    try {
      const inboxMailsResult = await getMultipleDocsFromFirestore(
        "inbox",
        "receiver",
        email
      );
      const starredMailsResult = await getMultipleDocsFromFirestore(
        "starred",
        "receiver",
        email
      );
      const snoozedMailsResult = await getMultipleDocsFromFirestore(
        "snoozed",
        "receiver",
        email
      );

      const inboxMails = inboxMailsResult.data.map(mail => ({
        ...mail,
        createdAt: mail.createdAt.toDate().toUTCString(),
      }))
      const starredMails = starredMailsResult.data.map(mail => ({
        ...mail,
        createdAt: mail.createdAt.toDate().toUTCString(),
      }));
      const snoozedMails = snoozedMailsResult.data.map(mail => ({
        ...mail,
        createdAt: mail.createdAt.toDate().toUTCString(),
        snoozedTime: mail.snoozedTime.toDate().toUTCString(),
      }));

      const inboxMailsWithStarred = inboxMails.map((mail) => ({
        ...mail,
        isStarred: false,
      }));

      const starredMailsWithStarred = starredMails.map((mail) => ({
        ...mail,
        isStarred: true,
      }));

      let allMails = [...starredMailsWithStarred, ...inboxMailsWithStarred];

      const currentTime = new Date();

      const validSnoozedMails = snoozedMails.filter((mail) => {
        const snoozedTime = new Date(mail.snoozedTime);
        return snoozedTime <= currentTime;
      });

      const snoozedMailIds = validSnoozedMails.map((mail) => mail.id);
      allMails = allMails.filter((mail) => !snoozedMailIds.includes(mail.id));

      const uniqueMails = Array.from(
        new Set(allMails.map((mail) => mail.id))
      ).map((id) => {
        return allMails.find((mail) => mail.id === id);
      });

      return sortMail(uniqueMails);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const inboxSlice = createSlice({
  name: "inbox",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInboxMails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInboxMails.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchInboxMails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const inboxSelector = (state) => state.inboxReducer;
export default inboxSlice.reducer;
