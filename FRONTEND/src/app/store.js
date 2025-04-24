// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import notesReducer from '../features/notes/notesSlice';

// configure store with 
const store = configureStore({

    reducer: {

        // auth reducer named as auth
        auth: authReducer,

        // notes reducers named as notes
        notes: notesReducer,

    }

});

// export store for glocal use
export default store;