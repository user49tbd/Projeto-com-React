import React from "react"
import Styles from "./css/titleSecPageLog.module.css"
export default function TitleLogP(props){
    return(
        <div className={Styles.txtMainLog}>
            <p>{props.subTxt}</p>
            <div className={Styles.subTxt}>
                <h3>{props.Title}</h3>
                <p>
                    {props.children}
                </p>
            </div>
        </div>
    );
}