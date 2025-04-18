import jwt from "jsonwebtoken"; // Importing JWT

// User Authentication middleware
const userAuth = (req, res, next) => {

    try {

        // Extract token from cookies
        const { token } = req.cookies;

        // If token is missing, return unauthorized response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized. Please log in again."
            });
        }

        // Verify and decode the token
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        // logs for debugging remove in production
        if (process.env.NODE_ENV === "development") {
            console.log('↓--- auth middleware ---↓');
            console.log("Token details:", token);
            console.log("DecodedToken details:", tokenDecode);
            console.log("DecodedToken userId:", tokenDecode.id);
            console.log('↑--- auth middleware ---↑');
        }

        // Check if the token contains a valid user ID
        if (!tokenDecode.id) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized. Please log in again."
            });
        }

        // Store userId in request object 
        req.userId = tokenDecode.id;

        // Proceed to the next middleware
        next();

    } catch (error) {

        // Handle errors (e.g., invalid token)
        return res.status(500).json({
            success: false,
            message: "Authentication failed. " + error.message
        });

    }

};

export default userAuth; // exporting the userAuth middleware