import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/appSlice";
import inboxReducer from "./reducers/inboxSlice";
import starredReducer from "./reducers/starredSlice";
import snoozedReducer from "./reducers/snoozedSlice";
import sentReducer from "./reducers/sentSlice";
import draftReducer from "./reducers/draftSlice";
import importantReducer from "./reducers/importantSlice";
import allMailReducer from "./reducers/allMailsSlice";
import archiveReducer from "./reducers/archiveSlice";
import spamReducer from "./reducers/spamSlice";
import trashReducer from "./reducers/trashSlice";

const store = configureStore({
  reducer: {
    appReducer,
    inboxReducer,
    starredReducer,
    snoozedReducer,
    sentReducer,
    draftReducer,
    importantReducer,
    allMailReducer,
    archiveReducer,
    spamReducer,
    trashReducer,
  },
});
export default store;
