import express from "express"; // Importing express
import { register, login, logout, sendVerifyOtp } from "../controllers/userController.js"; // Importing the controllers function
import userAuth from "../middleware/userAuthMiddleware.js"; // Importing User Authentication middleware

const userRouter = express.Router(); // Created a router instance

// AUTHENTICATION USER ROUTES -------------------- //

// register route [POST]
userRouter.post("/register", register); // 'http://localhost:3000/api/user/register'

// login route [POST]
userRouter.post("/login", login); // 'http://localhost:3000/api/user/login'

// logout route [POST]
userRouter.post("/logout", logout); // 'http://localhost:3000/api/user/logout'

// send verify otp route [POST]
userRouter.post("/send-verify-otp", userAuth, sendVerifyOtp); // 'http://localhost:3000/api/user/send-verify-otp'


export default userRouter; // exporting the userRouter