import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // Import JWT for authentication
import transporter from "../Config/emailService.js";  // Import email service for sending emails
import dotenv from "dotenv"; // Import dotenv to use environment variables
import User from "../models/User.js"; // Import User model 
import ErrorHandler from "../utils/errorHandler.js"; // Import custom error handler
import cloudinary from "../Config/cloudinary.js";

dotenv.config(); // Load environment variables from .env file

// REGISTRATION CONTROLLER ------------------- //

export const register = async (req, res, next) => {

    // Extract user details from request body
    const { fullName, username, email, password } = req.body;

    // Check if all required fields are provided
    if (!fullName || !username || !email || !password) {
        return next(new ErrorHandler("Missing user details", 400));
    }

    // Check if a user with the given username already exists
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
        return next(new ErrorHandler("username already exists", 400));
    }

    // Check if the email already exists in the database
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
        return next(new ErrorHandler("Email already exists", 400));
    }

    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance with the hashed password
    const newUser = new User({
        fullName,
        username,
        email,
        password: hashedPassword // Storing hashed password for security
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Generate a JWT token for the new user expiring in 7 days
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Store the token in an HTTP-only cookie for security
    res.cookie('token', token, {
        httpOnly: true, // Prevents client-side access to the cookie
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // Adjust CORS settings
        maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expires in 7 days
    });

    // Sending welcome email to user email with the Nodemailer and Brevo
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Welcome to us",
        text: `Welcome to us your account has been created with email id: ${email}`,
        html: `<h3>Welcome, ${fullName}!</h3>
         <p>Your account has been successfully created.</p>
         <p>We are happy to have you onboard!</p>
         <p><b>Email:</b> ${email}</p>`
    }

    // Sending email using the transporter instance with another try-catch block to handle errors
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);
    } catch (emailError) {
        console.error("Error sending email:", emailError);
        return next(new ErrorHandler("Failed to send OTP email", 500));
    }

    // logs for debugging remove in production
    if (process.env.NODE_ENV === "development") {
        console.log('↓--- register controller ---↓');
        console.log("token : " + token); // 
        console.log(`User created: ${savedUser}`);
        console.log('↑--- register controller ---↑');
    }

    // Send success response with user details and token
    return res.status(201).json({
        success: true,
        message: "Sign-up successful",
        user: {
            id: savedUser._id,
            fullName: savedUser.fullName,
            username: savedUser.username,
            email: savedUser.email,
            isAccountVerified: savedUser.isAccountVerified,
            role: savedUser.role,
        }
    });

}

// LOGIN CONTROLLER -------------------------- //

export const login = async (req, res, next) => {

    // Extracting data from body, "identifier" can be either email or username
    const { identifier, password } = req.body;

    // Find user by email or username
    const user = await User.findOne({
        $or: [{ email: identifier }, { username: identifier }]
    });

    // Checking user exists or not
    if (!user) {
        return next(new ErrorHandler("Invalid credentials", 404));
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new ErrorHandler("Invalid credentials", 400));
    }

    // flag to check if user is soft deleted or not
    let isDeletedFlag = false;

    // Check if user is soft deleted or not
    if (user.isAccountDeleted) {

        // Restore account
        user.isAccountDeleted = false;
        user.deletedAt = null;
        await user.save();

        // Set is deleted flag to true if used was soft deleted
        isDeletedFlag = true;

    };

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Store the token in an HTTP-only cookie for security
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expires in 7 days
    });

    // logs for debugging remove in production
    if (process.env.NODE_ENV === "development") {
        console.log('↓--- login controller ---↓');
        console.log("token : " + token); //
        console.log(`User logged in: ${user}`);
        console.log('↑--- login controller ---↑');
    }

    // Send success response with user details and token
    return res.status(200).json({
        success: true,
        message: `${isDeletedFlag ? "Welcome back you account has beed restored!" : "Login successful"}`,
        user: {
            id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            isAccountVerified: user.isAccountVerified,
            role: user.role,
        }
    });

}

// LOGOUT CONTROLLER ------------------------- //

export const logout = async (req, res, next) => {
    try {

        // Clear the token cookie to log out the user
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        });

        // logs for debugging remove in production
        if (process.env.NODE_ENV === "development") {
            console.log('↓--- logout controller ---↓');
            console.log("User logged out");
            console.log('↑--- logout controller ---↑');
        }

        // Send success response
        return res.status(200).json({
            message: "Logout successful",
            success: true
        });

    } catch (error) {

        next(new ErrorHandler(error.message || "Logout failed", 500));

    }
}

