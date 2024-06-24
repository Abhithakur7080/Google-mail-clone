import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    open: false,
    full: false,
    minimize: false,
    menuOpen: false,
  },
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
      if (state.open === false) {
        state.full = false;
        state.minimize = false;
      }
    },
    setFull: (state, action) => {
      state.full = !state.full;
    },
    setMinimize: (state, action) => {
      state.minimize = !state.minimize;
    },
    setMenuOpen: (state, action) => {
      if (action.payload) {
        state.menuOpen = action.payload;
      } else {
        state.menuOpen = !state.menuOpen;
      }
    },
  },
});
export const { setOpen, setFull, setMinimize, setMenuOpen } = appSlice.actions;
export const appSelector = (state) => state.appReducer;
export default appSlice.reducer;
