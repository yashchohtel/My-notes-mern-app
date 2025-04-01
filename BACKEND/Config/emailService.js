import nodemailer from "nodemailer"; // Import Nodemailer for sending emails
import dotenv from "dotenv"; // Import dotenv to use environment variables

dotenv.config(); // Load environment variables from .env file

// Create a transporter instance for SMTP configuration
const transporter = nodemailer.createTransport({

    host: "smtp-relay.brevo.com", // SMTP server
    port: 587, // SMTP port (587 for TLS)
    secure: false, // False for STARTTLS, true for SSL
    auth: {
        user: process.env.SMTP_USER, // SMTP username (from env)
        pass: process.env.BREVO_SMTP_KEY, // SMTP password (from env)
    },

});

// Export the transporter instance 
export default transporter; 
