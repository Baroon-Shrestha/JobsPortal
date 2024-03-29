import { asyncErrorHandling } from "./asyncErrorHandling.js";
import { createError, errorHanlder } from "./errorHandling.js";
import jwt from "jsonwebtoken";
import { user } from "../models/userModel.js";

export const isAuthorized = asyncErrorHandling(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return errorHanlder(createError("You are not authorized", 400), req, res);
    }

    try {
        const decodedId = jwt.verify(token, process.env.JWT_KEY);
        req.user = await user.findById(decodedId.id);
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return errorHanlder(createError("Invalid token", 401), req, res);
        } else {
            return errorHanlder(createError("Internal Server Error", 500), req, res);
        }
    }
});
