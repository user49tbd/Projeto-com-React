import React from "react";
import Styles from "./css/imgFrame.module.css"
export default function ImgFrame(props) {
    return (
        <div className={Styles.gridC}>
            <div><img src={props.imgSrc1} alt="Img"/></div>
            <div></div>
            <div><img src={props.imgSrc2} alt="Img"/></div>
        </div>
    );
}