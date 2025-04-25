import express from "express"
import {create,login,priv,ckAll,updateUsr,getCon,delUsr} from "../Controller/userController.js"
import { validUsrData,validUsrUpdate } from "../validation/UsrSchema.js"
import { check } from "../jWT/jwtFunctions.js"
import { upload } from "../config/multer.js"
export const usr = express.Router()

usr.post("/register",upload.fields([{ name: "fileUsr", maxCount: 1 },
    { name: "fileCrm", maxCount: 1 }]),validUsrData, create)
usr.post("/login", login)
usr.get("/priv",check, priv)
usr.post("/getAll", ckAll)
usr.get("/getCon", getCon)
usr.post("/updateU",upload.fields([{ name: "fileUsr", maxCount: 1 },
    { name: "fileCrm", maxCount: 1 }]),
    (req,res,next)=>{
        const fileG = req.files;
        req.body.usrimg = null;
        req.body.crmimg = null;
        if(fileG){
            req.body.usrimg = fileG.fileUsr ? "/uploads/" + req.files.fileUsr[0].filename : null;
            req.body.crmimg = fileG.fileCrm ? "/uploads/" + req.files.fileCrm[0].filename : null;
        }
        next()
    }
    ,validUsrUpdate, updateUsr)

usr.post("/delU/:email",delUsr)