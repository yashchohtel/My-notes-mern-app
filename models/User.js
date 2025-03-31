import mongoose from "mongoose"; // Import mongoose

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
    },

    fullName: {
        type: String,
        required: [true, "Full Name is required"],
        trim: true,
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: [true, "Password is required"],
    },

    isAccountVerified: {
        type: Boolean,
        default: false
    },

    emailVerifyOtp: {
        type: String,
        default: ""
    },

    emailVerifyOtpExpiredAt: {
        type: Date,
        default: null
    },

    passwordResetOtp: {
        type: String,
        default: ""
    },

    passwordResetOtpExpiredAt: {
        type: Date,
        default: null
    },

    notes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Task"
        }
    ]

}, { timestamps: true });

// Create a user model
const User = mongoose.model("User", userSchema); 

// Export the user model
export default User; 