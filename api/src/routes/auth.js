import express from 'express'
import { userSignIn, userSignUp } from '../controller/auth.controller.js'
import { body } from 'express-validator'

const router = express.Router()

router.post("/signup", [
    body("email").isEmail().normalizeEmail().withMessage("Email must be provided"),
    body("password").isLength({ min: 5 }).withMessage("Password should be mimimum 5 characters"),
] ,userSignUp)
router.post("/signin",[
    body("email").isEmail().normalizeEmail().withMessage("Email must be provided"),
    body("password").isLength({ min: 5 }).withMessage("Password should be mimimum 5 characters"),
],userSignIn)
// router.post("/logut", logOutUser)

export default router