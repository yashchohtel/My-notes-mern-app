// Global error handling middleware
const errorMiddleware = (err, req, res, next) => {

    // Set default status code and message if not provided
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Send error response
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });

};

export default errorMiddleware; // Export the error middleware
