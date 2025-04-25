import React from "react"
import Style from "./css/UsrPerspectiveCard.module.css"
export default function UsrPersp(props){
    return(
        <div className={Style.ItemP}>
            <img  src={props.imgSrc} alt="Icon"/>
            <p>{props.children}</p>
        </div>
    );
}