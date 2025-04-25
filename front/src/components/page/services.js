import React from "react"
import Style from "./css/ServicesC.module.css"
import { useEffect, useState } from "react";
import CardService from "../ScreenC/cardService";
export default function ServicesC() {
    const [qtd, setQtd] = useState(["1", "2", "3", "4", "5"])
    const [cardLst, setCardLst] = useState([])
    const [subs, setSubs] = useState({})
    useState(() => {
        //setQtd(5)
        getAllServices()
        setSubs(getUPass())
    }, [])
    async function getAllServices() {
        let result = await fetch("http://127.0.0.1:8080/service/getAll", {
            method: "GET",
            headers: {
                "Content-Type": "Application/json"
            },
        }).then((res) => res.json()).then((res) => {
            //console.log(res)
            return res
        }).catch((err) => { console.log(err) })
        setCardLst(result)
    }
    async function getAllServicesQtd(id) {
        //let name = localStorage.getItem("usrName")
        let obj = { "id": id, "status": 1 }
        let result = await fetch(`http://127.0.0.1:8080/pass/lstpass`
            , {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(obj)
            }).then((res) => res.json()).then((res) => {
                //console.log(res)
                return res
            }).catch((err) => { console.log(err) })
        console.log(result)
        let qtd = result.length
        return qtd
    }
    async function getUPass() {
        //let name = localStorage.getItem("usrName")
        let email = localStorage.getItem("email")
        let obj = { "status": 1, "email": email }
        let result = await fetch(`http://127.0.0.1:8080/pass/getUPass`
            , {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(obj)
            }).then((res) => res.json()).then((res) => {
                //console.log(res)
                return res
            }).catch((err) => { console.log(err) })
        //console.log("aqui está o resultado")
        //console.log(result)
        let qtd = result
        return qtd
    }
    function execFun(){
        setSubs(getUPass())
        getAllServices()
        console.log("executing the submit")
        console.log(cardLst)
    }
    return (
        <div className={Style.Container}>
            {cardLst && (
                cardLst.map((el, index) => {
                    return <CardService key={index} img={"/assets/imgs/medico-web.jpg"}
                        id={el.id} mednome={el.mednome} email={el.email} descricao={el.descricao}
                        title={el.title} cardimg={el.cardimg} qtd={el.qtd}
                        getQtd={getAllServicesQtd} onSub={subs}
                        exec = {execFun} uPass = {getUPass}
                    ></CardService>
                })
            )}
        </div>
    );
}