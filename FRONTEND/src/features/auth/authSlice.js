import { createSlice } from "@reduxjs/toolkit";
import { loadUser, registerUser } from "./authThunks";


// initial state for auth slice
const initialState = {
    user: null,
    loading: false,
    error: null,
    successMessage: null,
    isAuthenticated: false,
    isAccountVerified: false,
};

// creating slice for auth 
const authSlice = createSlice({

    name: "auth",
    initialState,

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
        }
    },

    // extrareducers to handle async actions
    extraReducers: (builder) => {

        builder

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
                state.isAccountVerified = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })

            // load user data and auth state
            .addCase(loadUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            });

    }

});

// export reducer function
export const { clearMessages, logoutUser } = authSlice.actions;

// export authSlice reducer
export default authSlice.reducer;

