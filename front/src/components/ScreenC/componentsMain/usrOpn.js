import React from "react";
import Styles from "./css/UsrOpn.module.css"
import { useRef, useState } from "react";
export default function UsrOpn() {
    const [opt, setOpt] = useState([0, 0, 0])
    function updatearrC(pos, val) {
        let farr = opt
        farr[pos] = val
        setOpt([...farr])
    }
    function changeHeight(e) {
        let idc = e.target.id
        opt.forEach((el, index) => {
            if (index == idc) {
                if (el == 0) {
                    updatearrC(index, 1)
                } else {
                    updatearrC(index, 0)
                }
            } else {
                updatearrC(index, 0)
            }
        });
        if (opt[idc] == 1) {

        } else {

        }
    }
    return (
        <div className={Styles.conteiner}>
            <input type="radio" name="slide" id="r1" />
            <label htmlFor="r1" className={Styles.card}>
                <div className={Styles.row}>
                    <div className={Styles.rdTxt}><p>random text</p></div>
                    <div className={Styles.description}>
                        <h3>Title-1</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Error quae repellendus quasi expedita ex at alia</p>
                    </div>
                </div>
            </label>
            <input type="radio" name="slide" id="r2" />
            <label htmlFor="r2" className={Styles.card}>
                <div className={Styles.row}>
                    <div className={Styles.rdTxt}><p>random text</p></div>
                    <div className={Styles.description}>
                        <h3>Title-1</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Error quae repellendus quasi expedita ex at alia</p>
                    </div>
                </div>
            </label>
            <input type="radio" name="slide" id="r3" />
            <label htmlFor="r3" className={Styles.card}>
                <div className={Styles.row}>
                    <div className={Styles.rdTxt}><p>random text</p></div>
                    <div className={Styles.description}>
                        <h3>Title-1</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Error quae repellendus quasi expedita ex at alia</p>
                    </div>
                </div>
            </label>
        </div>
    );
}