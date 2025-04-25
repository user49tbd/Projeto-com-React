import React, { useEffect } from "react";
import Styles from "./css/selectData.module.css"
import { useState, useRef } from "react";
export default function SelectData(props) {
    const [conditions, setConditions] = useState([]);

    const ref = useRef()
    function changeSelect(e) {
        console.log("selecionado");
        let val = e.target.value;
        console.log(conditions)

        let find = conditions.find((elmt) => elmt === val);
        if (!find && val.length > 0) {
            setConditions(prevConditions => [...prevConditions, val]);
            handleChangeSelect([...conditions, val]);
        }
    }

    function rmvItem(e) {
        console.log("trigger remove");
        const itemToRemove = e.target.textContent;
        let updatedConditions = conditions.filter((item) => item !== itemToRemove);
        setConditions(updatedConditions);
        handleChangeSelect(updatedConditions);
    }

    function handleChangeSelect(updatedConditions) {
        props.setUsrD({ ...props.usrD, ["conditions"]: updatedConditions });
    }
    /*
    useEffect(()=>{
        if(props.select){
            props.select.forEach(element => {
                console.log("the element is "+element)
                //ref.current.value=element
                let find = conditions.find((elmt) => elmt === element);
                if (!find && element.length > 0) {
                    setConditions(prevConditions => [...prevConditions,element]);
                    handleChangeSelect([...conditions, element]);
                }
            });
        }
    },[props.select])*/

    useEffect(() => {
        if (props.select?.length > 0) {
            setConditions(prevConditions => {
                // Filtra elementos não duplicados e válidos
                const newConditions = [...new Set([...prevConditions, ...props.select.filter(el => el.length > 0)])];
    
                // Só atualiza se houver mudança real no estado
                if (newConditions.length !== prevConditions.length) {
                    props.setUsrD(prevUsrD => ({ ...prevUsrD, conditions: newConditions }));
                }
    
                return newConditions;
            });
        }
    }, [props.select, props.setUsrD]);

    return (
        <div className={Styles.selectC}>
            <select onChange={(e) => changeSelect(e)} name="conditions" ref={ref}>
                <option select="true"></option>
                {props.children}
            </select>
            <div>
                {conditions.map((condition, index) => (
                    <div key={index} className={Styles.conditionItem} onClick={(e) => rmvItem(e)}>
                        {condition}
                    </div>
                ))}
            </div>
        </div>
    );
}
/*
export default function SelectData(props) {
    const [conditions, setConditions] = useState([]);
    function changeSelect(e) {
        console.log("selecionado")
        let val = e.target.value

        let find = conditions.find((elmt) => elmt == val)
        if (!find && val.length > 0) {
            setConditions(prevConditions => [...prevConditions, val]);
            handleChangeSelect(e)
        }
    }
    function rmvItem(e) {
        console.log("trigger remove")
        const itemToRemove = e.target.textContent;
        let updatedConditions = conditions.filter((item) => item !== itemToRemove);
        setConditions(updatedConditions);
        handleChangeSelect(e)
    }
    function handleChangeSelect(e) {
        props.setUsrD({ ...props.usrD, [e.target.name]: conditions })
    }
    return (
        <div className={Styles.selectC}>
            <select onChange={(e) => changeSelect(e)} name="conditions">
                <option select="true"></option>
                <option>1section</option>
                <option>2section</option>
                <option>3section</option>
                <option>4section</option>
                <option>5section</option>
                <option>6section</option>
            </select>
            <div>
                {conditions.map((condition, index) => (
                    <div key={index} className={Styles.conditionItem}
                        onClick={(e) => rmvItem(e)}>
                        {condition}
                    </div>
                ))}
            </div>
        </div>
    );
}*/