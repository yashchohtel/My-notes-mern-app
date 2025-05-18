import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// getting backend url from env
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// thunk to load user data
export const loadAllUsers = createAsyncThunk('admin/loadAllUsers', async (_, { rejectWithValue }) => {

    try {

        // Sending GET request to get all user data
        const response = await axios.get(`${backendUrl}/api/admin/get-all-users`, {
            withCredentials: true
        });

        return response.data; // Returning the data on success

    } catch (error) {

        console.log(error);

        toast.error(error.response?.data?.message || 'Failed to load users');
        return rejectWithValue(error.response?.data || error.message);

    }
});

// thunk to promote a user to admin
export const promoteUserToAdmin = createAsyncThunk('admin/promoteUserToAdmin', async (userId, { rejectWithValue }) => {

    console.log(userId);

    try {

        // Sending PATCH request to promote user to admin
        const response = await axios.patch(`${backendUrl}/api/superAdmin/promote-user-to-admin/${userId}`, {}, {
            withCredentials: true
        });

        console.log(response)
        toast.success( response.data.message ||'User promoted to admin successfully');
        return response.data; // Returning the data on success

    } catch (error) {

        console.log(error);

        toast.error(error.response?.data?.message || 'Failed to promote user to admin');
        return rejectWithValue(error.response?.data || error.message);

    }

});

// thunk to promote a user to super admin
export const promoteUserToSuperAdmin = createAsyncThunk('admin/promoteUserToSuperAdmin', async (userId, { rejectWithValue }) => {

    try {

        // Sending PATCH request to promote user to super admin
        const response = await axios.patch(`${backendUrl}/api/superAdmin/promote-user-to-superAdmin/${userId}`, {}, {
            withCredentials: true
        });

        toast.success(response.data.message || 'User promoted to super admin successfully');
        return response.data; // Returning the data on success

    } catch (error) {

        console.log(error);

        toast.error(error.response?.data?.message || 'Failed to promote user to super admin');
        return rejectWithValue(error.response?.data || error.message);

    }

});

// thunk to demote an admin to a regular user
export const demoteAdminToUser = createAsyncThunk('admin/demoteAdminToUser', async (userId, { rejectWithValue }) => {

    try {

        // Sending PATCH request to demote admin to user
        const response = await axios.patch(`${backendUrl}/api/superAdmin/demote-admin-to-user/${userId}`, {}, {
            withCredentials: true
        });

        toast.success(response.data.message || 'Admin demoted to user successfully');
        return response.data; // Returning the data on success

    } catch (error) {

        console.log(error);

        toast.error(error.response?.data?.message || 'Failed to demote admin to user');
        return rejectWithValue(error.response?.data || error.message);

    }

});

// thunk to delete a user account
export const deleteUserAccount = createAsyncThunk('admin/deleteUserAccount', async (userId, { rejectWithValue }) => {

    try {

        // Sending DELETE request to delete user account
        const response = await axios.delete(`${backendUrl}/api/superAdmin/delete-user-account/${userId}`, {
            withCredentials: true
        });

        toast.success(response.data.message || 'User account deleted successfully');
        return response.data; // Returning the data on success

    } catch (error) {

        console.log(error);

        toast.error(error.response?.data?.message || 'Failed to delete user account');
        return rejectWithValue(error.response?.data || error.message);

    }

});