// DELETE USER ACCOUNT CONTROLLER ------------- //
export const softDeleteAccount = async (req, res, next) => {

    // Extract userId from req.userId (token will send the id by req.userId from userAuth middleware)
    const userId = req.userId;

    // Find user by ID in database
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Check if user is already marked for deletion
    if (user.isAccountDeleted) {
        return next(new ErrorHandler("Your account is already marked for deletion", 400));
    }

    // Mark user as deleted and set deletion date
    user.isAccountDeleted = true;
    user.deletedAt = new Date();

    // Save the updated user 
    await user.save();

    // Clear the token cookie to log out the user
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
    });

    // logs for debugging remove in production
    if (process.env.NODE_ENV === "development") {
        console.log('↓--- softDeleteAccount controller ---↓');
        console.log("User details:", user);
        console.log('↑--- softDeleteAccount controller ---↑');
    }

    return res.status(200).json({
        success: true,
        message: "We'll delete your account in 30 days. Log in to undo."
    });

}

// SEND VERIFY OTP CONTROLLER ---------------- //

export const sendEmailVerifyOtp = async (req, res, next) => {

    // Extract userId from req.userId (token will send the id by req.userId from userAuth middleware)
    const userId = req.userId;

    console.log(userId);

    // Find user by ID in database
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Check if user is already verified
    if (user.isAccountVerified) {
        return next(new ErrorHandler("Account already verified", 400));
    }

    // Generate a 6-digit random OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // Store OTP in the user document along with expiration time (24 hours)
    user.emailVerifyOtp = otp;
    user.emailVerifyOtpExpiredAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Save the updated user data in the database
    await user.save();

    // Configure email options
    const mailOptions = {
        from: process.env.SENDER_EMAIL, // Sender email (from environment variable)
        to: user.email, // Recipient email
        subject: "Account Verification OTP", // Email subject
        text: `Your verification OTP is: ${otp}`, // Email body,
        html: `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                <h2 style="color: #333;">Account Verification</h2>
                <p>Your verification OTP is:</p>
                <h3 style="color: #007BFF;">${otp}</h3>
                <p>Please enter this OTP to verify your account.</p>
                <p>OTP will expire in 24 hours.</p>
            </div>`,
    }

    // Sending email using the transporter instance with another try-catch block to handle errors
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);
    } catch (emailError) {
        console.error("Error sending email:", emailError);
        return next(new ErrorHandler("Failed to send OTP email", 500));
    }

    // logs for debugging remove in production
    if (process.env.NODE_ENV === "development") {
        console.log('↓--- sendEmailVerifyOtp controller ---↓');
        console.log("User details:", user);
        console.log("OTP sent to email:", user.email); //
        console.log('↑--- sendEmailVerifyOtp controller ---↑');
    }

    // Success response
    return res.status(200).json({
        success: true,
        message: `OTP sent to your registered email`
    });

}

// VERIFY EMAIL CONTROLLER ------------------- //

export const verifyEmail = async (req, res, next) => {
    // Extract otp from request body
    const { otp } = req.body;

    // Extract userId from req.userId (token will send the id by req.userId from userAuth middleware)
    const userId = req.userId;

    // Check if userId and OTP are provided
    if (!userId || !otp) {
        return next(new ErrorHandler("Missing details: userId and OTP are required", 400));
    }

    // Find user by ID in database
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Check if user is already verified
    if (user.isAccountVerified) {
        return next(new ErrorHandler("Account already verified", 400));
    }

    // Check if OTP is valid and not expired
    if (user.emailVerifyOtp !== otp || Date.now() > user.emailVerifyOtpExpiredAt.getTime()) {
        return next(new ErrorHandler("Invalid or expired OTP", 400));
    }

    // Update user's account verification status
    user.isAccountVerified = true;
    user.emailVerifyOtp = ""; // Clear OTP after successful verification
    user.emailVerifyOtpExpiredAt = null; // Clear OTP expiration time

    // Save the updated user data in the database
    await user.save();

    // logs for debugging remove in production
    if (process.env.NODE_ENV === "development") {
        console.log('↓--- verifyEmail controller ---↓');
        console.log("User details:", user);
        console.log('↑--- verifyEmail controller ---↑');
    }

    // Success response
    return res.status(200).json({
        success: true,
        message: "Account verified successfully",
        user: {
            id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            isAccountVerified: user.isAccountVerified,
            role: user.role,
        }
    });

};

// CHECK USER AUTHENTICATED CONTROLLER ------- //

export const isUserAuthenticated = async (req, res, next) => {

    try {

        // send success response
        return res.status(200).json({
            success: true,
            message: "User is authenticated",
        });

    } catch (error) {

        return next(new ErrorHandler("Something went wrong", 500));

    }

}

// SEND PASSWORD RESET OTP CONTROLLER ------- //

