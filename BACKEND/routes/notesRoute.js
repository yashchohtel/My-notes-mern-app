import express from 'express'; // Importing express framework
import userAuth from '../middleware/userAuthMiddleware.js';// Importing user authentication middleware
import { createNote, deleteAllNotesPermanently, deleteNotePermanently, getAllNotes, getSingleNote, markNoteImportant, restoreAllSoftDeletedNotes, restoreSoftDeletedNote, softDeleteAllNotes, softDeleteNote, updateNote } from '../controllers/notesController.js'; // Importing the Controller function from notesController

const notesRouter = express.Router(); // Creating an instance of Express Router


// NOTES OPERATION ROUTES -------------------- //

// Create note route [POST]
notesRouter.post('/create-note', userAuth, createNote); // 'http://localhost:3000/api/notes/create-note'

// Get all notes route [GET]
notesRouter.get('/getAll-notes', userAuth, getAllNotes); // 'http://localhost:3000/api/notes/getAll-notes'

// Get single note route [GET]
notesRouter.get('/get-note/:noteId', userAuth, getSingleNote); // 'http://localhost:3000/api/notes/get-note/:noteId'

// Mark note important/unimportant route [POST]
notesRouter.post('/mark-note-important/:noteId', userAuth, markNoteImportant); // 'http://localhost:3000/api/notes/mark-note-important/:noteId'

// Update note route [PATCH]
notesRouter.patch('/update-note/:noteId', userAuth, updateNote); // 'http://localhost:3000/api/notes/update-note/:noteId'

// Soft delete single note route [DELETE]
notesRouter.delete('/soft-delete-note/:noteId', userAuth, softDeleteNote); // 'http://localhost:3000/api/notes/soft-delete-note/:noteId'

// Soft delete all notes route [DELETE]
notesRouter.delete('/soft-delete-all-notes', userAuth, softDeleteAllNotes); // 'http://localhost:3000/api/notes/soft-delete-all-notes'

// Restore soft deleted note route [POST]
notesRouter.post('/restore-soft-del-note/:noteId', userAuth, restoreSoftDeletedNote); // 'http://localhost:3000/api/notes/restore-soft-del-note/:noteId'

// Restore all soft deleted note routes [POST]
notesRouter.post('/restore-all-soft-deleted-notes', userAuth, restoreAllSoftDeletedNotes); // 'http://localhost:3000/api/notes/restore-all-soft-deleted-notes'

// Delete single soft deleted note permanently [DELETE]
notesRouter.delete('/delete-note-permanentaly/:noteId', userAuth, deleteNotePermanently); // 'http://localhost:3000/api/notes/delete-note-permanentaly/:noteId'

// Delete ALL soft deleted noteS permanently [DELETE]
notesRouter.delete('/delete-all-note-permanentaly', userAuth, deleteAllNotesPermanently); // 'http://localhost:3000/api/notes/delete-all-note-permanentaly'

export default notesRouter; // Exporting the notesRouter instance

