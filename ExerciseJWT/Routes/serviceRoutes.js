import express from "express"
import { upload } from "../config/multer.js"
import { create,getAllMedServices,updateService,getMedService,delService,getAll } from "../Controller/serviceController.js"
export const service = express.Router()

service.post("/createC",upload.fields([{ name: "fileCard", maxCount: 1 }]), create)
service.post("/getMedServ", getAllMedServices)
service.get("/getAll", getAll)
service.post("/updateServ",upload.fields([{ name: "fileCard", maxCount: 1 }]), updateService)
service.post("/getServ", getMedService)
service.post("/delServ", delService)