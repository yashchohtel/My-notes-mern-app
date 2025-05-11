import { createSlice } from '@reduxjs/toolkit';
import { loadAllUsers } from './adminThunks';

// initial state for auth slice
const initialState = {
    userData: [],
    loading: false,
    error: null,
    successMessage: null,
};

const adminSlice = createSlice({

    // slice name
    name: 'admin',

    // initialState
    initialState,

    // reducers
    reducers: {},

    // extraReducers 
    extraReducers: (builder) => {
        builder

            // TO LOAD ALL USER AND THEIR DATA 
            .addCase(loadAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload.users;
            })
            .addCase(loadAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }

});

export const { } = adminSlice.actions;

export default adminSlice.reducer;