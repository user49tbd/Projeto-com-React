import React from "react";
import Styles from "./css/CardTopics.module.css"
export default function CardTopics(props){
    return (
        <div className={Styles.CardElementC}>
            <span>{props.num}</span>
            <p>{props.children}</p>
        </div>
    );
}