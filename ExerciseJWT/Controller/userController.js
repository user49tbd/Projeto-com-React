import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import {criar,buscar,userP,buscAll,userM,isrCMain,updateUsrModel,delUpdateArr,delU} from '../model/usrModel.js'
import { buscarConditions } from '../model/conditionsModel.js';
import { signJwt } from '../jWT/jwtFunctions.js';
import { validationResult } from 'express-validator';
/*
export const create1 = async (req,res)=>{
    const {nome,email,senha} = req.body
    let resV = validationResult(req)
    if (!resV.isEmpty()) {
        //const err = new Error(errors.array());
        console.log("her is the result")
        console.log(resV.array()[0].msg)
        return res.status(400).send(resV)
    } 

    let hash = await bcrypt.genSalt(12)
    let pass = await bcrypt.hash(senha,hash)

    let result = await criar(nome,email,pass)

    let dt = await buscar(email)

    res.status(200).send(result)
}*/
export const create = async (req,res)=>{
    //const {nome,email,senha} = req.body
    const {nome,email,senha,usrimg,nasc,role,crmimg,arrCon} = req.body

    const fileG = req.files;
    console.log(fileG)
    //let nameF1 = fileG.usrimg ? "/uploads/" + req.files.usrimg[0].filename : null;
    //let nameF2 = fileG.crmimg ? "/uploads/" + req.files.crmimg[0].filename : null;

    let nameF1 = fileG.fileUsr ? "/uploads/" + req.files.fileUsr[0].filename : null;
    let nameF2 = fileG.fileCrm ? "/uploads/" + req.files.fileCrm[0].filename : null;

    console.log(fileG.fileUsr)

    let resV = validationResult(req)
    if (!resV.isEmpty()) {
        //const err = new Error(errors.array());
        console.log("her is the result")
        console.log(resV.array()[0].msg)
        return res.status(400).send(resV)
    } 
    console.log("the body")
    console.log(req.body)

    let hash = await bcrypt.genSalt(12)
    let pass = await bcrypt.hash(senha,hash)

    if(role && role == "admin"){
        if(nameF2){
            let result = await criar(nome,email,pass,nameF1,'admin')
            //console.log(result)
            if(result.msgE){
                return res.status(200).send(result.msgE)
            }
            let dt = await buscar(email)
            let isrt = await userM(dt.id,nameF2)
            console.log(isrt)
            res.status(200).send(isrt)
        }else{
            return res.status(400).send({msg:"crmimg nao pode ser nulo"})
        }
    }else{
        console.log("here as user ")
        if(nasc){
            let result = await criar(nome,email,pass,nameF1,'user')
            console.log(result)
            if(result.msgE){
                return res.status(400).send({msg:result.msgE})
            }
            let dt = await buscar(email)
            let isrt = await userP(dt.id,nasc)
            if(arrCon && arrCon.length > 0){
                isrCMain(dt.id,arrCon)
            }
            console.log(isrt)
            res.status(200).send(isrt)
        }else{
            return res.status.send({msg:"nasc nao pode ser nulo"})
        }
    }

    /*
    let result = await criar(nome,email,pass,usrimg)
    console.log(result)
    if(result.msgE){
        return res.status(200).send(result.msgE)
    }
    let dt = await buscar(email)
    let isrt = await userP(dt.id,nasc)
    res.status(200).send(isrt)*/
}
export const login = async (req,res)=>{
    const {email,senha} = req.body

    let resV = validationResult(req)
    if (!resV.isEmpty()) {
        //const err = new Error(errors.array());
        console.log(resV)
        return res.status(404).send({"msg":resV})
    } 

    let check = await buscar(email)
    console.log(check)
    if(check.msg){
        return res.status(404).send(check)
    }
    //let hash = await bcrypt.genSalt(12)
    //let pass = await bcrypt.hash(senha,hash)
    
    let checkpass = await bcrypt.compare(senha,check.senha)
    console.log(`${email} - senha : ${senha} - check pass ${check.senha}`)
    console.log(checkpass)
    if(!checkpass){
        return res.status(404).send({"msg":"senha inválida"})
    }
    try{
        /*
        let secret = process.env.SECRET
        const token = jwt.sign({
            email:check.email
        },secret)*/

        let token = signJwt({
            email:check.email,role:check.role
        })
        return res.status(200).send({"token":token,"name":check.nome,
            "role":check.role,"usrimg":check.usrimg,"email":check.email})
    }
    catch{
        res.status(404).send({"msg":"error"})
    }

}
export const priv = async (req,res)=>{
    let rest = req.user
    console.log(rest)
    res.status(200).send("this is private")
}
export const ckAll = async (req,res)=>{
    let vl = req.body.email
    console.log(`searching for ${vl}`)
    let result = await buscAll(vl)
    console.log(result)
    res.status(200).send(result)
}
export const getCon = async (req,res)=>{
    //let vl = req.body.email
    //console.log(`searching for ${vl}`)
    let result = await buscarConditions()
    console.log(result)
    res.status(200).send(result)
}
function isValid(value) {
    console.log("chacking this "+value)
    return value != undefined && value != null && value != '';
}
export const updateUsr = async (req,res)=>{
    const {nome,senha,email,usrimg,nasc,crmimg,arrCon} = req.body

    console.log("the body is")

    console.log(req.body)

    let op = "UPDATE USER SET"
    let op1 = "UPDATE USERMED SET"

    //let nameF1 = fileG.fileUsr ? "/uploads/" + req.files.fileUsr[0].filename : null;
    //let nameF2 = fileG.fileCrm ? "/uploads/" + req.files.fileCrm[0].filename : null;

    let result = await buscAll(email)

    //"UPDATE USUARIO SET NOME = ?, EMAIL = ?, CPF = ? WHERE ID = ?",
    //[nome, email, cpf, id],

    let schema = validationResult(req)
    if(!schema.isEmpty()){
        return res.status(200).send(schema.array()[0].msg)
    }

    let section1 = ['nome','senha','usrimg']
    let user1 = ['nasc']
    let user2 = ['crmimg']
    let arrAttr=['arrCon']

    let sendSection1=[]
    let sendSection2=[]

    if(result.role=='user'){
        op1 = "UPDATE USERP SET"
    }
    let val = false
    let test = op1
    //Object.keys(req.body).forEach((el)=>{
    for (const el of Object.keys(req.body)){
        console.log(el)
        console.log(req.body[el])
        console.log(isValid(req.body[el]))
        if(section1.includes(el) && isValid(req.body[el])){
            op = op+` ${el.toUpperCase()} = ?,`
            //sendSection1 = {...sendSection1,[el]:req.body[el]}
            if(el == "senha"){
                let hash = await bcrypt.genSalt(12)
                let pass = await bcrypt.hash(req.body[el],hash)
                req.body[el] = pass
            }
            sendSection1.push(req.body[el])
        }
        if(result.role=='user'){
            if(user1.includes(el)){
                //sendSection2 = {...sendSection2,[el]:req.body[el]}
                console.log(el)
                op1 = op1+` ${el.toUpperCase()} = ?,`
                sendSection2.push(req.body[el])
            }
            if(!arrAttr.includes(el)){
                console.log("executing the conditions ")
                await delUpdateArr(result.id,arrCon)
            }
        }else{
            if(user2.includes(el)){
                op1 = op1+` ${el.toUpperCase()} = ?,`
                //sendSection2 = {...sendSection2,[el]:req.body[el]}
                sendSection2.push(req.body[el])
            }
        }
    }//)
    let resultUp
    if(op != "UPDATE USER SET"){
        op = op.substring(0,op.length-1)
        op = op+" WHERE ID = ?"
        console.log(op)
        console.log(sendSection1)
        sendSection1.push(result.id)
        resultUp = await updateUsrModel(op,sendSection1)


        console.log(resultUp)
    }
    if(test != op1){
        op1 = op1.substring(0,op1.length-1)
        op1 = op1+" WHERE USER_ID = ?"
        sendSection2.push(result.id)
        resultUp = await updateUsrModel(op1,sendSection2)
        console.log(op1)
        console.log(sendSection2)

        console.log(resultUp)
    }
    //console.log("this is the info")
    //console.log(sendSection1)
    //console.log(sendSection2)

    result = await buscAll(email)

    res.status(200).send({msg:"usuário atualizado",img:result.usrimg,nome:result.nome})
    /*
    let vl = req.body.email
    console.log(`searching for ${vl}`)
    let result = await buscAll(vl)
    console.log(result)
    res.status(200).send(result)*/
}
export const delUsr = async (req,res)=>{
    let attr = req.params.email
    let result = await delU(attr)

    if(result.msgE){
        return res.status(400).send(result)
    }else{
        return res.status(200).send(result)
    }
}
/*
function checktoken(req,res,next){
    const authH = req.headers["authorization"]
    const token = authH && authH.split(" ")[1]

    if(!token){
        return res.status(401).json({msg:"acesso negado"})
    }
    try{
        let secret = process.env.SECRET
        jwt.verify(token,secret)
        next()
    }catch(err){
        res.status(400).json({masg:"token inválido"})
    }
}*/