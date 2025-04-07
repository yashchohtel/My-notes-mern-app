import Notes from "../models/Notes.js"; // Import Notes model
import ErrorHandler from "../utils/errorHandler.js"; // Import ErrorHandler utility

// CREATE NOTE CONTROLLER ---------------------------------- //

export const createNote = async (req, res, next) => {

    // Extract user ID from the request (send by auth middleware by verifying the token)
    const userId = req.userId;

    // Extract note data from the request body
    const { title, description } = req.body;

    // Check if the note data is provided
    if (!title || !description) {
        return next(new ErrorHandler("Please provide all required fields.", 400));
    }

    // Create a new note instance
    const newNote = new Notes({
        title,
        description,
        user: userId // Associate the note with the authenticated user
    });

    // Save the new task to the database
    const savedNote = await newNote.save();

    // logs for debugging remove in production
    console.log('↓--- createNote controller ---↓');
    console.log("userId : " + userId); // 
    console.log(`Notes created: ${savedNote}`);
    console.log('↑--- createNote controller ---↑');


    // send success response to the client
    return res.status(201).json({
        success: true,
        message: "Note created successfully.",
        note: savedNote // Send the created note as part of the response
    });

}

// GET ALL NOTE CONTROLLER --------------------------------- //

export const getAllNotes = async (req, res, next) => {

    // Extract user ID from the request (send by auth middleware by verifying the token)
    const userId = req.userId;

    // Fetch all notes for the authenticated user
    const notes = await Notes.find({ user: userId, isDeleted: false }).sort({ createdAt: -1 }).populate("user", "fullName email");

    // If no notes found, return a message  
    if (notes.length === 0) {
        return next(new ErrorHandler("No notes found.", 404));
    }

    // logs for debugging remove in production
    console.log('↓--- getAllNotes controller ---↓');
    console.log("userId : " + userId); // 
    console.log(`Notes fetched: ${notes}`);
    console.log('↑--- getAllNotes controller ---↑');

    // send success response to the client
    return res.status(200).json({
        success: true,
        message: "Notes fetched successfully.",
        notes // Send the fetched notes as part of the response
    });

}

// GET SINGLE NOTE CONTROLLER ------------------------------ //

export const getSingleNote = async (req, res, next) => {

    // Extract note ID from request parameters
    const { noteId } = req.params;

    // Extract user ID from auth middleware
    const userId = req.userId;

    // Find the note that matches the ID, belongs to the user, and is not deleted
    const note = await Notes.findOne({ _id: noteId, user: userId, isDeleted: false }).populate("user", "fullName email");

    // If note not found, return 404 response
    if (!note) {
        return next(new ErrorHandler("Note not found or you do not have permission to access it.", 404));
    }

    // logs for debugging remove in production
    console.log('↓--- getSingleNote controller ---↓');
    console.log("userId : " + userId);
    console.log("note : " + note);
    console.log("↑--- getSingleNote controller ---↑")

    // Send the note data as response
    return res.status(200).json({
        success: true,
        message: "Note retrieved successfully.",
        note
    });

};

// MARK NOTE IMPORTANT OR DEFAULT CONTROLLER --------------- //

export const markNoteImportant = async (req, res, next) => {

    // Extract note ID from request parameters
    const { noteId } = req.params;

    // Extract user ID from auth middleware
    const userId = req.userId;

    // Find the note that matches the ID, belongs to the user, and is not deleted
    const note = await Notes.findOne({ _id: noteId, user: userId, isDeleted: false }).populate("user", "fullName email");

    // If note not found, return 404 response
    if (!note) {
        next(new ErrorHandler("Note not found or you do not have permission to access it.", 404));
    }

    // Toggle note important/unimportant
    note.isImportant = !note.isImportant;

    // Save the updated note
    await note.save();

    // logs for debugging remove in production
    console.log('↓--- markNoteImportant controller ---↓');
    console.log("userId : " + userId);
    console.log("note : " + note);
    console.log("↑--- markNoteImportant controller ---↑")

    // Send the note data as response
    return res.status(200).json({
        success: true,
        message: `Note ${note.isImportant ? "marked as important" : "unmarked as important"} successfully.`,
        note
    });

}

