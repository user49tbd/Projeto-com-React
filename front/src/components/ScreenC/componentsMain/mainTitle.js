import React from "react";
import Styles from "./css/mainTitle.module.css"
export default function MainTitle(props){
    return (
        <div className={Styles.ContentTxt}>
            <p>{props.txt1}</p>
            <h1>{props.Title}</h1>
            <p>{props.children}</p>
            <button>click</button>
        </div>

    );
}