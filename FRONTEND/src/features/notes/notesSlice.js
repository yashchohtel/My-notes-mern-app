import { createSlice } from "@reduxjs/toolkit";
import { fetchAllNotes } from "./notesThunks";

// initial state
const initialState = {
    notes: [],
    loading: false,
    error: null,
    successMessage: null
};


// creating the slice for notes
const notesSlice = createSlice({

    name: "notes",

    initialState,

    // reducers to handle sync actions
    reducers: {

        // reducer to clear error and succes message
        clearMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },

    },

    // extra reducres to handle async actions
    extraReducers: (builder) => {
        builder

            // FETCH NOTES
            .addCase(fetchAllNotes.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(fetchAllNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = action.payload.notes;
                state.successMessage = action.payload.message;
                console.log(action.payload);
            })
            .addCase(fetchAllNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }

})

// export reducers functions
export const { clearMessages } = notesSlice.actions;

// export notesSlice reducer
export default notesSlice.reducer;