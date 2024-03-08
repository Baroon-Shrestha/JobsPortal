import { asyncErrorHandling } from "../middlewares/asyncErrorHandling.js"
import { createError, errorHanlder } from "../middlewares/errorHandling.js"
import { job } from "../models/jobModel.js"

export const availableJobs = asyncErrorHandling(async (req, res) => {
    const availableJobs = await job.find({ available: true })
    res.status(200).json({
        success: true,
        availableJobs,
    })
})
export const postJob = asyncErrorHandling(async (req, res) => {
    const { role } = req.user
    if (role === "Job Seeker") {
        return errorHanlder(createError("you don't have acccess to this feature"), req, res)
    }
    const { CompanyName, CompanyWebsite, JobTitle, JobCategory, JobType, JobLocation, SalaryFrom, SalaryTo, Exp, Qualification, ApplicationDeadline, JobAppLink, JobDescription } = req.body
    const employeeId = req.user.id
    if (!CompanyName || !CompanyWebsite || !JobTitle || !JobCategory || !JobType || !JobLocation || !SalaryFrom || !SalaryTo || !Exp || !Qualification || !ApplicationDeadline || !JobAppLink || !JobDescription) {
        return errorHanlder(createError("you cannot leave any of these empty"), req, res)
    }
    const postJob = await job.create({
        CompanyName, CompanyWebsite, JobTitle, JobCategory, JobType, JobLocation, SalaryFrom, SalaryTo, Exp, Qualification, ApplicationDeadline, JobAppLink, JobDescription, employeeId
    })
    res.status(200).json({
        success: true,
        message: "job posted sucessfully",
        postJob,
    })
})
export const updateJob = asyncErrorHandling(async (req, res) => {
    const { role } = req.user
    if (role === "Job Seeker") {
        return errorHanlder(createError("you don't have acccess to this feature"), req, res)
    }

    const { id } = req.params
    let update = await job.findById({ _id: id })
    if (!update) {
        return errorHanlder(createError("couldnt't find the job"), req, res)
    }
    update = await job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidator: true,
        useFindAndModify: false
    })
    res.status(200).send({
        success: true,
        message: "job updated successfully",
        update
    })
})

export const deleteJob = asyncErrorHandling(async (req, res) => {
    const { role } = req.user
    if (role === "Job Seeker") {
        return errorHanlder(createError("you don't have acccess to this feature"), req, res)
    }
    const { id } = req.params
    let jobToDelete = await job.findById(id)
    if (!jobToDelete) {
        return errorHanlder(createError("job not found"), req, res)
    }
    await job.deleteOne({ _id: id })
    res.status(200).send({
        success: true,
        message: "job delete successfully"
    })
})

export const myjobs = asyncErrorHandling(async (req, res) => {
    const { role } = req.user
    if (role === "Job Seeker") {
        return errorHanlder(createError("you don't have acccess to this feature"), req, res)
    }
    const myjobs = await job.find({ employeeId: req.user.id })
    res.status(200).send({
        success: true,
        message: "job created successfully",
        myjobs
    })

})