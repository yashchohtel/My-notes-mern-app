import { createSlice } from '@reduxjs/toolkit';
import { deleteUserAccount, demoteAdminToUser, loadAllUsers, promoteUserToAdmin, promoteUserToSuperAdmin } from './adminThunks';

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
            })

            // TO PROMOTE A USER TO ADMIN
            .addCase(promoteUserToAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(promoteUserToAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(promoteUserToAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // TO PROMOTE A USER TO SUPER ADMIN
            .addCase(promoteUserToSuperAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(promoteUserToSuperAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(promoteUserToSuperAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // TO DEMOTE AN ADMIN TO A REGULAR USER
            .addCase(demoteAdminToUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(demoteAdminToUser.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(demoteAdminToUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // TO DELETE A USER ACCOUNT
            .addCase(deleteUserAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUserAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(deleteUserAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    }

});

export const { } = adminSlice.actions;

export default adminSlice.reducer;