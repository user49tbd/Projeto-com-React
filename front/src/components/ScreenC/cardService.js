import React from "react";
import Style from "./css/cardService.module.css"
import { useRef, useEffect, useState } from "react";
import { lstMsg$ } from "../../Observables/obsShow";
import { change2 } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";
export default function CardService(props) {
    let bkRef = useRef()
    const [qtdA, setQtdA] = useState(0)
    const [canSub, setCanSub] = useState(1)
    useEffect(() => {
        if (bkRef.current) {
            bkRef.current.style.backgroundImage = `url("${'http://127.0.0.1:8080'}${props.cardimg}")`;
            console.log(props.cardimg)
        }
    }, [props.img]);
    /*
    useEffect(async () => {
        let qtd = getQtdF()
        let obj = props.onSub
        if (qtd) {
            setQtdA(qtd)
        }
        const buscarDados = async () => {
            let up = await props.uPass()
            console.log(up)
        }
        buscarDados();
        console.log("this is the pass data")
        setCanSub(1)
        if (qtd == props.qtd || props.qtd == 0) {
            setCanSub(2)
        } else {
            if (obj) {
                if (props.id == obj.id) {
                    setCanSub(3)
                }

            } else {
                setCanSub(4)
            }
        }
    }, [])*/
    useEffect(() => {
        const executarEfeito = async () => {
            const qtd = getQtdF();
            //const obj = props.onSub;

            if (qtd) {
                setQtdA(qtd);
            }

            let up = {}
            try {
                up = await props.uPass();
                console.log(up);
            } catch (erro) {
                console.error("Erro ao buscar uPass:", erro);
            }

            //console.log(obj)


            console.log("this is the pass data");
            console.log(up)
            setCanSub(1);

            if (qtd === props.qtd || props.qtd === 0) {
                setCanSub(2);
            } else {
                if (up.serv_id) {
                    if (props.id === up.serv_id) {
                        setCanSub(3);
                    }
                    else {
                        console.log("here is 4")
                        setCanSub(4);
                    }
                }
            }
        };

        executarEfeito();
    }, []);
    function getQtdF() {
        return props.getQtd(props.id);
    }
    const handleSubmit = async () => {
        //let typeU = usrData.type
        //e.preventDefault();
        let emailPass = localStorage.getItem("email")
        let qtd = await getQtdF();
        let pos = qtd + 1
        const hoje = new Date();
        let objPass = { pass: pos, email: emailPass, servId: props.id, data: hoje }
        let data
        try {
            //"http://localhost:8080/auth",
            const response = await fetch("http://127.0.0.1:8080/pass/insertpass", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(objPass),
            });

            data = await response.json();

            if (!response.ok) {
                console.log(data)
                throw new Error(data.error || "Erro ao enviar os dados");
            }

            //alert("login realizado com sucesso")
            change2('Sucesso', data.msg, 3, lstMsg$)
        } catch (error) {
            change2('Erro', data.msg, 1, lstMsg$)
        }
    };
    async function submit() {
        let role = localStorage.getItem("type")
        if (role != "admin") {
            await handleSubmit()
            const qtd = getQtdF();
            if (qtd) {
                setQtdA(qtd);
            }
            window.location.reload();
        }else{
            change2('Erro','Médicos não podem se inscrever.', 1, lstMsg$)
        }
        //nav(location.pathname, { replace: true });
    }
    return (
        <div className={Style.Item} ref={bkRef}>
            <div className={Style.bkOp}></div>
            <div className={Style.qtdSlot}>{qtdA}/{props.qtd}</div>
            <div className={Style.Content}>
                <div className={Style.mainT}><img src="/assets/icons/hospital.png" /><p>{props.title}</p></div>
                <div className={Style.docInfo}><img src="/assets/icons/nurse.png" /><p>{props.mednome}</p></div>
                <p>
                    {props.mednome}
                </p>
                {
                    canSub === 1 ? (
                        <button onClick={submit}>inscrever-se</button>
                    ) : canSub === 2 ? (
                        <div className={Style.MsgSub}><p>Não há senhas disponíveis.</p></div>
                    ) : canSub === 3 ? (
                        <div className={Style.MsgSub}><p>Inscrito</p></div>
                    ) : canSub === 4 ? (
                        null
                    ) : null
                }
            </div>
        </div>
    );
}