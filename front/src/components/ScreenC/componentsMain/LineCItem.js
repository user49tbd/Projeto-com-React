import React from "react";
import { useEffect,useRef,useState } from "react";
import Styles from "./css/LineCItem.module.css"
export default function LineCItem(props) {
    const refTxt = useRef(null)
    const refImg = useRef(null)

    const [isActive, setIsActive] = useState(false);

    useEffect(()=>{
        if(refTxt.current){
            refTxt.current.style.setProperty("--pos",props.pos)
        }
        if(refImg.current){
            refImg.current.style.setProperty("--pos",props.pos)
        }
    },[props.pos])
    useEffect(()=>{
        //console.log("change os props")
        //console.log(props.pos)
        if(refTxt.current){
            refTxt.current.style.setProperty("--pos",props.pos)
        }
        setIsActive(props.classC)
    },[props.classC])
    return (
        <div className={Styles.stepItemC}><span>
            <p ref={refTxt}>{props.txt}</p>
            <img ref={refImg} src={props.icon} onClick={(e)=>props.eventH(e)} 
            className={isActive==1 ? Styles.select : ''}/>
        </span></div>
    );
}