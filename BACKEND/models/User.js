import mongoose from "mongoose"; // Import mongoose

// Create a user schema
const userSchema = new mongoose.Schema({

    profileImage: {
        type: String,
        default: "",
    },

    fullName: {
        type: String,
        required: [true, "Full Name is required"],
        trim: true,
    },

    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
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

    role: {
        type: [String],
        enum: ["user", "admin", "superadmin"],
        default: ["user"],
    },

    isAccountDeleted: {
        type: Boolean,
        default: false
    },

    deletedAt: {
        type: Date,
        default: null
    }

}, { timestamps: true });

// Create a user model
const User = mongoose.model("User", userSchema);

// Export the user model
export default User; 