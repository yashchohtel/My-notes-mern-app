import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// getting backend url from env
const backendUrl = import.meta.env.VITE_BACKEND_URL;


// tunk to create notes
export const createNote = createAsyncThunk('notes/createNote', async (noteFormData, { rejectWithValue }) => {

    try {

        // Sending POST request to create a new note
        const response = await axios.post(`${backendUrl}/api/notes/create-note`, noteFormData, {
            withCredentials: true,
        });

        toast.success('Note created successfully');
        return response.data; // Returning the data on success

    } catch (error) {

        console.log(error);

        // Handling errors and returning a rejected value
        console.error(error.response?.data?.message || 'Failed to create note');
        return rejectWithValue(error.response?.data || error.message);

    }

});

// thunk to load all notes of user
export const fetchAllNotes = createAsyncThunk('notes/fetchAllNotes', async (_, { rejectWithValue }) => {

    try {

        // Sending GET request to fetch all notes 
        const response = await axios.get(`${backendUrl}/api/notes/getAll-notes`, {
            withCredentials: true,
        });

        // console.log(response)

        return response.data; // Returning the data on success

    } catch (error) {

        console.log(error)

        // Handling errors and returning a rejected value
        console.error(error.response?.data?.message || 'Failed to fetch notes');
        return rejectWithValue(error.response?.data || error.message);

    }
});

// thunk to mark a note as important
export const markNoteImportant = createAsyncThunk('notes/markNoteImportant', async (noteId, { rejectWithValue }) => {

    try {

        // Sending PATCH request to mark the note as important
        const response = await axios.patch(`${backendUrl}/api/notes/mark-note-important/${noteId}`, {}, {
            withCredentials: true,
        });

        // console.log(response);

        toast.success(response.data.message);
        return response.data; // Returning the data on success

    } catch (error) {

        console.log(error);

        // Handling errors and returning a rejected value
        console.error(error.response?.data?.data || 'Failed to mark note as important');
        return rejectWithValue(error.response?.data || error.message);

    }
});

// thunk to mark a note as unimportant
export const markNoteUnimportant = createAsyncThunk('notes/markNoteUnimportant', async (_, { rejectWithValue }) => {

    try {

        // Sending PATCH request to mark the note as unimportant
        const response = await axios.patch(`${backendUrl}/api/notes/mark-note-un-important`, {}, {
            withCredentials: true,
        });

        toast.success(response.data.message);
        return response.data; // Returning the data on success

    } catch (error) {

        console.log(error);

        // Handling errors and returning a rejected value
        console.error(error.response?.data?.message || 'Failed to mark note as unimportant');
        return rejectWithValue(error.response?.data || error.message);

    }
});

// thunk to update a note
export const updateNote = createAsyncThunk('notes/updateNote', async ({ editNoteId, noteFormData }, { rejectWithValue }) => {

    try {

        // Sending PATCH request to update the note
        const response = await axios.patch(`${backendUrl}/api/notes/update-note/${editNoteId}`, noteFormData, {
            withCredentials: true,
        });

        toast.success(response.data.message);
        return response.data; // Returning the data on success

    } catch (error) {

        console.log(error);

        // Handling errors and returning a rejected value
        console.error(error.response?.data?.message || 'Failed to update note');
        return rejectWithValue(error.response?.data || error.message);

    }
});

// thunk to soft delete a note
export const softDeleteNote = createAsyncThunk('notes/softDeleteNote', async (noteId, { rejectWithValue }) => {

    try {

        // Sending DELETE request to soft delete the note
        const response = await axios.delete(`${backendUrl}/api/notes/soft-delete-note/${noteId}`, {
            withCredentials: true,
        });

        toast.success(response.data.message);
        return response.data; // Returning the data on success

    } catch (error) {

        console.log(error);

        // Handling errors and returning a rejected value
        console.error(error.response?.data?.message || 'Failed to delete note');
        return rejectWithValue(error.response?.data || error.message);

    }
});

// thunk to soft delete all notes
export const softDeleteAllNotes = createAsyncThunk('notes/softDeleteAllNotes', async (_, { rejectWithValue }) => {

    try {

        // Sending DELETE request to soft delete all notes
        const response = await axios.delete(`${backendUrl}/api/notes/soft-delete-all-notes`, {
            withCredentials: true,
        });

        toast.success(response.data.message);
        return response.data; // Returning the data on success

    } catch (error) {

        console.log(error);

        // Handling errors and returning a rejected value
        console.error(error.response?.data?.message || 'Failed to delete all notes');
        toast.success(error.response.data.message);
        return rejectWithValue(error.response?.data || error.message);

    }
});

