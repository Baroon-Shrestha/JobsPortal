import express from 'express'
import { availableJobs, deleteJob, myjobs, postJob, updateJob } from "../controllers/jobController.js"
import { isAuthorized } from '../middlewares/auth.js'

const router = express.Router()

router.get("/getAllJobs", availableJobs)
router.post("/postJob", isAuthorized, postJob)
router.put("/updateJob/:id", isAuthorized, updateJob)
router.delete("/deleteJob/:id", isAuthorized, deleteJob)
router.get("/getmyjobs", isAuthorized, myjobs)

export default router;