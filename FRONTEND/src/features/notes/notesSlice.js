import { createSlice } from "@reduxjs/toolkit";
import { createNote, deleteAllNotesPermanently, deleteNotePermanently, fetchAllDeletedNotes, fetchAllNotes, markNoteImportant, markNoteUnimportant, restoreAllSoftDeletedNotes, restoreSoftDeletedNote, softDeleteAllImportantNotes, softDeleteAllNotes, softDeleteNote, updateNote } from "./notesThunks";
import { act } from "react";
import { toast } from "react-toastify";

// initial state
const initialState = {

    // to store notes
    notes: [],
    deletedNotes: [],

    // loading
    loading: false,

    // important loading
    importantLoading: false,

    // messages
    error: null,
    successMessage: null,

    // related to filter
    filteredNote: [],
    isFilterActive: false,
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

        // reducer to filter notes
        filterNote: (state, action) => {

            // sorting type for note
            const sortType = action.payload.filterType;

            // filter status
            const filterStatus = action.payload.filterActive;

            // variable to store filtered note
            let result;

            // all Notes means no filtred note
            if (sortType === "allNotes") {
                state.filteredNote = []
                state.isFilterActive = filterStatus
                if (action.payload.whereAction !== "searchBar") {
                    toast.info("All Notes");
                }
            }

            // new note first
            if (sortType === "newFirst") {
                result = [...state.notes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                state.isFilterActive = filterStatus
                state.filteredNote = result;
                toast.info("New Note First");
            }

            // oldest note first
            if (sortType === "OldFirst") {
                result = [...state.notes].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                state.isFilterActive = filterStatus
                state.filteredNote = result;
                toast.info("Oldest Note First");
            }

            // for last seven days
            if (sortType === "last7") {

                const today = new Date();

                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(today.getDate() - 7);

                result = [...state.notes].filter(note => {
                    const createdDate = new Date(note.createdAt);
                    return createdDate >= sevenDaysAgo && createdDate <= today;
                });

                state.isFilterActive = filterStatus
                state.filteredNote = result;
                toast.info("Last 7 Days Notes");
            }

            // for last thirty days
            if (sortType === "last30") {

                // today date 
                const today = new Date();

                // thirty day ago date
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(today.getDate() - 30);

                result = [...state.notes].filter(note => {
                    const createdDate = new Date(note.createdAt);
                    return createdDate >= thirtyDaysAgo && createdDate <= today;
                });

                state.isFilterActive = filterStatus
                state.filteredNote = result;
                toast.info("Last 30 Days Notes");
            }
        }

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
                state.loading = true
                state.importantLoading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(markNoteImportant.fulfilled, (state, action) => {
                state.importantLoading = false;
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

            // MARK NOTE UNIMPORTANT
            .addCase(markNoteUnimportant.pending, (state) => {
                state.importantLoading = true;
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(markNoteUnimportant.fulfilled, (state, action) => {
                state.importantLoading = false;
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(markNoteUnimportant.rejected, (state, action) => {
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
export const { clearMessages, filterNote } = notesSlice.actions;

// export notesSlice reducer
export default notesSlice.reducer;