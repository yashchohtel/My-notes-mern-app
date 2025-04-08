import express from 'express'; // Importing express framework
import userAuth from '../middleware/userAuthMiddleware.js';// Importing user authentication middleware
import authorizeRoles from '../middleware/authorizeRoles.js'; // Importing authorizeRoles middleware
import catchAsyncError from '../middleware/catchAsyncError.js'; // Importing catchAsyncError middleware
import { demoteAdminToUser, getAllUsersData, promoteUserToAdmin, promoteUserToSuperAdmin } from '../controllers/adminController.js'; // Importing the Controller function from adminController

const superAdminRouter = express.Router(); // Creating an instance of Express Router

// ADMIN OPERATION ROUTES -------------------- //

// Get all users data route [GET] | 'http://localhost:3000/api/superAdmin/get-all-users'
superAdminRouter.get('/get-all-users', userAuth, authorizeRoles("superadmin"), catchAsyncError(getAllUsersData));

// Promote user to admin route [PATCH] | 'http://localhost:3000/api/superAdmin//promote-user-to-admin/:id'
superAdminRouter.patch('/promote-user-to-admin/:id', userAuth, authorizeRoles("superadmin"), catchAsyncError(promoteUserToAdmin));

// Promote user to superAdmin route [PATCH] | 'http://localhost:3000/api/superAdmin//promote-user-to-superAdmin/:id'
superAdminRouter.patch('/promote-user-to-superAdmin/:id', userAuth, authorizeRoles("superadmin"), catchAsyncError(promoteUserToSuperAdmin));

// demote admin to user route [PATCH] | 'http://localhost:3000/api/superAdmin/demote-admin-to-user/:id'
superAdminRouter.patch('/demote-admin-to-user/:id', userAuth, authorizeRoles("superadmin"), catchAsyncError(demoteAdminToUser));

export default superAdminRouter; // Exporting the superAdminRouter instance