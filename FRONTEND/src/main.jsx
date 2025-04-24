import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './app/store.js';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(


  <BrowserRouter>

    <StrictMode>

      <ToastContainer position="bottom-right" toastClassName="my_toast" autoClose={2000} theme='dark' />

      <Provider store={store}>
        <App />
      </Provider>

    </StrictMode>,

  </BrowserRouter>

)
