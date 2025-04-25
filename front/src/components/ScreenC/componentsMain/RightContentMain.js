import React from "react";
import Styles from "./css/RightContentMain.module.css"
export default function RightContentM(props){
    return (
        <div className={Styles.mainC}>
            <div className={Styles.bigCard}>
                <div className={Styles.topCard}>
                    {props.children[3]}
                </div>
                <div className={Styles.smallCard}>
                    {props.children[0]}
                    {props.children[1]}
                    {props.children[2]}
                </div>
            </div>
        </div>
    );
}