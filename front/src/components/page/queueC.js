import React from "react";
import Style from "./css/queueC.module.css"
import { useState, useEffect } from "react";
import { lstMsg$ } from "../../Observables/obsShow";
import { change2 } from "../../App";
export default function QueueC() {
    const [type, setType] = useState()
    const [arrPac, setArrPac] = useState([])
    const [selectF1, setSelectF] = useState(1)
    const [cardLst, setCardLst] = useState([])
    const [idServ, setIdServ] = useState()
    useEffect(() => {
        let tU = localStorage.getItem("type")
        setType(tU)
        const executarEfeito = async () => {
            let result = await getAllServicesQtd()
            console.log("this is the list")
            console.log(result)

            if(result && result.length > 0){
                let arr = await getAllUsrService(result)
                console.log("this is the full info")
                console.log(arr)

                setArrPac(arr)
            }
        }
        const exec = async () => {
            await getServices()
        }
        if (tU != "admin") {
            executarEfeito()
        } else {
            if (selectF1 == 1) {
                exec()
            }
            console.log("")
            console.log("this is a med")
        }
    }, [])
    async function getAllServicesQtd() {
        //const obj = { id: id, status: 1 };
        let email = localStorage.getItem("email")
        const obj = { email: email };

        try {
            const response = await fetch('http://127.0.0.1:8080/pass/getUPassG', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });

            const result = await response.json();
            return result
        } catch (err) {
            //console.error("Erro ao buscar serviços:", err);
            change2('Erro', "nao esta inscrito em nenhum servico", 1, lstMsg$)
            return [];
        }
    }
    async function getAllUsrService(result) {
        const arr = await Promise.all(result.map(async (el) => {
            el.usr = await getUsr(el.email);
            //console.log("this is the data "+el.img)
            return el;
        }));
        let arrT = arr.reverse()
        return arrT
    }
    async function getUsr(email) {
        const obj = { email: email };

        try {
            const response = await fetch('http://127.0.0.1:8080/usuario/getAll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });

            const result = await response.json();
            console.log(result);
            return result//"http://127.0.0.1:8080" + result.usrimg;
        } catch (err) {
            console.error("Erro ao buscar usuário:", err);
            return null;
        }
    }
    async function getServices() {
        let email = localStorage.getItem("email")
        let result = await fetch("http://127.0.0.1:8080/service/getMedServ", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({ email: email })
        }).then((res) => res.json()).then((res) => {
            //console.log(res)
            return res
        }).catch((err) => { console.log(err) })
        setCardLst(result)
        console.log(result)
    }
    async function getAllPassQtd(id) {
        const obj = { id: id, status: 1 };

        try {
            const response = await fetch('http://127.0.0.1:8080/pass/lstpass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });

            const result = await response.json();
            console.log(result);

            // Espera todas as promessas com await dentro de map
            const arr = await Promise.all(result.map(async (el) => {
                el.img = await getUsr(el.email);
                //console.log("this is the data "+el.img)
                return el;
            }));

            //setLstP(arr);

            let arrT = arr.reverse()
            setArrPac(arrT)
            console.log("this is the arr")
            console.log(arr)
            return arr;
        } catch (err) {
            console.error("Erro ao buscar serviços:", err);
            return [];
        }
    }
    function loadQueue(id) {
        console.log("this is the id " + id)
        setIdServ(id)
        getAllPassQtd(id)
        setSelectF(2)
    }
    async function changeStatus(id) {
        const obj = { id: id };

        let data
        try {
            const response = await fetch('http://127.0.0.1:8080/pass/changestatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });

            data = await response.json();

            if (!response.ok) {
                console.log(data)
                throw new Error(data.error || "Erro ao enviar os dados");
            }
            change2('Sucesso', data.msg, 3, lstMsg$)
        } catch (err) {
            console.error("Erro ao buscar usuário:", err);
            change2('Erro', data.msg, 1, lstMsg$)
        }
    }
    async function atender() {
        let arrT = arrPac.reverse()
        if (arrPac && arrPac.length > 0) {
            let id = arrT[0].id
            console.log(id)
            await changeStatus(id)
            loadQueue(idServ)
        }
    }
    return (
        <div className={Style.Container}>
            {type != "admin" && (
                <div className={Style.usrList}>
                    {arrPac && arrPac.length > 0 && (arrPac.map((el, index) => {
                        return <div className={Style.CardUsr} key={index}>
                            <div className={Style.CardH}>
                                <img src={"http://127.0.0.1:8080" + el.usr.usrimg}></img>
                                <p>{el.usr.nome}</p>
                            </div>
                            <div className={Style.CardB}>
                                {el.usr.conditions.map((cel, index) => {
                                    return <p key={index}>{cel.name}</p>
                                })
                                }
                            </div>
                        </div>
                    })
                    )}
                </div>)
            }
            {type == "admin" && selectF1 == 1 && (
                <div className={Style.servC}>
                    {cardLst && (
                        cardLst.map((el, index) => {
                            return <div className={Style.CardServ} key={index}>
                                <div className={Style.cardImbgBk}><img src={"http://127.0.0.1:8080" + el.cardimg}></img></div>
                                <div className={Style.Content}>
                                    <div className={Style.mainT}><img src="/assets/icons/hospital.png" /><p>{el.title}</p></div>
                                    <div className={Style.docInfo}><img src="/assets/icons/nurse.png" /><p>{el.mednome}</p></div>
                                    <button onClick={() => loadQueue(el.id)}>Queue</button>
                                </div>
                            </div>
                        })
                    )}
                </div>
            )}
            {type == "admin" && selectF1 == 2 && (
                <div className={Style.ConCard}>
                    {arrPac && arrPac.length == 0 && (<div>
                        <p>Não há Pacientes </p>
                    </div>)}
                    {arrPac && arrPac.length > 0 && (<div className={Style.ConCard}>
                        <div className={Style.usrList}>
                            {arrPac && arrPac.length > 0 && (arrPac.map((el, index) => {
                                return <div className={Style.CardUsr} key={index}>
                                    <div className={Style.CardH}>
                                        <img src={"http://127.0.0.1:8080" + el.img.usrimg}></img>
                                        <p>{el.img.nome}</p>
                                    </div>
                                    <div className={Style.CardB}>
                                        {el.img.conditions.map((cel, index) => {
                                            return <p key={index}>{cel.name}</p>
                                        })
                                        }
                                    </div>
                                </div>
                            })
                            )}
                        </div>
                        <div className={Style.BtnCon}>
                            <button onClick={() => atender()}>Atender</button>
                        </div>
                    </div>)}
                </div>
            )}
        </div>
    );
}