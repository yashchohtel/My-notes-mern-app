import Notes from "../models/Notes.js"; // Import Notes model
import User from "../models/User.js"; // Import User model

// CREATE NOTE CONTROLLER ---------------------------------- //

export const createNote = async (req, res) => {

    try {

        // Extract user ID from the request (send by auth middleware by verifying the token)
        const userId = req.userId;

        // Extract note data from the request body
        const { title, description } = req.body;

        // Check if the note data is provided
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields."
            });
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

    } catch (error) {

        console.error("Error in createNote controller:", error);

        // Check if the error has a specific message and handle accordingly
        const errorMessage = error.message ? error.message : "Internal Server Error. Please try again later.";

        // Return a generic message to the client
        return res.status(500).json({
            success: false,
            message: errorMessage
        });

    }

}

// GET ALL NOTE CONTROLLER --------------------------------- //

export const getAllNotes = async (req, res) => {

    try {

        // Extract user ID from the request (send by auth middleware by verifying the token)
        const userId = req.userId;

        // Fetch all notes for the authenticated user
        const notes = await Notes.find({ user: userId, isDeleted: false }).sort({ createdAt: -1 }).populate("user", "fullName email");

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

    } catch (error) {

        console.error("Error in getAllNotes controller:", error);

        // Check if the error has a specific message and handle accordingly
        const errorMessage = error.message ? error.message : "Internal Server Error. Please try again later.";

        // Return a generic message to the client
        return res.status(500).json({
            success: false,
            message: errorMessage
        });

    }

}

// GET SINGLE NOTE CONTROLLER ------------------------------ //

export const getSingleNote = async (req, res) => {

    try {

        // Extract note ID from request parameters
        const { noteId } = req.params;

        // Extract user ID from auth middleware
        const userId = req.userId;

        // Find the note that matches the ID, belongs to the user, and is not deleted
        const note = await Notes.findOne({ _id: noteId, user: userId, isDeleted: false }).populate("user", "fullName email");

        // logs for debugging remove in production
        console.log('↓--- getSingleNote controller ---↓');
        console.log("userId : " + userId);
        console.log("note : " + note);
        console.log("↑--- getSingleNote controller ---↑")

        // If note not found, return 404 response
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found or you do not have permission to access it."
            });
        }

        // Send the note data as response
        return res.status(200).json({
            success: true,
            message: "Note retrieved successfully.",
            note
        });

    } catch (error) {

        console.error("Error in getSingleNote controller:", error);

        // Check if the error has a specific message and handle accordingly
        const errorMessage = error.message ? error.message : "Internal Server Error. Please try again later.";

        // Return a generic message to the client
        return res.status(500).json({
            success: false,
            message: errorMessage
        });

    }

};

// MARK NOTE IMPORTANT OR DEFAULT CONTROLLER --------------- //

export const markNoteImportant = async (req, res) => {

    try {

        // Extract note ID from request parameters
        const { noteId } = req.params;

        // Extract user ID from auth middleware
        const userId = req.userId;

        // Find the note that matches the ID, belongs to the user, and is not deleted
        const note = await Notes.findOne({ _id: noteId, user: userId, isDeleted: false }).populate("user", "fullName email");

        // If note not found, return 404 response
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found or you do not have permission to access it."
            });
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
            message: `Note marked ${note.isImportant ? "important" : "as default"} successfully.`,
            note
        });


    } catch (error) {

        console.error("Error in markNoteImportant controller:", error);

        // Check if the error has a specific message and handle accordingly
        const errorMessage = error.message ? error.message : "Internal Server Error. Please try again later.";

        // Return a generic message to the client
        return res.status(500).json({
            success: false,
            message: errorMessage
        });

    }

}

// UPDATE NOTE CONTROLLER ----------------------------------- //

export const updateNote = async (req, res) => {

    try {

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
            return res.status(404).json({
                success: false,
                message: "Note not found or you do not have permission to access it."
            });
        }

        // If no updates are provided, return an error
        if (!updatedTitle && !updatedDescription) {
            return res.status(400).json({
                success: false,
                message: "Please provide at least one field to update."
            });
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

    } catch (error) {

        console.error("Error in updateNote controller:", error);

        // Check if the error has a specific message and handle accordingly
        const errorMessage = error.message ? error.message : "Internal Server Error. Please try again later.";

        // Return a generic message to the client
        return res.status(500).json({
            success: false,
            message: errorMessage
        });

    }

}

// SOFT DELETE SINGLE NOTE CONTROLLER ------------------------ //

