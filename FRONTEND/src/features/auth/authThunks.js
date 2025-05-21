import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// getting backend url from env
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// thunk to load user data and auth state
export const loadUser = createAsyncThunk('auth/loadUser', async (_, { rejectWithValue }) => {
    ;

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

// thunk to upload user profile image
export const uploadProfilePic = createAsyncThunk('auth/uploadProfilePic', async (formData, { rejectWithValue }) => {

    try {

        const { data } = await axios.post(`${backendUrl}/api/user/upload-profile-pic`, formData, {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        toast.success(data.message);
        console.log(data);

        return data;

    } catch (err) {
        console.log(err);
        toast.success(err.response?.data?.message || "Failed to upload profile picture");
        return rejectWithValue(err.response?.data?.message || "Failed to upload profile picture");
    }

});

// thunk to delete user profile iamge
export const deleteProfilePic = createAsyncThunk('auth/deleteProfilePic', async (_, { rejectWithValue }) => {

    try {

        const { data } = await axios.delete(`${backendUrl}/api/user/delete-profile-pic`, {
            withCredentials: true,
        });

        toast.success(data.message);
        return data;

    } catch (err) {

        console.log(err);
        toast.error(err.response?.data?.message || "Failed to delete profile picture");
        return rejectWithValue(err.response?.data?.message || "Failed to delete profile picture");

    }
});

// thunk to change full name
export const changeFullName = createAsyncThunk('auth/changeFullName', async (formData, { rejectWithValue }) => {

    try {

        const { data } = await axios.patch(`${backendUrl}/api/user/change-fullname`, formData, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        });

        toast.success(data.message);

        return data;

    } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || "Failed to change full name");
        return rejectWithValue(err.response?.data?.message || "Failed to change full name");
    }

});

// thunk to change username
export const changeUsername = createAsyncThunk('auth/changeUsername', async (formData, { rejectWithValue }) => {
    try {

        const { data } = await axios.patch(`${backendUrl}/api/user/change-username`, formData, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        });

        toast.success(data.message);
        return data;

    } catch (err) {

        console.log(err);
        toast.error(err.response?.data?.message || "Failed to change username");
        return rejectWithValue(err.response?.data?.message || "Failed to change username");

    }
});

// thunk to send reset password otp
export const sendPasswordResetOtp = createAsyncThunk('auth/sendPasswordResetOtp', async (formData, { rejectWithValue }) => {

    try {

        const { data } = await axios.post(`${backendUrl}/api/user/send-pass-reset-otp`, formData, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        });
        toast.success(data.message);
        return data;

    } catch (err) {

        console.log(err);
        toast.error(err.response?.data?.message || "Failed to send password reset OTP");
        return rejectWithValue(err.response?.data?.message || "Failed to send password reset OTP");

    }
});

// thunk to reset password
export const resetPassword = createAsyncThunk('auth/resetPassword', async (formData, { rejectWithValue }) => {

    try {

        const { data } = await axios.post(`${backendUrl}/api/user/reset-password`, formData, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
        });
        toast.success(data.message);
        return data;

    } catch (err) {

        console.log(err);
        toast.error(err.response?.data?.message || "Failed to reset password");
        return rejectWithValue(err.response?.data?.message || "Failed to reset password");

    }
});

// thunk to soft delete account
export const softDeleteAccount = createAsyncThunk('auth/softDeleteAccount', async (password, { rejectWithValue }) => {

    try {

        const { data } = await axios.delete(`${backendUrl}/api/user/soft-delete-account`, {
            data: { password },
            withCredentials: true
        });

        toast.success(data.message);
        return data;

    } catch (err) {

        console.log(err);
        toast.error(err.response?.data?.message || "Failed to delete account");
        return rejectWithValue(err.response?.data?.message || "Failed to delete account");

    }
});