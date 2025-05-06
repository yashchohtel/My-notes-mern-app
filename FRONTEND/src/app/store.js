// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import notesReducer from '../features/notes/notesSlice.js';
import themeReducer from '../features/theme/themeSlice.js'

// configure store with 
const store = configureStore({

    reducer: {

        // auth reducer named as auth
        auth: authReducer,

        // notes reducers named as notes
        notes: notesReducer,

        // theme reducer named as theme
        theme: themeReducer,

    }

});

// export store for glocal use
export default store;