import express from "express"; // Importing express
import { register } from "../controllers/userController.js"; // Importing the controllers function

const userRouter = express.Router(); // Created a router instance

// AUTHENTICATION USER ROUTES -------------------- //

// register route [POST]
authRouter.post("/register", register); // 'http://localhost:3000/api/user/register'


export default userRouter; // exporting the userRouter