import React from "react";
import { showCheckP$ } from "../../Observables/obsShow";
import Style from "./css/showL.module.css"
import { useState,useEffect } from "react";
import CheckPrivP from "./checkPrivP";
export default function CheckPriv(props) {
    const [show, setShow] = useState(false)
    useEffect(() => {
        setShow(props.showP)
    }, [props.showP])
    function closeBtn() {
        showCheckP$.next(!showCheckP$.getValue());
    }
    return (
        <div>
            {show && (
                <div className={Style.mainC}>
                    <CheckPrivP></CheckPrivP>
                    <img onClick={closeBtn} className={Style.closeBtn} src="/assets/icons/x-button.png"></img>
                </div>
            )
            }
        </div>
    );
}