import express from "express"
import { emailOp } from "../Controller/emailController.js"
export const email = express.Router()

email.post("/email",emailOp)
