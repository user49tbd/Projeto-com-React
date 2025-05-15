import express from "express"
import { insertPassC,changeStatusPassC,getListPass,getUsrPass,getUsrPassGroup } from "../Controller/passServiceController.js"
export const pass = express.Router()

pass.post("/insertpass",insertPassC)
pass.post("/changestatus",changeStatusPassC)
pass.post("/lstpass",getListPass)
pass.post("/getUPass",getUsrPass)
pass.post("/getUPassG",getUsrPassGroup)