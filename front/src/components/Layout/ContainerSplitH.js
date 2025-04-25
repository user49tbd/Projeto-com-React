import React from "react"
import Style from "./css/ContainerSplitH.module.css"
import { useEffect, useRef } from "react";
export default function SplitH(props){
    const ref = useRef(null)
    useEffect(()=>{
        if(ref){
            ref.current.style.gap=`${props.gapItem}`
        }
    },[props.gapItem])
    return(
        <div className={Style.Container} ref={ref}>
            {props.children}
        </div>
    );
}