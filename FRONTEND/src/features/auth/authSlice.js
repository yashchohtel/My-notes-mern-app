import { createSlice } from "@reduxjs/toolkit";
import { loadUser, registerUser, logoutAccount, loginUser, sendVerificationOtp, verifyEmailOtp, uploadProfilePic, deleteProfilePic } from "./authThunks";


// initial state for auth slice
const initialState = {
    user: null,
    loading: false,
    error: null,
    successMessage: null,
    isAuthenticated: false,
    initialAuthChecked: false,
};

// creating slice for auth 
const authSlice = createSlice({

    name: "auth",

    initialState,

    // reducer to handle sync actions
    reducers: {

        // reducer function to clear error and success message
        clearMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        },

        // reducer function to reset the auth state after logout
        logoutUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isAccountVerified = false;
            state.initialAuthChecked = true;
        },

    },

    // extrareducers to handle async actions
    extraReducers: (builder) => {

        builder

            // load user data and auth state
            .addCase(loadUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.initialAuthChecked = true;
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
                state.initialAuthChecked = true;
            })

            // register user
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.successMessage = action.payload.message;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })

            // login user
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.successMessage = action.payload.message;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })

            // logout user
            .addCase(logoutAccount.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(logoutAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.successMessage = action.payload.message; // logout successful
                state.error = null;
            })
            .addCase(logoutAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.successMessage = null;
            })

            // OTP for email verification
            .addCase(sendVerificationOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(sendVerificationOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message; // ya jo bhi API se message aaya ho
            })
            .addCase(sendVerificationOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // error message from rejectWithValue
            })

            // Verify email
            .addCase(verifyEmailOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(verifyEmailOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.successMessage = action.payload.message;
                state.isAuthenticated = true;
            })
            .addCase(verifyEmailOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.successMessage = null;
            })

            // upload profile pic
            .addCase(uploadProfilePic.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(uploadProfilePic.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(uploadProfilePic.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.successMessage = null;
            })

            // delete profile pic 
            .addCase(deleteProfilePic.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(deleteProfilePic.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(deleteProfilePic.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.successMessage = null;
            })

    }

});

// export reducer function
export const { clearMessages, logoutUser } = authSlice.actions;

// export authSlice reducer
export default authSlice.reducer;

