import { insrtCard,findAllCard,updateMedCard,findCardByID,delServ,findAll } from "../model/serviceModel.js";
export const create = async (req,res)=>{
    //const {nome,email,senha} = req.body
    const {title,descricao,mednome,email} = req.body

    console.log(req.body)
    const fileG = req.files;
    console.log(fileG)
    //let nameF1 = fileG.usrimg ? "/uploads/" + req.files.usrimg[0].filename : null;
    //let nameF2 = fileG.crmimg ? "/uploads/" + req.files.crmimg[0].filename : null;

    let nameF1 = fileG.fileCard ? "/uploads/" + req.files.fileCard[0].filename : null;
    //let nameF2 = fileG.fileCrm ? "/uploads/" + req.files.fileCrm[0].filename : null;

    let result = await insrtCard(mednome,email,descricao,title,nameF1)

    if(result.msgE){
        return res.status(404).send(result)
    }
    return res.status(200).send(result)
}

export const getAllMedServices = async (req,res)=>{
    //const {nome,email,senha} = req.body
    const {email} = req.body

    let result = await findAllCard(email)

    if(result.msg){
        return res.status(404).send(result)
    }
    return res.status(200).send(result)
}
export const getAll = async (req,res)=>{
    //const {nome,email,senha} = req.body

    let result = await findAll()

    if(result.msg){
        return res.status(404).send(result)
    }
    return res.status(200).send(result)
}
export const getMedService = async (req,res)=>{
    //const {nome,email,senha} = req.body
    const {id} = req.body

    let result = await findCardByID(id)

    if(result.msg){
        return res.status(404).send(result)
    }
    return res.status(200).send(result)
}
function isValid(value) {
    console.log("chacking this "+value)
    return value != undefined && value != null && value != '';
}
export const updateService = async(req,res)=>{
    const {id} = req.body
    let op = "UPDATE CARDSERVICE SET"
    let section1 = ['cardimg','title','descricao','qtd']
    let sendSection1=[]
    const fileG = req.files;
    let nameF1 = fileG.fileCard ? "/uploads/" + req.files.fileCard[0].filename : null;
    if(nameF1 != null){
        req.body = {...req.body,['cardimg']:nameF1}
    }
    console.log(req.body)
    for (const el of Object.keys(req.body)){
        if(section1.includes(el) && isValid(req.body[el])){
            op = op+` ${el.toUpperCase()} = ?,`
            sendSection1.push(req.body[el])
        }
    }
    if(op != "UPDATE CARDSERVICE SET"){
        op = op.substring(0,op.length-1)
        op = op+" WHERE ID = ?"
        sendSection1.push(id)

        console.log("this is the data to update")
        console.log(op)
        console.log(sendSection1)

        let result = await updateMedCard(op,sendSection1)

        console.log(result)
        if(result.msgE){
            return res.status(404).send({msg:result.msgE})
        }else{
            return res.status(200).send({msg:result.msg})
        }

    }else{
        return res.status(200).send({msg:"nenhum dado atualizado"})
    }
}
export const delService = async (req,res)=>{
    //const {nome,email,senha} = req.body
    const {id} = req.body

    let result = await delServ(id)

    console.log(id)
    console.log(result)
    if(result.msgE){
        return res.status(404).send({msg:result.msgE})
    }
    return res.status(200).send(result)
}