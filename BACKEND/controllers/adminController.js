import User from "../models/User.js"; // Importing User model
import Notes from "../models/Notes.js"; // Importing Notes model
import ErrorHandler from "../utils/errorHandler.js"; // Importing ErrorHandler


export const getAllUsersData = async (req, res) => {

    // get all users data from database
    const users = await User.find().select("fullName username email role");

    // creating notes stats for each user
    const usersWithNoteStats = await Promise.all(

        // map through each user and get the notes stats
        users.map(async (user) => {

            // geting active notes count
            const activeNotesCount = await Notes.countDocuments({ user: user._id, isDeleted: false,});

            // geting deleted notes count
            const deletedNotesCount = await Notes.countDocuments({ user: user._id, isDeleted: true,});

            return {
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                role: user.role,
                activeNotes: activeNotesCount,
                deletedNotes: deletedNotesCount,
            };
        })
    );

    // logs for debugging remove in production
    if (process.env.NODE_ENV === "development") {
        console.log('↓--- getAllUsersData controller ---↓');
        console.log("Users with notes stats:", usersWithNoteStats);
        console.log('↑--- getAllUsersData controller ---↑');
    }

    res.status(200).json({
        success: true,
        users: usersWithNoteStats,
    });


};