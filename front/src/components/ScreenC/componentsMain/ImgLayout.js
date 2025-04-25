import React from "react"
import Style from "./css/ImgLayout.module.css"
export default function ImgLayout(props){
    return(
        <div className={Style.GridC}>
            {props.children}
        </div>
    )
}