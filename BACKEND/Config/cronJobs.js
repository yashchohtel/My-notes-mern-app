import cron from "node-cron"; // Import cron for scheduling tasks
import Notes from "../models/Notes.js"; // Import the Notes model

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

// Run cron job every day at midnight
cron.schedule("*/1 * * * *", deleteOldNotes);