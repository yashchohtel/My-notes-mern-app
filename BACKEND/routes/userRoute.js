import express from "express"; // Importing express
import { register, login, logout, sendEmailVerifyOtp, verifyEmail, isUserAuthenticated, sendPassResetOtp, resetPassword, getUserData, softDeleteAccount, uploadUserProfile, deleteUserProfile, changeUsername, changeFullName, } from "../controllers/userController.js"; // Importing the controllers function
import userAuth from "../middleware/userAuthMiddleware.js"; // Importing User Authentication middleware
import catchAsyncError from "../middleware/catchAsyncError.js"; // Importing catchAsyncError middleware
import upload from "../middleware/multer.js";

const userRouter = express.Router(); // Created a router instance

// AUTHENTICATION USER ROUTES -------------------- //

// register route [POST]
userRouter.post("/register", catchAsyncError(register)); // 
// 'http://localhost:3000/api/user/register'

// login route [POST]
userRouter.post("/login", catchAsyncError(login)); // 
// 'http://localhost:3000/api/user/login'

// logout route [POST]
userRouter.post("/logout", logout); // 
// 'http://localhost:3000/api/user/logout'

// send verify otp route [POST]
userRouter.post("/send-verify-otp", userAuth, catchAsyncError(sendEmailVerifyOtp)); // 
// 'http://localhost:3000/api/user/send-verify-otp'

// verify email route [POST]
userRouter.post("/verify-email", userAuth, catchAsyncError(verifyEmail)); // 
// 'http://localhost:3000/api/user/verify-email'

// check user authenticated [POST]
userRouter.post("/is-user-auth", userAuth, isUserAuthenticated); // 
// 'http://localhost:3000/api/user/is-user-auth'

// send password reset otp route [POST]
userRouter.post("/send-pass-reset-otp", catchAsyncError(sendPassResetOtp)); // 
// 'http://localhost:3000/api/usersend-pass-reset-otp'

// reset password route [POST]
userRouter.post("/reset-password", catchAsyncError(resetPassword)); // 
// 'http://localhost:3000/api/user/reset-password'

// change username route [PATCH]
userRouter.patch("/change-username", userAuth, catchAsyncError(changeUsername)); // 
// 'http://localhost:3000/api/user/change-username'

// change fullname route [PATCH]
userRouter.patch("/change-fullname", userAuth, catchAsyncError(changeFullName)); // 
// 'http://localhost:3000/api/user/change-fullname'

// get user data route [GET]
userRouter.get("/get-user-data", userAuth, catchAsyncError(getUserData)); // 
// 'http://localhost:3000/api/user/get-user-data'

// DELETE USER ACOUNT [DELETE]
userRouter.delete("/soft-delete-account", userAuth, catchAsyncError(softDeleteAccount)); // 
// 'http://localhost:3000/api/user/soft-delete-account'

// UPLOAD PROFILE PICTURE [POST]
userRouter.post("/upload-profile-pic", userAuth, upload.single("profilePic"), catchAsyncError(uploadUserProfile)); // 
// 'http://localhost:3000/api/user/upload-profile-pic'

// DELETE PROFILE PICTURE [POST]
userRouter.delete("/delete-profile-pic", userAuth, catchAsyncError(deleteUserProfile)); // 
// 'http://localhost:3000/api/user/delete-profile-pic'

export default userRouter; // exporting the userRouter