// UPDATE NOTE CONTROLLER ----------------------------------- //

export const updateNote = async (req, res, next) => {

    // Extract note ID from request parameters
    const { noteId } = req.params;

    // Extract user ID from auth middleware
    const userId = req.userId;

    // Extract note data from the request body
    const { updatedTitle, updatedDescription } = req.body;

    // Find the note that matches the ID, belongs to the user, and is not deleted
    const note = await Notes.findOne({ _id: noteId, user: userId, isDeleted: false }).populate("user", "fullName email");

    // If note not found, return 404 response
    if (!note) {
        next(new ErrorHandler("Note not found or you do not have permission to access it.", 404));
    }

    // If no updates are provided, return an error
    if (!updatedTitle && !updatedDescription) {
        next(new ErrorHandler("Please provide at least one field to update.", 400));
    }

    // Update the note with new data
    note.title = updatedTitle;
    note.description = updatedDescription;

    // save the updated note
    const updatedNote = await note.save();

    // logs for debugging remove in production
    console.log('↓--- updateNote controller ---↓');
    console.log("userId : " + userId);
    console.log("note : " + updatedNote);
    console.log("↑--- updateNote controller ---↑")

    // Send the updated note data as response
    return res.status(200).json({
        success: true,
        message: "Note updated successfully.",
        note: updatedNote
    });

}

// SOFT DELETE SINGLE NOTE CONTROLLER ------------------------ //

export const softDeleteNote = async (req, res, next) => {

    // Extract note ID from request parameters
    const { noteId } = req.params;

    // Extract user ID from auth middleware
    const userId = req.userId;

    // Find the note that matches the ID, belongs to the user, and is not already deleted
    const note = await Notes.findOne({ _id: noteId, user: userId, isDeleted: false });

    // If note not found, return 404 response
    if (!note) {
        next(new ErrorHandler("Note not found or already deleted.", 404));
    }

    // Soft delete the note by updating the isDeleted field
    note.isDeleted = true;
    note.deletedAt = new Date();

    // Save the updated note
    await note.save();

    // logs for debugging remove in production
    console.log('↓--- softDeletenote controller ---↓');
    console.log("userId : " + userId);
    console.log("note : " + note);
    console.log("↑--- softDeletenote controller ---↑")

    // Send success response
    return res.status(200).json({
        success: true,
        message: "Note moved to Recycle Bin successfully.",
        note
    });

}

// SOFT DELETE ALL NOTES CONTROLLER ------------------------ //

export const softDeleteAllNotes = async (req, res, next) => {

    // Extract user ID from auth middleware
    const userId = req.userId;

    // Find all notes that belong to the user and are not already deleted
    const notes = await Notes.find({ user: userId, isDeleted: false });

    // If no notes found, return a message
    if (notes.length === 0) {
        next(new ErrorHandler("No active notes found to delete.", 404));
    }

    // Soft delete all notes by updating isDeleted and deletedAt fields
    await Notes.updateMany(
        { user: userId, isDeleted: false },
        { isDeleted: true, deletedAt: new Date() }
    );

    // logs for debugging remove in production
    console.log('↓--- softDeleteAllNotes controller ---↓');
    console.log("userId : " + userId);
    console.log("notes : " + notes);
    console.log("↑--- softDeleteAllNotes controller ---↑");

    // Send success response
    return res.status(200).json({
        success: true,
        message: "All notes moved to Recycle Bin successfully.",
    });

}

// RESTORE DATA FROM BIN CONTROLLER ------------------------ //

