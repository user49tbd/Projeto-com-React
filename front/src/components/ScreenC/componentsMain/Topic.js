import React from "react";
import Style from "./css/Topic.module.css"
export default function Topic(props) {
    return (
        <div className={Style.topicItem}>
            <img src={props.imgSrc} alt="Icon"/>
            <p>{props.children}</p>
        </div>
    );
}