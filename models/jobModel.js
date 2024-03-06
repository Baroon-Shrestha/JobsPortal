import mongoose from "mongoose"

const jobSchema = mongoose.Schema({
    CompanyName: {
        type: String,
        required: [true, "you cannot leave this empty"],
        minlength: [5, "it can't be this short"],
        maxlength: [50, "it's too long"]
    },
    CompanyWebsite: {
        type: String,
        required: [true, "you cannot leave this empty"],
        minlength: [5, "it can't be this short"],
        maxlength: [50, "it's too long"]
    },
    JobTitle: {
        type: String,
        required: [true, "you cannot leave this empty"],
        minlength: [5, "it can't be this short"],
        maxlength: [50, "it's too long"]
    },
    JobCategory: {
        type: String,
        required: [true, "you cannot leave this empty"],
        minlength: [5, "it can't be this short"],
        maxlength: [50, "it's too long"]
    },
    JobType: {
        type: String,
        enum: ["FullTime", "HalfTime"], // Corrected enum values
        required: [true, "you cannot leave this empty"],
    },
    JobLocation: {
        type: String,
        required: [true, "you cannot leave this empty"],
        minlength: [5, "it can't be this short"],
        maxlength: [50, "it's too long"]
    },
    SalaryFrom: {
        type: Number,
        required: [true, "you cannot leave this empty"],
        minlength: [4, "salary can't be this lesss"],
        maxlength: [9, "salary can't be this high"]
    },
    SalaryTo: {
        type: Number,
        required: [true, "you cannot leave this empty"],
        minlength: [4, "salary can't be this lesss"],
        maxlength: [9, "salary can't be this high"]
    },
    Exp: {
        type: Number,
        required: [true, "you cannot leave this empty"],
    },
    Qualification: {
        type: String,
        required: [true, "you cannot leave this empty"],
        minlength: [5, "it can't be this short"],
        maxlength: [50, "it's too long"]
    },
    ApplicationDeadline: {
        type: Date,
        required: [true, "you cannot leave this empty"],
    },
    JobAppLink: {
        type: String,
        required: [true, "you cannot leave this empty"],
        minlength: [5, "it can't be this short"],
        maxlength: [50, "it's too long"]
    },
    JobDescription: {
        type: String,
        required: [true, "you cannot leave this empty"],
        minlength: [25, "it can't be this short"],
    },
    available: {
        type: Boolean,
        default: true,
    }
})

export const job = mongoose.model("job", jobSchema)