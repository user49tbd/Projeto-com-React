import React, { useState } from "react";
import LineCItem from "./LineCItem";
import Styles from "./css/lineC.module.css"
import { useRef } from "react";
export default function LineC(props) {
    const elmentRef = useRef(null)
    const lw2 = useRef(null)
    const [arr,setArr] = useState([0,1,2,3,4,5,6])
    const [arrC,setArrC] = useState([0,0,0,0,0,0,0])
    function updatearrC(pos,val){
        let farr = arrC
        farr[pos]=val
        setArrC([...farr])
    }
    function checkClass(val,name){
        val.forEach((el)=>{
            el.forEach((el2)=>{
                if(el2.value){
                    if(el2.value.includes(name)){
                        return true
                    }
                }
            })
        })
        return false
    }
    function clickEnvent(e){
        let conSteps = lw2.current.children
        let beforL = lw2.current
        //console.log("ok "+conSteps.length)
        //let ck = e.target.classList.contains("select");
        //console.log("verificar se tem "+ck)
        //console.log(e.target.classList)
        //console.log(ck)
        let img
        let p
        let bol = true


        let num = 12
        //console.log("attempt")

        //console.log(arr)
        /*
        let farr = arrC
        farr[0]=1
        setArrC([...farr])
        e.target.classList.add("select");*/

        //console.log("next to for")
        Array.from(conSteps).forEach((res, index) => {
            img = res.children[0].children[1]
            p = res.children[0].children[0]
            //console.log(img)
            if (img === e.target) {
                //console.log("this is the val")
                let calc = ((100 / 6) * index )
                //console.log(calc)
                beforL.style.setProperty("--w", `${calc}%`)
                bol = false
                if (arrC[index]==1) {
                    updatearrC(index,0)
                    //console.log("remove")
                    //img.classList.remove("select");
                } else {
                    updatearrC(index,1)
                    //console.log("add")
                    //img.classList.add("select");
                }
            } else {
                if (bol == true) {
                    updatearrC(index,1)
                } else {
                    updatearrC(index,0)
                }
            }
        });
    }
    /*
    function clickEnvent(e){
        let conSteps = lw2.current.children
        let beforL = lw2.current
        console.log("ok "+conSteps.length)
        let ck = e.target.classList.contains("select");
        console.log(ck)
        let img
        let p
        let bol = true
        Array.from(conSteps).forEach((res, index) => {
            img = res.children[0].children[1]
            p = res.children[0].children[0]
            console.log(img)
            img.style.setProperty("--pos", index)
            p.style.setProperty("--pos", index)

            //setArr(...arr,arr[0]=index)
            setArr(prevArr => {
                const novoArray = [...prevArr];
                novoArray[0] = index;
                return novoArray;
            });
            if (img === e.target) {
                let calc = ((100 / 6) * index + 1)
                console.log(calc)
                beforL.style.setProperty("--w", `${calc}%`)
                bol = false
                if (ck) {
                    img.classList.remove("select");
                } else {
                    img.classList.add("select");
                }
            } else {
                if (bol == true) {
                    img.classList.add("select");
                } else {
                    img.classList.remove("select");
                }
            }
        });
    }*/

    return (
        <div className={Styles.lowerSection02} ref={lw2}>
            <LineCItem icon={`/assets/icons/password_14562503.png`} txt={
                `
                Acesse o site e crie sua conta informando seus dados pessoais. 
                Após o cadastro, faça login com seu e-mail e senha para acessar 
                sua área de usuário.
                `}
                eventH={(e)=>clickEnvent(e)}
                pos={0}
                classC={arrC ? arrC[0] : 0}
                >
            </LineCItem>
            <LineCItem icon={`/assets/icons/add.png`} txt={
                `
                Escolha o serviço médico desejado. Os médicos disponibilizam diferentes 
                atendimentos, e você pode selecionar aquele que melhor atende às suas necessidades.

                `
                }
                eventH={(e)=>clickEnvent(e)}
                pos={1}
                classC={arrC ? arrC[1] : 0}
                >
            </LineCItem>
            <LineCItem icon={`/assets/icons/password_14562503.png`} txt={
                `
                Após escolher o serviço, uma senha digital será gerada automaticamente. 
                O sistema verificará se você tem prioridade (idosos, gestantes e PCDs). 
                Se não tiver, poderá remover a prioridade se aplicável.
                `}
                eventH={(e)=>clickEnvent(e)}
                pos={2}
                classC={arrC ? arrC[2] : 0}
                >
            </LineCItem>
            <LineCItem icon={`/assets/icons/bell.png`} txt={
                `
                Visualize sua posição na fila diretamente no painel do usuário. 
                Caso haja mudanças, você será notificado sobre a proximidade do seu atendimento.
                `}
                eventH={(e)=>clickEnvent(e)}
                pos={3}
                classC={arrC ? arrC[3] : 0}
                >
            </LineCItem>
            <LineCItem icon={`/assets/icons/settings.png`} txt={
                `
                Quando chegar sua vez, seu nome será chamado na plataforma. 
                O médico poderá registrar o atendimento e, ao final, seu histórico será atualizado.

                `}
                eventH={(e)=>clickEnvent(e)}
                pos={4}
                classC={arrC ? arrC[4] : 0}
                >
            </LineCItem>
            <LineCItem icon={`/assets/icons/user_17740838.png`} txt={
                `
                Após o atendimento, você pode acessar o histórico de senhas usadas e 
                consultar estatísticas sobre tempo médio de espera e eficiência do serviço.

                `}
                eventH={(e)=>clickEnvent(e)}
                pos={5}
                classC={arrC ? arrC[5] : 0}
                >
            </LineCItem>
        </div>
    );
}
/*
export default function LineC(props) {

    const elmentRef = useRef(null)
    const lw2 = useRef(null)
    let {arr,setArr} = useState([0,0,0,0,0,0,0])
    function clickEnvent(e){
        let conSteps = lw2.current.children
        let beforL = lw2.current
        console.log("ok "+conSteps.length)
        let ck = e.target.classList.contains("select");
        console.log(ck)
        let img
        let p
        let bol = true
        Array.from(conSteps).forEach((res, index) => {
            img = res.children[0].children[1]
            p = res.children[0].children[0]
            console.log(img)
            img.style.setProperty("--pos", index)
            p.style.setProperty("--pos", index)

            //setArr(...arr,arr[0]=index)
            setArr(prevArr => {
                const novoArray = [...prevArr];
                novoArray[0] = index;
                return novoArray;
            });
            if (img === e.target) {
                let calc = ((100 / 6) * index + 1)
                console.log(calc)
                beforL.style.setProperty("--w", `${calc}%`)
                bol = false
                if (ck) {
                    img.classList.remove("select");
                } else {
                    img.classList.add("select");
                }
            } else {
                if (bol == true) {
                    img.classList.add("select");
                } else {
                    img.classList.remove("select");
                }
            }
        });
    }
    return (
        <div className={Styles.lowerSection02} ref={lw2}>
            <LineCItem icon={`/assets/icons/password_14562503.png`} txt={
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga"}
                eventH={(e)=>clickEnvent(e)} pos={arr[0]}
                >
            </LineCItem>
            <LineCItem icon={`/assets/icons/password_14562503.png`} txt={
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga"}
                eventH={(e)=>clickEnvent(e)} pos={arr[1]}
                >
            </LineCItem>
            <LineCItem icon={`/assets/icons/password_14562503.png`} txt={
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga"}
                eventH={(e)=>clickEnvent(e)} pos={arr[2]}
                >
            </LineCItem>
            <LineCItem icon={`/assets/icons/password_14562503.png`} txt={
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga"}
                eventH={(e)=>clickEnvent(e)} pos={arr[3]}
                >
            </LineCItem>
            <LineCItem icon={`/assets/icons/password_14562503.png`} txt={
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga"}
                eventH={(e)=>clickEnvent(e)} pos={arr[5]}
                >
            </LineCItem>
            <LineCItem icon={`/assets/icons/password_14562503.png`} txt={
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga"}
                eventH={(e)=>clickEnvent(e)} pos={arr[6]}
                >
            </LineCItem>
        </div>
    );
}*/