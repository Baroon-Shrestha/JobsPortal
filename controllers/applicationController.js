import { application } from "../models/applicationModel.js"
import { asyncErrorHandling } from "../middlewares/asyncErrorHandling.js"
import { errorHanlder, createError } from "../middlewares/errorHandling.js"

export const getapplications = asyncErrorHandling(async (req, res) => {
    const { role } = req.user
    if (role === "Job Seeker") {
        return errorHanlder(createError("you don't have acccess to this feature"), req, res)
    }

})