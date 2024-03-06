import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "you cannot leave this empty"],
        validate: [validator.isEmail, "invalid email"]
    },
    password: {
        type: String,
        required: [true, "you cannot leave this empty"],
        select: false
    },
    role: {
        type: String,
        enum: ['Job Seeker', 'Employee'],
    }
})

//hashing password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (pass) {
    return await bcrypt.compare(pass, this.password)
}

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

export const user = mongoose.model("users", userSchema)
