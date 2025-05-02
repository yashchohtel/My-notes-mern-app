import { createSlice } from "@reduxjs/toolkit";
import { createNote, deleteAllNotesPermanently, deleteNotePermanently, fetchAllDeletedNotes, fetchAllNotes, markNoteImportant, restoreAllSoftDeletedNotes, restoreSoftDeletedNote, softDeleteAllImportantNotes, softDeleteAllNotes, softDeleteNote, updateNote } from "./notesThunks";
import { act } from "react";

// initial state
const initialState = {
    notes: [],
    deletedNotes: [],
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
                state.notes.unshift(action.payload.note);
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
            })
            .addCase(fetchAllNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                if (action.payload.message === "No notes found.") {
                    state.notes = []
                }
            })

            // MARK NOTE IMPORTANT
            .addCase(markNoteImportant.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(markNoteImportant.fulfilled, (state, action) => {
                state.loading = false;
                const noteIndex = state.notes.findIndex(note => note._id === action.payload.note._id);
                if (noteIndex !== -1) {
                    state.notes[noteIndex] = action.payload.note;
                }
                state.successMessage = action.payload.message;
            })
            .addCase(markNoteImportant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // UPDATE NOTE
            .addCase(updateNote.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                state.loading = false;
                const noteIndex = state.notes.findIndex(note => note._id === action.payload.note._id);
                if (noteIndex !== -1) {
                    state.notes[noteIndex] = action.payload.note;
                }
                state.successMessage = action.payload.message;
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // SOFT DELETE NOTE
            .addCase(softDeleteNote.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(softDeleteNote.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = state.notes.filter(note => note._id !== action.payload.note._id);
                state.successMessage = action.payload.message;
            })
            .addCase(softDeleteNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // SOFT DELETE ALL NOTES
            .addCase(softDeleteAllNotes.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(softDeleteAllNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = [];
                state.successMessage = action.payload.message;
            })
            .addCase(softDeleteAllNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // SOFT DELETE ALL IMPORTANT NOTES
            .addCase(softDeleteAllImportantNotes.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(softDeleteAllImportantNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = state.notes.filter(note => !note.isImportant);
                state.successMessage = action.payload.message;
            })
            .addCase(softDeleteAllImportantNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // FETCH ALL DELETED NOTES
            .addCase(fetchAllDeletedNotes.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(fetchAllDeletedNotes.fulfilled, (state, action) => {                
                state.loading = false;
                state.deletedNotes = action.payload.notes;
                state.successMessage = action.payload.message;
            })
            .addCase(fetchAllDeletedNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // RESTORE ALL SOFT DELETED NOTES
            .addCase(restoreAllSoftDeletedNotes.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(restoreAllSoftDeletedNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.deletedNotes = [];
                state.successMessage = action.payload.message;
            })
            .addCase(restoreAllSoftDeletedNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // DELETE ALL NOTES PERMANENTLY
            .addCase(deleteAllNotesPermanently.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(deleteAllNotesPermanently.fulfilled, (state, action) => {
                state.loading = false;
                state.deletedNotes = [];
                state.successMessage = action.payload.message;
            })
            .addCase(deleteAllNotesPermanently.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // DELETE NOTE PERMANENTLY
            .addCase(deleteNotePermanently.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(deleteNotePermanently.fulfilled, (state, action) => {
                state.loading = false;
                state.deletedNotes = state.deletedNotes.filter(note => note._id !== action.payload.note._id);
                state.successMessage = action.payload.message;
            })
            .addCase(deleteNotePermanently.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // RESTORE SOFT DELETED NOTE
            .addCase(restoreSoftDeletedNote.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(restoreSoftDeletedNote.fulfilled, (state, action) => {
                state.loading = false;
                state.deletedNotes = state.deletedNotes.filter(note => note._id !== action.payload.note._id);
                state.notes.unshift(action.payload.note);
                state.successMessage = action.payload.message;
            })
            .addCase(restoreSoftDeletedNote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }

})

// export reducers functions
export const { clearMessages } = notesSlice.actions;

// export notesSlice reducer
export default notesSlice.reducer;