import React from "react"
import Styles from "./css/LayoutTitleSlot.module.css"
export default function LayoutTxtSlot(props){
    return (
        <div className={Styles.ContainerTS}>
            <h3>{props.Title}</h3>
            <div className={Styles.ItemLst}>
                {props.children}
            </div>
        </div>
    );
}