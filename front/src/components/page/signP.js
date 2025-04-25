import React from "react";
import { useState,useEffect } from "react";
import Style from "./css/showL.module.css"
import { showS$ } from "../../Observables/obsShow";
import SignUp from "./sign";
export default function SignP(props){
    const [show,setShow]=useState(false)

    useEffect(()=>{
        setShow(props.showP)
    },[props.showP])
    function closeBtn(){
        showS$.next(!showS$.getValue());
    }
    return(
        <div>
        {show && (
            <div className={Style.mainC}>
                <SignUp></SignUp>
                <img onClick={closeBtn} className={Style.closeBtn} src="/assets/icons/x-button.png"></img>
            </div>
        )
        }
        </div>
    );
}