import Notes from "../models/Notes.js"; // Import Notes model
import User from "../models/User.js"; // Import User model

// CREATE NOTE CONTROLLER ------------------- //

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






















// {
//     "title" : "note1",
//     "description" : "description1"
// }