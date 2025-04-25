import { createSlice } from "@reduxjs/toolkit";
import { createNote, fetchAllNotes } from "./notesThunks";

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

            // CREATE NOTE
            .addCase(createNote.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.loading = false;
                state.notes.push(action.payload.note);
                state.successMessage = action.payload.message;
            })
            .addCase(createNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

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

            // MARK NOTE IMPORTANT
            .addCase(markNoteImportant.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(markNoteImportant.fulfilled, (state, action) => {
                state.loading = false;
                const noteIndex = state.notes.findIndex(note => note.id === action.payload.note.id);
                if (noteIndex !== -1) {
                    state.notes[noteIndex] = action.payload.note;
                }
                state.successMessage = action.payload.message;
            })
            .addCase(markNoteImportant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }

})

// export reducers functions
export const { clearMessages } = notesSlice.actions;

// export notesSlice reducer
export default notesSlice.reducer;