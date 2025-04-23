import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// getting backend url from env
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// thunk to load user data and auth state
export const loadUser = createAsyncThunk('auth/loadUser', async (_, { rejectWithValue }) => {

    try {

        // send post request to register user
        const { data } = await axios.post(`${backendUrl}/api/user/is-user-auth`, {}, {
            withCredentials: true,
        });

        if (data.success) {

            const { data: userData } = await axios.get(`${backendUrl}/api/user/get-user-data`, {
                withCredentials: true,
            });

            return userData;

        } else {
            return rejectWithValue("User not authenticated");
        }


    } catch (error) {

        return rejectWithValue(error.response?.data?.message || "Failed to load user");
    }

});

// thunk to register user
export const registerUser = createAsyncThunk('auth/registerUser', async (formData, { rejectWithValue }) => {

    try {

        // send post request to register user
        const { data } = await axios.post(`${backendUrl}/api/user/register`, formData, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        });

        // thunk me inside try block
        toast.success(data.message); // "Sign-up successful"

        // return succes response
        return data;

    } catch (err) {

        console.log(err);

        // handle error
        return rejectWithValue(err.response?.data?.message || "Something went wrong");

    }

});

// thunk to logout user
export const logoutAccount = createAsyncThunk('auth/logoutAccount', async (_, { rejectWithValue }) => {

    try {

        // send post request to logout user
        const { data } = await axios.post(`${backendUrl}/api/user/logout`, {}, {
            withCredentials: true,
        });

        // show success message
        toast.success(data.message); // "Logout successful"

        // return success response
        return data;

    } catch (err) {

        console.log(err);

        // handle error
        return rejectWithValue(err.response?.data?.message || "Failed to logout");
    }

});

// thunk to loign user
export const loginUser = createAsyncThunk('auth/loginUser', async (formData, { rejectWithValue, dispatch }) => {

    try {

        // send post request to login user
        const { data } = await axios.post(`${backendUrl}/api/user/login`, formData, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        });

        // show success message
        toast.success(data.message); // "Login successful"

        // return success response
        return data;

    } catch (err) {

        console.log(err);

        // handle error
        return rejectWithValue(err.response?.data?.message || "Failed to login");
    }

});

// thunk to send verify email otp
export const sendVerificationOtp = createAsyncThunk('auth/sendVerificationOtp', async (_, { rejectWithValue }) => {

    try {

        // send post request to send verify otp
        const { data } = await axios.post(`${backendUrl}/api/user/send-verify-otp`, {}, {
            withCredentials: true,
        })

        // show success message
        toast.success(data.message);

        // return data
        return data;

    } catch (err) {

        console.log(err);

        // handle error
        return rejectWithValue(err.response?.data?.message || "Failed to send verification otp");

    }

})


// thunk to verify email otp
export const verifyEmailOtp = createAsyncThunk("auth/verifyEmailOtp", async (otp, { rejectWithValue }) => {

    try {

        // send post request to verify email
        const { data } = await axios.post(`${backendUrl}/api/user/verify-email`, { otp }, { withCredentials: true });

        // show success toast
        toast.success(data.message);

        // return response
        console.log(data);

        return data;
    } catch (err) {

        console.log(err);
        return rejectWithValue(err.response?.data?.message || "OTP verification failed");

    }
});