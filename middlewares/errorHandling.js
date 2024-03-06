export const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

export const errorHanlder = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`;
        err = createError(message, 400);
    }
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = createError(message, 400);
    }
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again!`;
        err = createError(message, 400);
    }
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is expired, Try again!`;
        err = createError(message, 400);
    }
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
