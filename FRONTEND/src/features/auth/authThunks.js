import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';


// thunk to register user
export const registerUser = createAsyncThunk('auth/registerUser', async (formData, { rejectWithValue }) => {

    try {

        // send post request to register user
        const res = await axios.post('http://localhost:3000/api/user/register', formData, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        });

        // thunk me inside try block
        toast.success(res.data.message); // "Sign-up successful"

        // return succes response
        return res.data;

    } catch (err) {

        console.log(err);

        // handle error
        return rejectWithValue(err.response?.data?.message || "Something went wrong");

    }

});

// thunk to load user data and auth state
export const loadUser = createAsyncThunk('auth/loadUser', async (_, { rejectWithValue }) => {

    try {

        // send post request to register user
        const { data: authData } = await axios.post('http://localhost:3000/api/user/is-user-auth', {}, {
            withCredentials: true,
        });

        if (authData.success) {

            const { data: userData } = await axios.get("http://localhost:3000/api/user/get-user-data", {
                withCredentials: true,
            });

            return userData;

        } else {
            return thunkAPI.rejectWithValue("User not authenticated");
        }

    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to load user");
    }

});

// thunk to logout user
export const logoutAccount = createAsyncThunk('auth/logoutAccount', async (_, { rejectWithValue }) => {

    try {

        // send post request to logout user
        const res = await axios.post('http://localhost:3000/api/user/logout', {}, {
            withCredentials: true,
        });

        // show success message
        toast.success(res.data.message); // "Logout successful"

        // return success response
        return res.data;

    } catch (err) {

        console.log(err);

        // handle error
        return rejectWithValue(err.response?.data?.message || "Failed to logout");
    }

});

// thunk to loign user
export const loginUser = createAsyncThunk('auth/loginUser', async (formData, { rejectWithValue }) => {

    try {

        // send post request to login user
        const res = await axios.post('http://localhost:3000/api/user/login', formData, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        });

        // show success message
        toast.success(res.data.message); // "Login successful"

        // return success response
        return res.data;

    } catch (err) {

        console.log(err);

        // handle error
        return rejectWithValue(err.response?.data?.message || "Failed to login");
    }

});