export const sendPassResetOtp = async (req, res, next) => {

    // Extract email from request body
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
        return next(new ErrorHandler("Email is required", 400));
    }

    // Find user by email in database
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Generate a 6-digit random OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // Hash the OTP before storing
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);

    // Store OTP in the user document along with expiration time (10 minutes)
    user.passwordResetOtp = hashedOtp;
    user.passwordResetOtpExpiredAt = new Date(Date.now() + 10 * 60 * 1000);

    // Save the updated user data in the database
    const savedUser = await user.save();

    // Configure email options
    const mailOptions = {
        from: process.env.SENDER_EMAIL, // Sender email (from environment variable)
        to: user.email, // Recipient email
        subject: "Password Reset OTP", // Email subject
        html: `
                <div style="font-family: Arial, sans-serif; text-align: center;">
                    <h3>Password Reset Request</h3>
                    <p>Your OTP for resetting the password is:</p>
                    <h2 style="color: #ff6600;">${otp}</h2>
                    <p>This OTP will expire in <strong>10 minutes</strong>.</p>
                    <p>If you didn't request this, please ignore this email.</p>
                </div>
            `
    };

    // Sending email using the transporter instance with another try-catch block to handle errors
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);
    } catch (emailError) {
        console.error("Error sending email:", emailError);
        return next(new ErrorHandler("Failed to send OTP email. Please try again later.", 500));
    }

    // logs for debugging remove in production
    if (process.env.NODE_ENV === "development") {
        console.log('↓--- sendPassResetOtp controller ---↓');
        console.log("User details:", savedUser);
        console.log("OTP sent to email:", user.email); //
        console.log('↑--- sendPassResetOtp controller ---↑');
    }

    // Success response
    return res.status(200).json({
        success: true,
        message: `OTP sent to your registered email`
    });


}

// RESET PASSWORD CONTROLLER --------------- //

export const resetPassword = async (req, res, next) => {

    // Extract email, OTP, and new password from request body
    const { email, otp, newPassword } = req.body;

    // Validate input fields
    if (!email || !otp || !newPassword) {
        return next(new ErrorHandler("Email, OTP, and new password are required", 400));
    }

    // Find user by email
    const user = await User.findOne({ email });

    // If user does not exist
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Check if OTP is expired
    if (Date.now() > user.passwordResetOtpExpiredAt.getTime()) {
        return next(new ErrorHandler("OTP has expired", 400));
    }

    // Compare the entered OTP with the hashed OTP stored in the database
    const isOtpValid = await bcrypt.compare(otp, user.passwordResetOtp);

    if (!isOtpValid) {
        return next(new ErrorHandler("Invalid OTP", 400));
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;

    // Clear OTP and expiry
    user.passwordResetOtp = "";
    user.passwordResetOtpExpiredAt = null;

    // Save updated user data
    const savedUser = await user.save();

    // logs for debugging remove in production
    if (process.env.NODE_ENV === "development") {
        console.log('↓--- resetPassword controller ---↓');
        console.log("User details:", savedUser);
        console.log('↑--- resetPassword controller ---↑');
    }

    // Success response
    return res.status(200).json({
        success: true,
        message: "Password reset successful.",
    });

}

// GET USER DATA CONTROLLER ---------------- //

export const getUserData = async (req, res, next) => {

    // Extract userId from req.userId (token will send the id by req.userId from userAuth middleware)
    const userId = req.userId;

    // Find user by ID in database
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // logs for debugging remove in production
    if (process.env.NODE_ENV === "development") {
        console.log('↓--- getUserData controller ---↓');
        console.log("User details:", user);
        console.log('↑--- getUserData controller ---↑');
    }

    // Success response
    return res.status(200).json({
        success: true,
        message: "User data retrieved successfully",
        user: {
            id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            isAccountVerified: user.isAccountVerified,
            role: user.role,
        }
    });

}

// UPLOAD PROFILE PICTURE ---------------- //
export const uploadUserProfile = async (req, res, next) => {

    // Extract userId from req.userId (token will send the id by req.userId from userAuth middleware)
    const userId = req.userId;

    // 1. Agar file nahi hai
    if (!req.file) {
        return next(new ErrorHandler("No file uploaded", 400));
    }

    // 2. Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {

        cloudinary.uploader.upload_stream({ folder: "NOTENEST_profile_photos", resource_type: "image", }, (error, result) => {

            // if error
            if (error) return reject(error);

            // if success
            resolve(result);

        }).end(req.file.buffer); // Multer ne memory me image rakhi hoti hai

    });

    // 3. Find user
    const user = await User.findById(userId);
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // 4. (Optional) Purani image delete karo agar ho to
    if (user.avatar && user.avatar.public_id) {
        await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    // 5. Save new image info in user
    user.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
    };

    await user.save();

    res.status(200).json({
        success: true,
        message: "Profile photo uploaded successfully",
        avatar: user.avatar,
    });

}






















// END OF FILE