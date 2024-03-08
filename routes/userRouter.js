import express from 'express'
import { register, login, logout, getLoggeedInUser } from "../controllers/userController.js"
import { isAuthorized } from "../middlewares/auth.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/logout", isAuthorized, logout)
router.get("/loggeduser", isAuthorized, getLoggeedInUser)

export default router;