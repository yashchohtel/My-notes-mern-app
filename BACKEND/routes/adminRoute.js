import express from 'express'; // Importing express framework
import userAuth from '../middleware/userAuthMiddleware.js';// Importing user authentication middleware
import authorizeRoles from '../middleware/authorizeRoles.js'; // Importing authorizeRoles middleware
import catchAsyncError from '../middleware/catchAsyncError.js'; // Importing catchAsyncError middleware
import { getAllUsersData } from '../controllers/adminController.js'; // Importing the Controller function from adminController

const adminRouter = express.Router(); // Creating an instance of Express Router

// ADMIN OPERATION ROUTES -------------------- //

// Get all users data route [GET]
adminRouter.get('/get-all-users', userAuth, authorizeRoles("admin", "superadmin"), catchAsyncError(getAllUsersData));
// 'http://localhost:3000/api/admin/get-all-users'

export default adminRouter; // Exporting the adminRouter instance