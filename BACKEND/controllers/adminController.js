import User from "../models/User.js"; // Importing User model
import Notes from "../models/Notes.js"; // Importing Notes model
import ErrorHandler from "../utils/errorHandler.js"; // Importing ErrorHandler


// GET ALL NOTES CONTROLLER ---------------------------------- //

export const getAllUsersData = async (req, res) => {

    // get all users data from database
    const users = await User.find().select("fullName username email role");

    // creating notes stats for each user
    const usersWithNoteStats = await Promise.all(

        // map through each user and get the notes stats
        users.map(async (user) => {

            // geting active notes count
            const activeNotesCount = await Notes.countDocuments({ user: user._id, isDeleted: false, });

            // geting deleted notes count
            const deletedNotesCount = await Notes.countDocuments({ user: user._id, isDeleted: true, });

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
        message: "All users data fetched successfully",
        users: usersWithNoteStats,
    });


};

// PROMOTE USER TO ADMIN CONTROLLER -------------------------- //

export const promoteUserToAdmin = async (req, res, next) => {

    // Extract user ID from request parameters
    const { id } = req.params; // User ID to promote

    //  Check if ID is provided
    if (!id) {
        return next(new ErrorHandler("User ID is required", 400));
    }

    // Find the user 
    const user = await User.findById(id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Check if user is already an admin
    if (user.role.includes("admin")) {
        return next(new ErrorHandler(`${user.fullName} is already an admin`, 400));
    }

    // Promote the user by adding 'admin' role
    user.role.push("admin");

    // Save updated user
    await user.save();

    // logs for debugging remove in production
    if (process.env.NODE_ENV === "development") {
        console.log('↓--- promoteUserToAdmin controller ---↓');
        console.log("User promoted to admin:", user);
        console.log('↑--- promoteUserToAdmin controller ---↑');
    }

    res.status(200).json({
        success: true,
        message: `User ${user.fullName} promoted to admin successfully.`,
    });

};

// PROMOTE USER TO ADMIN CONTROLLER -------------------------- //

export const promoteUserToSuperAdmin = async (req, res, next) => {

    // Extract user ID from request parameters
    const { id } = req.params; // User ID to promote

    //  Check if ID is provided
    if (!id) {
        return next(new ErrorHandler("User ID is required", 400));
    }

    // Find the user to promote
    const user = await User.findById(id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Check if user is already a superadmin
    if (user.role.includes("superadmin")) {
        return next(new ErrorHandler(`${user.fullName} is already an SUPERADMIN`, 400));
    }

    // Promote the user by adding 'superAdmin' role if we direct promote user to superadmin it also add admin role
    user.role.push(...(user.role.includes("admin") ? ["superadmin"] : ["admin", "superadmin"]));

    // Save updated user
    await user.save();

    // logs for debugging remove in production
    if (process.env.NODE_ENV === "development") {
        console.log('↓--- promoteUserToSuperAdmin controller ---↓');
        console.log("User promoted to admin:", user);
        console.log('↑--- promoteUserToSuperAdmin controller ---↑');
    }

    res.status(200).json({
        success: true,
        message: `User ${user.fullName} promoted to SUPERADMIN successfully.`,
    });

};

// DEMOTE ADMIN TO USER CONTROLLER -------------------------- //

export const demoteAdminToUser = async (req, res, next) => {

    // Extract user ID from request parameters
    const { id } = req.params; // User ID to demote

    //  Check if ID is provided
    if (!id) {
        return next(new ErrorHandler("User ID is required", 400));
    }

    // Find the user 
    const user = await User.findById(id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Check if user is already an admin
    if (!user.role.includes("admin") && !user.role.includes("superadmin")) {
        return next(new ErrorHandler(`${user.fullName} is already a user`, 400));
    }

    // Check if user is superadmin or not
    if (user.role.includes("superadmin")) {
        return next(new ErrorHandler(`${user.fullName} cannot be demoted because they are a SUPER ADMIN`, 400));
    }

    // demote the user by removing admin and superadmin role
    user.role = user.role.filter((role) => role !== "admin" && role !== "superadmin");

    // Save updated user
    await user.save();

    // logs for debugging remove in production
    if (process.env.NODE_ENV === "development") {
        console.log('↓--- demoteAdminToUser controller ---↓');
        console.log("Admin demoted to user:", user);
        console.log('↑--- demoteAdminToUser controller ---↑');
    }

    res.status(200).json({
        success: true,
        message: `${user.fullName} demoted to USER role successfully.`,
    });

};

// DEMOTE SUPERADMIN TO ADMIN CONTROLLER -------------------------- //

export const demoteSupAdmintoAdmin = async (req, res, next) => {

    // Extract user ID from request parameters
    const { id } = req.params; // User ID to demote

    //  Check if ID is provided
    if (!id) {
        return next(new ErrorHandler("User ID is required", 400));
    }

    // Find the user 
    const user = await User.findById(id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Don't allow demotion if user is superadmin
    if (user.role.includes("superadmin")) {
        return next(new ErrorHandler(`${user.fullName} cannot be demoted because they are a SUPER ADMIN`, 400));
    }

    // Check if user is already an admin
    if (user.role.includes("admin") && !user.role.includes("superadmin")) {
        return next(new ErrorHandler(`${user.fullName} is already an admin`, 400));
    }

    // demote the superadmin to admin by removing superadmin role   
    user.role = user.role.filter(role => role !== "superadmin");

    // Save updated user
    await user.save();

    // logs for debugging remove in production
    if (process.env.NODE_ENV === "development") {
        console.log('↓--- demoteAdminToUser controller ---↓');
        console.log("superAdmin demoted to admin:", user);
        console.log('↑--- demoteAdminToUser controller ---↑');
    }

    res.status(200).json({
        success: true,
        message: `${user.fullName} demoted to ADMIN role successfully.`,
    });

};

// DELETE USER CONTROLLER -------------------------- //
export const deleteUserAccount = async (req, res, next) => {

    // Extract user ID from request parameters
    const { id } = req.params; // User ID to delete

    //  Check if ID is provided
    if (!id) {
        return next(new ErrorHandler("User ID is required", 400));
    }

    // Find the user 
    const user = await User.findById(id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Check if user is already a superadmin
    if (user.role.includes("superadmin")) {
        return next(new ErrorHandler(`You can't delete ${user.fullName} because they are a Super Admin`, 400));
    }

    // Delete the user 
    await User.findByIdAndDelete(id);

    // Delete all notes of the user (both active & deleted)
    await Notes.deleteMany({ user: user._id });

    // Send email to the user informing account deletion
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: "Account Deleted",
        html: `
            <div style="font-family: Arial, sans-serif;">
                <h2>Account Deletion Notice</h2>
                <p>Dear ${user.fullName},</p>
                <p>Your account has been permanently removed due to a breach of our terms.</p>
                <p>If you believe this is a mistake, please contact our support team.</p>
                <br>
                <p>Thank you,</p>
                <p>Team</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Account deletion email sent to", user.email);
    } catch (error) {
        console.error("Failed to send email:", error);
        // Not returning error response here to avoid blocking the deletion success
    }

    // logs for debugging remove in production
    if (process.env.NODE_ENV === "development") {
        console.log('↓--- deleteUserAccount controller ---↓');
        console.log("User deleted:", user);
        console.log('↑--- deleteUserAccount controller ---↑');
    }

    res.status(200).json({
        success: true,
        message: `${user.fullName}'s account deleted successfully.`,
    });

};