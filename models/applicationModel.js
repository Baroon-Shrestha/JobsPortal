import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, " you cannot leave this empty"],
        minLength: [3, "this cannot be this short"],
        maxLenght: [20, "thhis cannot be this long"]
    },
    Email: {
        type: String,
        required: [true, " you cannot leave this empty"],
    },
    description: {
        type: String,
        required: [true, " you cannot leave this empty"],
    },
    resume: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    applicatantID: {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "user",
        },
        role: {
            type: String,
            enum: "Job Seeker",
        }
    },
    employeeID: {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "user",
        },
        role: {
            type: String,
            enum: "Employee",
        }
    }


})

export const application = mongoose.model('Application', applicationSchema)