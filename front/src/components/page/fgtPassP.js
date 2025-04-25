import React from "react";
import { useState,useEffect } from "react";
import Style from "./css/showL.module.css"
import { showFgt$ } from "../../Observables/obsShow";
import FgtPass from "./fgtPass";
export default function FgtPassP(props){
    
    const [show,setShow]=useState(false)

    useEffect(()=>{
        //setShow(showFgt$.getValue)
        //let val = showFgt$.getValue()
        showFgt$.subscribe(setShow)
        //setShow(val)
        //console.log("value is "+showFgt$.getValue())
    },[])
    function closeBtn(){
        console.log("close "+showFgt$.getValue())
        showFgt$.next(false);
    }
    return(
        <div>
        {show && (
            <div className={Style.mainC}>
                <FgtPass></FgtPass>
                <img onClick={closeBtn} className={Style.closeBtn} src="/assets/icons/x-button.png"></img>
            </div>
        )
        }
        </div>
    );
}