import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// getting backend url from env
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// thunk to load all notes of user
export const fetchAllNotes = createAsyncThunk('notes/fetchAllNotes', async (_, { rejectWithValue }) => {

    try {

        // Sending GET request to fetch all notes 
        const response = await axios.get(`${backendUrl}/api/notes/getAll-notes`);

        console.log(response)

        return response.data; // Returning the data on success

    } catch (error) {

        console.log(error)

        // Handling errors and returning a rejected value
        toast.error(error.response?.data?.message || 'Failed to fetch notes');
        return rejectWithValue(error.response?.data || error.message);

    }
});
