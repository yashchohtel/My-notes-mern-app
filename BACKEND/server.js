// Import required modules
import express from "express"; // Express framework for building APIs
import cors from "cors"; // Middleware to enable CORS (Cross-Origin Resource Sharing)
import dotenv from "dotenv"; // Import dotenv for environment variables
import cookieParser from "cookie-parser"; // Import cookieParser 
import connectDB from "./Config/dataBase.js"; // Import the function to connect to MongoDB
import userRouter from "./routes/userRoute.js"; // Import user routes
import notesRouter from "./routes/notesRoute.js";  // Import notes routes
import "./Config/cronJobs.js"; // Import cron jobs for scheduled tasks

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// -------------------- Middleware -------------------- //

// Enable JSON parsing for request bodies
app.use(express.json());

// Enable CORS to allow frontend to communicate with backend
app.use(cors({
    origin: "http://localhost:5173", // Allow frontend origin
    credentials: true // Allow sending cookies
}));

// Middleware to parse cookies from incoming requests
app.use(cookieParser());

// -------------------- Connect to MongoDB -------------------- //

// Making the connection with MongoDB
connectDB(); // Call the function to connect to MongoDB

// -------------------- Routes -------------------- //

// User routes `/api/auth`
app.use("/api/user", userRouter); // Use userRouter for user-related routes

// Notes routes `/api/notes`
app.use("/api/notes", notesRouter); // Uncomment when notesRouter is defined


// -------------------- Server Configuration -------------------- //

// Define PORT from environment variables or use default 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen for requests
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

