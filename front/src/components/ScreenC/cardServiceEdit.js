import React from "react"
import Style from "./css/cardServiceEdit.module.css"
import { useEffect, useRef } from "react";
import { showPass$ } from "../../Observables/obsShow";
import { showPassObj$ } from "../../Observables/obsShow";
export default function CardServiceEdit(props) {
    let bkRef = useRef()
    useEffect(() => {
        if (bkRef.current) {
            //.console.log(props.img)
            bkRef.current.style.backgroundImage = `url("${'http://127.0.0.1:8080'}${props.img}")`;
        }
    }, [props.img]);
    function op(){
        console.log("ok - "+props.idC)
    }
    function opGet(){
        props.getvals(props.idC)
    }
    function opDel(){
        console.log(props.idC)
        props.delvals(props.idC)
    }
    function openForm(){
            console.log("open "+showPass$.getValue())
            showPass$.next(true);
            showPassObj$.next(props)
            console.log("this is the obj ")
            console.log(showPassObj$.getValue())
    }
    return (
        <div className={Style.ConMain}>
            <div className={Style.Item} ref={bkRef}>
                <div className={Style.bkOp}></div>
                <div className={Style.Content}>
                    <div className={Style.mainT}><img src="/assets/icons/hospital.png" /><p>{props.title}</p></div>
                    <div className={Style.docInfo}><img src="/assets/icons/nurse.png" /><p>{props.mednome}</p></div>
                    <p>
                        {props.descricao}
                    </p>
                </div>
            </div>
            <div className={Style.sideM}>
                <img onClick={openForm} src="/assets/icons/key-chain.png"/>
                <img onClick={opGet} src="/assets/icons/pen.png"/>
                <img onClick={opDel} src="/assets/icons/delete.png"/>
            </div>
        </div>
    );
}