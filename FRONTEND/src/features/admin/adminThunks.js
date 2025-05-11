import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// getting backend url from env
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// thunk to load user data
export const loadAllUsers = createAsyncThunk('admin/loadAllUsers', async (_, { rejectWithValue }) => {

    try {

        const response = await axios.get(`${backendUrl}/api/admin/get-all-users`, {
            withCredentials: true
        });

        return response.data;

    } catch (error) {

        console.log(error);

        toast.error(error.response?.data?.message || 'Failed to load users');
        return rejectWithValue(error.response?.data || error.message);

    }
});