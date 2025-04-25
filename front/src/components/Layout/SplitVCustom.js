import React from "react";
import Styles from './css/SplitVCustom.module.css'
import { useRef, useEffect } from "react";
export default function SplitVC(props) {
    const ref1 = useRef(null);
    const ref2 = useRef(null);

    useEffect(() => {
        if (ref1.current) {
            ref1.current.style.width = props.ItemW1;
        }
        if (ref2.current) {
            ref2.current.style.width = props.ItemW2;
        }
    }, [props.ItemW1, props.ItemW2]);

    return (
        <div className={Styles.SplitVCon}>
            <div ref={ref1}>{props.children[0]}</div>
            <div ref={ref2}>{props.children[1]}</div>
        </div>
    );
}