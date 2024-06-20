import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "appSlice",
    initialState: {
        open: false,
        full: false,
        minimize: false,
    },
    reducers: {
        setOpen: (state, action) => {
            state.open =action.payload
        },
        setFull: (state, action) => {
            state.full = !state.full
        },
        setMinimize: (state, action) => {
            state.minimize = !state.minimize
        }
    }
})
export const { setOpen, setFull, setMinimize } = appSlice.actions;
export const appSelector = (state) => state.appReducer
export default appSlice.reducer