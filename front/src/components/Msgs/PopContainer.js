import React from "react";
import Styles from "./css/PopC.module.css"
export default function popC(props){
    return (
        <div className={Styles.Container}>
            {props.children}
        </div>
    );
}