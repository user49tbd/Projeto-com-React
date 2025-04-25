import React from "react";
import { useState,useEffect,useContext,useRef } from "react";
import Style from "./css/PopTest.module.css"
//import { Ctext } from "../pages/Page2";
import { lstMsg$ } from "../../Observables/obsShow";
export default function PopTest(props){
    //const {popLst,setPopLst} = useContext(props.modif)//Ctext)
    let popLst = props.popLst
    let setPopLst = props.setPopLst
    const [current,SetCurrent]=useState(0);
    const [time,SetTime] = useState();
    const [exb,SetExb] = useState(true);

    const [Msg, SetMsg] = useState({ title: "", msg: "", type: "" });

    let imgRef = useRef()
    let bg = useRef()
    function findRes(){
        let val
        popLst.forEach((res)=>{
            if(res.id == props.numb){
                val = res
            }
        })
        //console.log(val)
        SetMsg((prevErros) => ({ ...prevErros, title: val.title, msg: val.msg, type: val.type }));
        SetCurrent(val)
        return val.show
    }
    function rmvResArr(){
        let arrTres = popLst.filter((val)=>val.id != props.numb)
        lstMsg$.next([...arrTres]);
        //setPopLst([...arrTres])
    }
    useEffect(() => {
        if(exb == false){
            rmvElement()
        }
    }, [exb]);

    useEffect(() => {
        //console.log("this is the data title "+props.title+" - message "+props.message)
        /*
        if(exb == false){
            rmvElement()
        }*/
       //console.log("this is the type "+props.type)
       //console.log("this is the style part")
       //console.log(Msg)
       switch(//props
        Msg.type
        ){
        case(1):
            imgRef.current.setAttribute("src","/assets/icons/x-mark.png")
            bg.current.style.backgroundImage = "linear-gradient(to right, red, white 30%)";
            //bg.current.querySelectorAll(".bar")[0].style.backgroundColor="red"
            bg.current.querySelectorAll("div")[2].style.backgroundColor="red"
            //classList.add("h")
            //console.log(bg.current.classList)
        break;
        case(2):
            imgRef.current.setAttribute("src","/assets/icons/caution-sign.png")
            bg.current.style.backgroundImage="linear-gradient(to right,orange,white 30%)"
            bg.current.querySelectorAll("div")[2].style.backgroundColor="orange"
            //bg.current.classList.add("c")
        break;
        case(3):
            imgRef.current.setAttribute("src","/assets/icons/check-mark_15761039.png")
            bg.current.style.backgroundImage="linear-gradient(to right,green,white 30%)"
            bg.current.querySelectorAll("div")[2].style.backgroundColor="green"
        break;
       }
    }, [Msg]);

    useEffect(() => {
        let vl = findRes()
        if (vl) {
            setTimer();
        }
    }, [props.numb]);

    function setTimer() {
        SetTime(setTimeout(() => {
            //SetShow(false);
            //rmvResArr()
            SetExb(false)
            //rmvElement()
        }, 3500));
    }
    function rmvElement() {
        //SetShow(false);
        rmvResArr()
        clearTimeout(time)
    /*
    const {show,SetShow} = useContext(Ctext)
    let time
    useEffect(() => {
        console.log(show)
        if (show) {
            setTimer();
        }
    }, [show]);

    function setTimer() {
       time = setTimeout(() => {
            SetShow(false);
        }, 3500);
    }
    function rmvElement() {
        SetShow(false);
        clearTimeout(time)
    }*/
    }
    return (
        <div>
            {exb &&
            <div className={Style.PopContainer} ref={bg}>
                <div className={Style.Item}>
                    <img src="/assets/icons/biohazard-sign.png" ref={imgRef}></img>
                </div>
                <div className={Style.ItemTxt}>
                    <h4>{Msg.title}</h4>
                    <p>{Msg.msg}</p>
                </div>

                <img className={Style.rmv} src="/assets/icons/x-button.png"
                onClick={rmvElement}></img>
                <div className={Style.bar}></div>
            </div>
            }
        </div>
        /*
        <div>
            {show &&
            <div className={Style.PopContainer}>
                <div className={Style.Item}>
                    <img src="/assets/imgs/biohazard-sign.png"></img>
                </div>
                <div className={Style.ItemTxt}>
                    <h4>{props.title}</h4>
                    <p>{props.message}</p>
                </div>

                <img className={Style.rmv} src="/assets/imgs/x-button.png"
                onClick={rmvElement}></img>
                <div className={Style.bar}></div>
            </div>
            }
        </div>*/
    );
}