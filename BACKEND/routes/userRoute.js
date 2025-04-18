import express from "express"; // Importing express
import { register, login, logout, sendEmailVerifyOtp, verifyEmail, isUserAuthenticated, sendPassResetOtp, resetPassword, getUserData, softDeleteAccount, } from "../controllers/userController.js"; // Importing the controllers function
import userAuth from "../middleware/userAuthMiddleware.js"; // Importing User Authentication middleware
import catchAsyncError from "../middleware/catchAsyncError.js"; // Importing catchAsyncError middleware

const userRouter = express.Router(); // Created a router instance

// AUTHENTICATION USER ROUTES -------------------- //

// register route [POST]
userRouter.post("/register", catchAsyncError(register)); // 'http://localhost:3000/api/user/register'

// login route [POST]
userRouter.post("/login", catchAsyncError(login)); // 'http://localhost:3000/api/user/login'

// logout route [POST]
userRouter.post("/logout", logout); // 'http://localhost:3000/api/user/logout'

// send verify otp route [POST]
userRouter.post("/send-verify-otp", userAuth, catchAsyncError(sendEmailVerifyOtp)); // 'http://localhost:3000/api/user/send-verify-otp'

// verify email route [POST]
userRouter.post("/verify-email", userAuth, catchAsyncError(verifyEmail)); // 'http://localhost:3000/api/user/verify-email'

// check user authenticated [POST]
userRouter.post("/is-user-auth", userAuth, isUserAuthenticated); // 'http://localhost:3000/api/user/is-user-auth'

// send password reset otp route [POST]
userRouter.post("/send-pass-reset-otp", catchAsyncError(sendPassResetOtp)); // 'http://localhost:3000/api/usersend-pass-reset-otp'

// reset password route [POST]
userRouter.post("/reset-password", catchAsyncError(resetPassword)); // 'http://localhost:3000/api/user/reset-password'

// get user data route [GET]
userRouter.get("/get-user-data", userAuth, catchAsyncError(getUserData)); // 'http://localhost:3000/api/user/get-user-data'

// DELETE USER ACOUNT [DELETE]
userRouter.delete("/soft-delete-account", userAuth, catchAsyncError(softDeleteAccount)); // 'http://localhost:3000/api/user/soft-delete-account'

export default userRouter; // exporting the userRouter