export const softDeleteNote = async (req, res) => {

    try {

        // Extract note ID from request parameters
        const { noteId } = req.params;

        // Extract user ID from auth middleware
        const userId = req.userId;

        // Find the note that matches the ID, belongs to the user, and is not already deleted
        const note = await Notes.findOne({ _id: noteId, user: userId, isDeleted: false });

        // If note not found, return 404 response
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found or already deleted."
            });
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


    } catch (error) {

        console.error("Error in softDeleteNote controller:", error);

        // Check if the error has a specific message and handle accordingly 
        const errorMessage = error.message ? error.message : "Internal Server Error. Please try again later.";

        // Return a generic message to the client
        return res.status(500).json({
            success: false,
            message: errorMessage
        });

    }

}

// SOFT DELETE ALL NOTES CONTROLLER ------------------------ //

export const softDeleteAllNotes = async (req, res) => {

    try {

        // Extract user ID from auth middleware
        const userId = req.userId;

        // Find all notes that belong to the user and are not already deleted
        const notes = await Notes.find({ user: userId, isDeleted: false });

        // If no notes found, return a message
        if (notes.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No active notes found to delete.",
            });
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

    } catch (error) {

        console.error("Error in softDeleteAllNotes controller:", error);

        // Check if the error has a specific message and handle accordingly
        const errorMessage = error.message ? error.message : "Internal Server Error. Please try again later.";

        // Return a generic message to the client
        return res.status(500).json({
            success: false,
            message: errorMessage
        });

    }

}

// RESTORE DATA FROM BIN CONTROLLER ------------------------ //

export const restoreSoftDeletedNote = async (req, res) => {

    try {

        // Extract note ID from request parameters
        const { noteId } = req.params;

        // Extract user ID from auth middleware
        const userId = req.userId;

        // Find the note that matches the ID, belongs to the user, and is deleted
        const note = await Notes.findOne({ _id: noteId, user: userId, isDeleted: true });

        // If note not found, return 404 response
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found or it's not in the recycle bin."
            });
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

    } catch (error) {

        console.error("Error in restoreSoftDeletedNote controller:", error);

        // Check if the error has a specific message and handle accordingly
        const errorMessage = error.message ? error.message : "Internal Server Error. Please try again later.";

        // Return a generic message to the client
        return res.status(500).json({
            success: false,
            message: errorMessage
        });

    }

}

// RESTORE ALL DATA FROM BIN CONTROLLER -------------------- //

export const restoreAllSoftDeletedNotes = async (req, res) => {

    try {

        // Extract user ID from auth middleware
        const userId = req.userId;

        // Find all notes that belong to the user and are already deleted
        const notes = await Notes.find({ user: userId, isDeleted: true });

        // If no notes found, return a message
        if (notes.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No deleted notes found to restore.",
            });
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

    } catch (error) {

        console.error("Error in restoreAllSoftDeletedNotes controller:", error);

        // Check if the error has a specific message and handle accordingly
        const errorMessage = error.message ? error.message : "Internal Server Error. Please try again later.";

        // Return a generic message to the client
        return res.status(500).json({
            success: false,
            message: errorMessage
        });

    }

}

// DELETE SINGLE NOTE PERMANENTLY CONTROLLER ----------------- //

export const deleteNotePermanently = async (req, res) => {

    try {

        // Extract note ID from request parameters
        const { noteId } = req.params;

        // Extract user ID from auth middleware
        const userId = req.userId;

        // Find the note that is soft deleted
        const note = await Notes.findOne({ _id: noteId, user: userId, isDeleted: true });

        // If note is not found or not in trash, return 404
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found in trash or you do not have permission to delete it."
            });
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

    } catch (error) {

        console.error("Error in deleteNotePermanently controller:", error);

        // Check if the error has a specific message and handle accordingly
        const errorMessage = error.message ? error.message : "Internal Server Error. Please try again later.";

        // Return a generic message to the client
        return res.status(500).json({
            success: false,
            message: errorMessage
        });

    }

}

// DELETE ALL NOTE PERMANENTLY CONTROLLER -------------------- //

export const deleteAllNotesPermanently = async (req, res) => {

    try {

        // Extract user ID from auth middleware
        const userId = req.userId;

        // Find all soft deleted notes of the user
        const deletedNotes = await Notes.find({ user: userId, isDeleted: true });

        // If no soft deleted notes found, return 404
        if (deletedNotes.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No notes found in trash to delete permanently."
            });
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
            message: "All soft deleted notes have been permanently deleted."
        });

    } catch (error) {

        console.error("Error in deleteAllNotesPermanently controller:", error);

        // Check if the error has a specific message and handle accordingly
        const errorMessage = error.message ? error.message : "Internal Server Error. Please try again later.";

        // Return a generic message to the client
        return res.status(500).json({
            success: false,
            message: errorMessage
        });

    }

}

// END OF FILE 