import User from "../models/User.js"; // Importing User model
import ErrorHandler from "../utils/errorHandler.js"; // Importing ErrorHandler

// Middleware function to authorize roles
const authorizeRoles = (...allowedRoles) => {

    return async (req, res, next) => {

        try {

            console.log(req.userId);

            // Check if userId is present in request
            if (!req.userId) {
                return next(new ErrorHandler("Unauthorized! Please login again.", 401));
            }

            // Fetch user data from DB
            const user = await User.findById(req.userId);
            if (!user) {
                return next(new ErrorHandler("User not found", 404));
            }

            // ✅ user.role is an array now
            const hasAccess = user.role.some((role) => allowedRoles.includes(role));

            // logs for debugging remove in production
            if (process.env.NODE_ENV === "development") {
                console.log('↓--- role auth middleware ---↓');
                console.log("loged User role", user.role);
                console.log("Role allowed", allowedRoles);
                console.log("user has access", hasAccess);
                console.log("loged User id", user._id);
                console.log("loged User name", user.fullName);
                console.log('↑--- role auth middleware ---↑');
            }

            // Check if user role is allowed
            if (!hasAccess) {
                return next(new ErrorHandler(`Access denied! Roles [${user.role.join(", ")}] are not permitted for this route.`, 403));
            }

            req.user = user;
            next();

        } catch (error) {

            next(new ErrorHandler(error.message || "Server Error", 500));

        }

    };

};

export default authorizeRoles; // Exporting the authorizeRoles middleware

