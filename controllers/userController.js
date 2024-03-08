import { asyncErrorHandling } from "../middlewares/asyncErrorHandling.js"
import { errorHanlder, createError } from "../middlewares/errorHandling.js"
import { user } from "../models/userModel.js"
import { getToken } from "../utils/token.js";

export const register = asyncErrorHandling(async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return errorHanlder(createError("fill the form"), req, res)
    }
    const existingUser = await user.findOne({ email });
    if (existingUser) {
        return errorHanlder(createError("The email already exists"), req, res)
    }
    const newUser = await user.create({ email, password, role });
    getToken(newUser, 200, res, "user regestration and token generation successfull")
    console.log("User information:", req.user);
});


export const login = asyncErrorHandling(async (req, res) => {
    const { email, password, role } = req.body
    if (!email || !password || !role) {
        return errorHanlder(createError("could not find data"), req, res)
    }
    const userInfo = await user.findOne({ email }).select("+password")
    if (!userInfo) {
        return errorHanlder(createError("email or password is incorrect"), req, res)
    }
    const confirmPass = await userInfo.comparePassword(password)
    if (!confirmPass) {
        return errorHanlder(createError("email or password is incorrect"), req, res)
    }
    if (userInfo.role !== role) {
        return errorHanlder(createError("role is invalid"), req, res);
    }
    getToken(userInfo, 200, res, "user login process and token generation successfull")
})

export const logout = asyncErrorHandling(async (req, res) => {
    res.status(201).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "logged out",
    })
})

export const getLoggeedInUser = asyncErrorHandling(async (req, res) => {
    const loggedInUser = await req.user
    res.status(200).send({
        success: true,
        loggedInUser
    })
})

