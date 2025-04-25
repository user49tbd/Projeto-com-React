import React from "react"
import Styles from './css/CardLeftImgTxt.module.css'
export default function CardLImgTxt(props){
    return (
        <div className={Styles.Container}>
            <img src={props.imgSrc} alt="Img"/>
            <p>{props.children}</p>
        </div>
    )
}