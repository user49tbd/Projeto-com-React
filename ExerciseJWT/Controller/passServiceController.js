import { insrtPass,changeStatusPass,selectAllPassFromService,checkSign,selectPassServiceID } from "../model/passServiceModel.js";
export const insertPassC = async (req,res)=>{
    const {pass,email,servId,data} = req.body

    console.log(req.body)

    let result = await insrtPass(pass,email,servId,data)

    if(result.msgE){
        return res.status(404).send({msg:result.msgE})
    }
    return res.status(200).send(result)
}
export const changeStatusPassC = async (req,res)=>{
    const {id} = req.body

    console.log(req.body)

    let result = await changeStatusPass(id)

    console.log(result)
    if(result.msgE){
        return res.status(404).send({msg:result.msgE})
    }
    return res.status(200).send(result)
}
export const getListPass = async (req,res)=>{
    const {id,status} = req.body

    console.log(req.body)

    let result = await selectAllPassFromService(id,status)

    if(result.msgE){
        return res.status(404).send({msg:result.msgE})
    }
    return res.status(200).send(result)
}
export const getUsrPass = async (req,res)=>{
    const {id,status,email} = req.body

    console.log(req.body)

    let result = await checkSign(status,email)
    //checkSign(id,status,email)

    console.log(result)

    if(result.msgE){
        return res.status(404).send({msg:result.msgE})
    }
    return res.status(200).send(result)
}
export const getUsrPassGroup = async (req,res)=>{
    const {email} = req.body

    console.log(req.body)

    //let result = await checkSign(status,email)
    //checkSign(id,status,email)

    let result = await selectPassServiceID(email,1)

    let fres = []
    console.log("this is the serviceID")
    console.log(result)

    if(result.serv_id){
        fres = await selectAllPassFromService(result.serv_id,1)
        console.log(fres)
    }

    if(result.msgE){
        return res.status(404).send({msg:result.msgE})
    }
    return res.status(200).send(fres)
}