import React from "react";
import { useState,useEffect } from "react";
import Style from "./css/showL.module.css"
import { show$ } from "../../Observables/obsShow";
import Login from "./login";
export default function LoginP(props){
    const [show,setShow]=useState(false)

    useEffect(()=>{
        setShow(props.showP)
    },[props.showP])
    function closeBtn(){
        show$.next(!show$.getValue());
    }
    return(
        <div>
        {show && (
            <div className={Style.mainC}>
                <Login></Login>
                <img onClick={closeBtn} className={Style.closeBtn} src="/assets/icons/x-button.png"></img>
            </div>
        )
        }
        </div>
    );
}