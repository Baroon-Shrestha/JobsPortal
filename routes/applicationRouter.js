import express from 'express'
import { getApplicationsOfJobSeekers, JobSeekerDeleteApplication, JobSeekersSeeApplications, postApplication } from "../controllers/applicationController.js"
import { isAuthorized } from "../middlewares/auth.js"
const router = express.Router()

router.get("/getapplication/employees", isAuthorized, getApplicationsOfJobSeekers)
router.get("/seeapplication/jobseeker", isAuthorized, JobSeekersSeeApplications)
router.delete("/deleteapplication/jobseeker/:id", isAuthorized, JobSeekerDeleteApplication)
router.post("/postapplication", isAuthorized, postApplication)


export default router;