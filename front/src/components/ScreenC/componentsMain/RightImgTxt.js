import React from "react";
import Styles from "./css/RightImgTxt.module.css"
export default function RightImgTxt(props) {
    return (
        <div className={Styles.Container}>
            <div className={Styles.sideLImg}>
                <img src={props.imgSrc} alt="Img"/>
            </div>
            <div className={Styles.sideRTxt}>
                <h3>{props.Title}</h3>
                <p>{props.children}</p>
            </div>
        </div>
    );
}