import cron from "node-cron"; // Import cron for scheduling tasks
import Notes from "../models/Notes.js"; // Import the Notes model
import User from "../models/User.js";

// Cron job to delete notes
const deleteOldNotes = async () => {
    try {
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        const result = await Notes.deleteMany({
            isDeleted: true,
            deletedAt: { $lte: thirtyDaysAgo },
        });

        console.log(`Cron Job: Deleted ${result.deletedCount} old notes from recycle bin.`);
    } catch (error) {
        console.error("Error deleting old notes:", error);
    }
};


// Cron job to delete user account and their notes
const deleteOldUsersAndTheirNotes = async () => {

    // Thirty days ago timestamp
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Find users who are marked as deleted and have been in the recycle bin for more than 30 days
    const usersToDelete = await User.find({
        isAccountDeleted: true,
        deletedAt: { $lte: thirtyDaysAgo },
    });

    // Extract user IDs from the users to delete
    const userIds = usersToDelete.map(user => user._id);

    // Deleting the notes of the users
    const notesResult = await Notes.deleteMany({ user: { $in: userIds } });

    // Deleting the users
    const usersResult = await User.deleteMany({ _id: { $in: userIds } });

    // Log the results
    console.log(`Cron Job: Deleted ${usersResult.deletedCount} users and ${notesResult.deletedCount} notes.`);
};

// 🕛 Run daily at midnight
cron.schedule("0 0 0 * * *", async () => {
    console.log("🔁 Running daily cleanup cron job...");
    await deleteOldNotes();
    await deleteOldUsersAndTheirNotes();
});


