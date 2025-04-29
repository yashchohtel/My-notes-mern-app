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

