// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

// configure store with 
const store = configureStore({

    reducer: {

        // auth reducer named as auth
        auth: authReducer

    }

});

// export store for glocal use
export default store;