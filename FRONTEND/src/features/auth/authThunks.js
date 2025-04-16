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