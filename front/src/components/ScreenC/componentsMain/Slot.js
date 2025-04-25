import React from "react";
import { useRef,useEffect } from "react";
import Styles from "./css/Slot.module.css"
export default function Slot(props) {
    const ref = useRef(null)
    useEffect(()=>{
        if(ref.current){
            ref.current.style.backgroundImage=`url(${props.imgBK})`
        }
    },[props.imgBK])
    return (
        <div className={Styles.Item}>
            <div className={Styles.bkGround} ref={ref}></div>
            <div className={Styles.titleCardC}><img src={props.imgSrc} alt="Img"/>
                <p className={Styles.cardTitle}>{props.Title}</p>
            </div>
            <p>{props.children}</p>
        </div>
    );
}