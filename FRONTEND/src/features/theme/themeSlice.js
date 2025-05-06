import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    // Retrieve from localStorage and parse it as boolean
    noteViewType: localStorage.getItem("noteViewType") === "true" ? true : false,

    // theme type light and dark
    themeType: localStorage.getItem("themeType") || "dark",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {

        changeNoteViewType: (state, action) => {
            state.noteViewType = action.payload;
            // Save the updated noteViewType in localStorage
            localStorage.setItem("noteViewType", action.payload);
        },

        toggleAppTheme: (state, action) => {
            state.themeType = action.payload;
            // save the updated themeType in localStorage
            localStorage.setItem("themeType", action.payload)
        }

    },
});

export const { changeNoteViewType, toggleAppTheme } = themeSlice.actions;
export default themeSlice.reducer;