// thunk to soft delete all important notes
export const softDeleteAllImportantNotes = createAsyncThunk('notes/softDeleteAllImportantNotes', async (_, { rejectWithValue }) => {

    try {

        // Sending DELETE request to soft delete all important notes
        const response = await axios.delete(`${backendUrl}/api/notes/soft-delete-all-imp-notes`, {
            withCredentials: true,
        });

        toast.success(response.data.message);
        return response.data; // Returning the data on success

    } catch (error) {

        console.log(error);

        // Handling errors and returning a rejected value
        console.error(error.response?.data?.message || 'Failed to delete all important notes');
        return rejectWithValue(error.response?.data || error.message);

    }
});

// thunk to fetch all deleted notes
export const fetchAllDeletedNotes = createAsyncThunk('notes/fetchAllDeletedNotes', async (_, { rejectWithValue }) => {

    try {

        // Sending GET request to fetch all deleted notes
        const response = await axios.get(`${backendUrl}/api/notes/getAllDel-notes`, {
            withCredentials: true,
        });

        return response.data; // Returning the data on success

    } catch (error) {

        console.log(error);

        // Handling errors and returning a rejected value
        console.error(error.response?.data?.message || 'Failed to fetch deleted notes');
        return rejectWithValue(error.response?.data || error.message);

    }
});

// thunk to restore all soft-deleted notes
export const restoreAllSoftDeletedNotes = createAsyncThunk('notes/restoreAllSoftDeletedNotes', async (_, { rejectWithValue }) => {

    try {

        // Sending PATCH request to restore all soft-deleted notes
        const response = await axios.post(`${backendUrl}/api/notes/restore-all-soft-deleted-notes`, {}, {
            withCredentials: true,
        });

        toast.success(response.data.message);
        return response.data; // Returning the data on success

    } catch (error) {

        console.log(error);

        // Handling errors and returning a rejected value
        console.error(error.response?.data?.message || 'Failed to restore all soft-deleted notes');
        return rejectWithValue(error.response?.data || error.message);

    }
});

// thunk to permanently delete all notes
export const deleteAllNotesPermanently = createAsyncThunk('notes/deleteAllNotesPermanently', async (_, { rejectWithValue }) => {

    try {

        // Sending DELETE request to permanently delete all notes
        const response = await axios.delete(`${backendUrl}/api/notes/delete-all-note-permanentaly`, {
            withCredentials: true,
        });

        toast.success(response.data.message);
        return response.data; // Returning the data on success

    } catch (error) {

        console.log(error);

        // Handling errors and returning a rejected value
        console.error(error.response?.data?.message || 'Failed to permanently delete all notes');
        return rejectWithValue(error.response?.data || error.message);

    }
});

// thunk to permanently delete a note
export const deleteNotePermanently = createAsyncThunk('notes/deleteNotePermanently', async (noteId, { rejectWithValue }) => {

    try {

        console.log(noteId)

        // Sending DELETE request to permanently delete the note
        const response = await axios.delete(`${backendUrl}/api/notes/delete-note-permanentaly/${noteId}`, {
            withCredentials: true,
        });

        toast.success(response.data.message);
        return response.data; // Returning the data on success

    } catch (error) {

        console.log(error);

        // Handling errors and returning a rejected value
        console.error(error.response?.data?.message || 'Failed to permanently delete note');
        return rejectWithValue(error.response?.data || error.message);

    }
});

// thunk to restore a soft-deleted note
export const restoreSoftDeletedNote = createAsyncThunk('notes/restoreSoftDeletedNote', async (noteId, { rejectWithValue }) => {

    try {

        // Sending PATCH request to restore a soft-deleted note
        const response = await axios.post(`${backendUrl}/api/notes/restore-soft-del-note/${noteId}`, {}, {
            withCredentials: true,
        });
        
        toast.success(response.data.message);
        return response.data; // Returning the data on success

    } catch (error) {

        // Handling errors and returning a rejected value
        console.error(error.response?.data?.message || 'Failed to restore soft-deleted note');
        return rejectWithValue(error.response?.data || error.message);

    }
});