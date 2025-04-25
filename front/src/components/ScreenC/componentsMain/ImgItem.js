import React from "react"
import { useRef,useEffect } from "react";
import Styles from "./css/imgItem.module.css"
export default function ImgItem(props) {
    const Uref = useRef(null);
    useEffect(() => {
        if (Uref.current) {
            Uref.current.style.backgroundImage = `url(${props.bkImg})`;
        }
    }, [props.bkImg]);

    return (
        <div className={Styles.bkContainer} ref={Uref}>
            <div>
                <h6>{props.Title}</h6>
                <p>{props.children}</p>
            </div>
        </div>
    );
}