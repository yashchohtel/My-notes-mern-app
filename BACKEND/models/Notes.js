import mongoose from "mongoose"; // Import mongoose

// Create a notes schema
const notesSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },

    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    isImportant: {
        type: Boolean,
        default: false,
    },

    isDeleted: {
        type: Boolean,
        default: false,
    },

    deletedAt: {
        type: Date,
        default: null,
    },

}, { timestamps: true });

// Create a notes model
const Notes = mongoose.model("Notes", notesSchema);

// Export the notes model
export default Notes;