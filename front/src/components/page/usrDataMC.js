import React from "react"
import Style from "./css/UsrDataMC.module.css"
import { useState,useEffect } from "react"
import UsrDataM1 from "./updateUsrTypes/usrDaraM1"
import UsrDataM2 from "./updateUsrTypes/usrDataM2"
export default function UsrDataMCon(){
    const [type,setType]=useState()
    useEffect(()=>{
        setType(localStorage.getItem("type"))
        console.log("check usr type "+type)
    },[])
    return (
        <div className={Style.Container}>
            {type == "user" && (
                <UsrDataM1></UsrDataM1>
            )}
            {type == "admin" && (
                <UsrDataM2></UsrDataM2>
            )}
        </div>
    );
}