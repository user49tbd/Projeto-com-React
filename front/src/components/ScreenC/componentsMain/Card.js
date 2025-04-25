import React from "react"
import Style from "./css/Card.module.css"
export default function Card(props){
    return(
        <div className={Style.Card}>
                <div className={Style.upperCard}>
                    <img src={props.imgSrc} alt="Icon"/>
                </div>
                <div className={Style.lowerCard}>
                    <p>{props.children}</p>
                </div>
        </div>
    );
}