import { application } from "../models/applicationModel.js"
import { asyncErrorHandling } from "../middlewares/asyncErrorHandling.js"
import { errorHanlder, createError } from "../middlewares/errorHandling.js"
import cloudinary from 'cloudinary'
import { job } from "../models/jobModel.js"


export const getApplicationsOfJobSeekers = asyncErrorHandling(async (req, res) => {
    const { role } = req.user
    if (role === "Job Seeker") {
        return errorHanlder(createError("you don't have acccess to this feature"), req, res)
    }
    const { _id } = req.user
    const applications = await application.find({ 'employeeID.user': _id })
    res.status(200).send({
        success: true,
        message: "application found",
        applications
    })
})
export const JobSeekersSeeApplications = asyncErrorHandling(async (req, res) => {
    const { role } = req.user
    if (role === "Employee") {
        return errorHanlder(createError("you don't have acccess to this feature"), req, res)
    }
    const { _id } = req.user
    const applications = await application.find({ 'applicatantID.user': _id })
    res.status(200).send({
        success: true,
        message: "application found",
        applications
    })
})

export const JobSeekerDeleteApplication = asyncErrorHandling(async (req, res) => {
    const { role } = req.user
    if (role === "Employee") {
        return errorHanlder(createError("you don't have acccess to this feature"), req, res)
    }
    const { id } = req.params
    const deleteApplication = await application.findById(id)
    if (!deleteApplication) {
        return errorHanlder(createError("application not found!"), req, res)
    }
    await deleteApplication.deleteOne()
    res.status(200).send({
        success: true,
        message: "deleted successfully",
    })

})

export const postApplication = asyncErrorHandling(async (req, res) => {
    try {
        const { role } = req.user;
        if (!role || role === "Employee") {
            return errorHanlder(createError("You don't have access to this feature"), req, res);
        }

        if (!req.files || !req.files.resume) {
            return errorHanlder(createError("Please upload your CV"), req, res);
        }

        const { resume } = req.files;
        const allowedExtension = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
        if (!allowedExtension.includes(resume.mimetype)) {
            return errorHanlder(createError("Please upload the image in PNG, JPEG, JPG, or WEBP format"), req, res);
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath);
        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log("Cloudinary error:", cloudinaryResponse.error || "Unknown Cloudinary error");
            return errorHanlder(createError("Failed to upload"), req, res);
        }
        console.log(cloudinaryResponse)
        const { name, Email, description, jobId } = req.body;

        if (!name) {
            return errorHanlder(createError("Name field cannot be empty"), req, res);
        }

        if (!Email) {
            return errorHanlder(createError("Email field cannot be empty"), req, res);
        }

        if (!description) {
            return errorHanlder(createError("Description field cannot be empty"), req, res);
        }

        if (!jobId) {
            return errorHanlder(createError("Job ID field cannot be empty"), req, res);
        }


        const jobDetails = await job.findById(jobId);
        if (!jobDetails) {
            return errorHanlder(createError("Job not available or not found"), req, res);
        }

        const postYourApplication = await application.create({
            name,
            Email,
            description,
            applicatantID: {
                user: req.user._id,
                role: "Job Seeker"
            },
            employeeID: {
                user: jobDetails.employeeId,
                role: "Employee"
            },
            resume: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            }
        });

        res.status(200).send({
            success: true,
            message: "Application sent",
            postYourApplication
        });
    } catch (error) {
        return errorHanlder(error, req, res);
    }
});