export const restoreSoftDeletedNote = async (req, res, next) => {

    // Extract note ID from request parameters
    const { noteId } = req.params;

    // Extract user ID from auth middleware
    const userId = req.userId;

    // Find the note that matches the ID, belongs to the user, and is deleted
    const note = await Notes.findOne({ _id: noteId, user: userId, isDeleted: true });

    // If note not found, return 404 response
    if (!note) {
        next(new ErrorHandler("Note not found or it's not in the recycle bin.", 404));
    }

    // Restore the note by updating isDeleted and deletedAt fields
    note.isDeleted = false;
    note.deletedAt = null;

    // Save the restored note
    await note.save();

    // logs for debugging remove in production
    console.log('↓--- restoreSoftDeletedNote controller ---↓');
    console.log("userId : " + userId);
    console.log("note : " + note);
    console.log("↑--- restoreSoftDeletedNote controller ---↑");

    // Send success response
    return res.status(200).json({
        success: true,
        message: "Note restored successfully.",
        note
    });

}

// RESTORE ALL DATA FROM BIN CONTROLLER -------------------- //

export const restoreAllSoftDeletedNotes = async (req, res, next) => {

    // Extract user ID from auth middleware
    const userId = req.userId;

    // Find all notes that belong to the user and are already deleted
    const notes = await Notes.find({ user: userId, isDeleted: true });

    // If no notes found, return a message
    if (notes.length === 0) {
        next(new ErrorHandler("No deleted notes found to restore.", 404));
    }

    // Find and restore all delete notes by updating isDeleted and deletedAt fields
    await Notes.updateMany(
        { user: userId, isDeleted: true },
        { isDeleted: false, deletedAt: null }
    );

    // logs for debugging remove in production
    console.log('↓--- restoreAllSoftDeletedNotes controller ---↓');
    console.log("userId : " + userId);
    console.log("notes : " + notes);
    console.log("↑--- restoreAllSoftDeletedNotes controller ---↑");

    // Return success response
    return res.status(200).json({
        success: true,
        message: "All soft deleted notes have been restored successfully."
    });

}

// DELETE SINGLE NOTE PERMANENTLY CONTROLLER ----------------- //

export const deleteNotePermanently = async (req, res, next) => {

    // Extract note ID from request parameters
    const { noteId } = req.params;

    // Extract user ID from auth middleware
    const userId = req.userId;

    // Find the note that is soft deleted
    const note = await Notes.findOne({ _id: noteId, user: userId, isDeleted: true });

    // If note is not found or not in trash, return 404
    if (!note) {
        next(new ErrorHandler("Note not found in trash or you do not have permission to delete it.", 404));
    }

    // Permanently delete the note from the database
    await Notes.deleteOne({ _id: noteId });

    // logs for debugging remove in production
    console.log('↓--- deleteNotePermanently controller ---↓');
    console.log("userId : " + userId);
    console.log("Deleted Note ID : " + noteId);
    console.log("↑--- deleteNotePermanently controller ---↑");

    // Return success response
    return res.status(200).json({
        success: true,
        message: "Note permanently deleted."
    });

}

// DELETE ALL NOTE PERMANENTLY CONTROLLER -------------------- //

export const deleteAllNotesPermanently = async (req, res, next) => {

    // Extract user ID from auth middleware
    const userId = req.userId;

    // Find all soft deleted notes of the user
    const deletedNotes = await Notes.find({ user: userId, isDeleted: true });

    // If no soft deleted notes found, return 404
    if (deletedNotes.length === 0) {
        next(new ErrorHandler("No notes found in trash to delete permanently.", 404));
    }

    // Permanently delete all soft-deleted notes
    await Notes.deleteMany({ user: userId, isDeleted: true });

    // logs for debugging remove in production
    console.log('↓--- deleteAllPermanently controller ---↓');
    console.log("userId : " + userId);
    console.log("Deleted Notes Count : " + deletedNotes.length);
    console.log("↑--- deleteAllPermanently controller ---↑");

    // Return success response
    return res.status(200).json({
        success: true,
        message: "All notes in bin have been permanently deleted."
    });

}

// END OF FILE 