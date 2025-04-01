import User from "../../models/User.js"; // Importing the User model
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // Import JWT for authentication
import transporter from "../Config/emailService.js";  // Import email service for sending emails
import dotenv from "dotenv"; // Import dotenv to use environment variables

dotenv.config(); // Load environment variables from .env file


// REGISTRATION CONTROLLER -------------------- //

export const register = async (req, res) => {

    try {

        // Extract user details from request body
        const { fullName, username, email, password } = req.body;

        // Check if all required fields are provided
        if (!fullName || !username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing user details"
            });
        }

        // Check if a user with the given username already exists
        const existingUsername = await User.findOne({ username });

        if (existingUsername) {
            return res.status(400).json({
                success: false,
                message: "username already exists"
            });
        }

        // Check if the email already exists in the database
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                message: "Email already exists",
                success: false
            });
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

        // Generate a JWT token for the new user expiring in 10 days
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
        }

        // logs for debugging remove in production
        console.log('↓--- register controller ---↓');
        console.log("token : " + token); // 
        console.log(`User created: ${savedUser}`);
        console.log('↑--- register controller ---↑');

        // Send success response with user details and token
        return res.status(201).json({
            success: true,
            message: "Sign-up successful",
            user: {
                id: savedUser._id,
                fullName: savedUser.fullName,
                username: savedUser.username,
                email: savedUser.email,
            }
        });

    } catch (error) {

        console.error("Error in register controller:", error);

        // Check if the error has a specific message and handle accordingly
        const errorMessage = error.message ? error.message : "Internal Server Error. Please try again later.";

        // Return a generic message to the client
        return res.status(500).json({
            success: false,
            message: errorMessage
        });

    }

}

// LOGIN CONTROLLER -------------------------- //

export const login = async (req, res) => {

    try {

        // Extracting data from body, "identifier" can be either email or username
        const { identifier, password } = req.body;

        // Find user by email or username
        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        // Checking user exists or not
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password", success: false });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password", success: false });
        }

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
        console.log('↓--- login controller ---↓');
        console.log("token : " + token); //
        console.log(`User logged in: ${user}`);
        console.log('↑--- login controller ---↑');

        // Send success response with user details and token
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
            }
        });

    } catch (error) {

        console.error("Error in login controller:", error);

        // Check if the error has a specific message and handle accordingly
        const errorMessage = error.message ? error.message : "Internal Server Error. Please try again later.";

        // Return a generic message to the client
        return res.status(500).json({
            success: false,
            message: errorMessage
        });

    }

}

// LOGOUT CONTROLLER -------------------------- //

export const logout = async (req, res) => {
    try {

        // Clear the token cookie to log out the user
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        });

        // logs for debugging remove in production
        console.log('↓--- logout controller ---↓');
        console.log("User logged out");
        console.log('↑--- logout controller ---↑');

        // Send success response
        return res.status(200).json({
            message: "Logout successful",
            success: true
        });

    } catch (error) {

        console.error("Error in logout controller:", error);

        // Check if the error has a specific message and handle accordingly
        const errorMessage = error.message ? error.message : "Internal Server Error. Please try again later.";

        // Return a generic message to the client
        return res.status(500).json({
            success: false,
            message: errorMessage
        });

    }
}


