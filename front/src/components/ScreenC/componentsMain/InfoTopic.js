import React from "react";
import Style from "./css/InfoTopic.module.css"
export default function InfoTopic(props) {

    return (
        <div className={Style.topicItem} onClick={props.eventC} id={props.id}>
            <img src={props.imgSrc} id={props.id} alt="Icon" />
            <p id={props.id}>{props.children}</p>
        </div>
    );
}