import express from 'express'; // Importing express framework
import userAuth from '../middleware/userAuthMiddleware.js';// Importing user authentication middleware
import { createNote } from '../controllers/notesController.js'; // Importing the Controller function from notesController

const notesRouter = express.Router(); // Creating an instance of Express Router


// NOTES OPERATION ROUTES -------------------- //

// Create note route [POST]
notesRouter.post('/create-note', userAuth, createNote); // 'http://localhost:3000/api/notes/create-note'




export default notesRouter; // Exporting the notesRouter instance