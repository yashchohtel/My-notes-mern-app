import express from 'express'; // Importing express framework
import userAuth from '../middleware/userAuthMiddleware.js';// Importing user authentication middleware
import authorizeRoles from '../middleware/authorizeRoles.js'; // Importing authorizeRoles middleware
import catchAsyncError from '../middleware/catchAsyncError.js'; // Importing catchAsyncError middleware
import { getAllUsersData } from '../controllers/adminController.js'; // Importing the Controller function from adminController

const superAdminRouter = express.Router(); // Creating an instance of Express Router

// ADMIN OPERATION ROUTES -------------------- //

// Get all users data route [GET]
superAdminRouter.get('/get-all-users', userAuth, authorizeRoles("superadmin"), catchAsyncError(getAllUsersData)); 
// 'http://localhost:3000/api/superAdmin/get-all-users'


export default superAdminRouter; // Exporting the superAdminRouter instance