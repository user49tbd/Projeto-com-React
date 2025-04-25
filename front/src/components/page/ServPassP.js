import React from "react";
import { useState, useEffect } from "react";
import Style from "./css/showL.module.css"
import Styles from "./css/ServPassP.module.css"
import { showPass$ } from "../../Observables/obsShow";
import { showPassObj$ } from "../../Observables/obsShow";
import { lstMsg$ } from "../../Observables/obsShow";
import { change2 } from "../../App";
export default function ServPassP(props) {

    const [show, setShow] = useState(false)
    const [objO, setObjO] = useState(false)
    const [qtd, setQtd] = useState(0)
    const [lstP, setLstP] = useState([])

    useEffect(() => {
        //setShow(showFgt$.getValue)
        //let val = showFgt$.getValue()
        showPass$.subscribe(setShow)
        showPassObj$.subscribe(setObjO)
        //setShow(val)
        //console.log("value is "+showFgt$.getValue())
    }, [])
    useEffect(() => {
        console.log(objO)
        if (objO.idC) {
            getCard(objO.idC)
            getAllServicesQtd(objO.idC)
        }

    }, [objO])
    function closeBtn() {
        console.log("close " + showPass$.getValue())
        showPass$.next(false);
    }
    function changeVal(e) {
        setQtd(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (lstP && lstP.length > 0) {
            change2('Erro', 'Todas as senhas devem ser liberadas', 1, lstMsg$)
        } else {
            try {
                const formData = new FormData();
                formData.append("email", localStorage.getItem("email"));
                formData.append("qtd", qtd);

                let op = "http://127.0.0.1:8080/service/updateServ"
                formData.append("id", objO.idC);
                console.log(op)
                const response = await fetch(op, {
                    method: "POST",
                    body: formData,
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Erro ao enviar os dados");
                }
                change2('Sucesso', 'Quantidade Atualizada', 3, lstMsg$)
                getCard(objO.idC)
            } catch (error) {
                console.error("Erro ao enviar os dados:", error);
                change2('Erro', 'Erro ao criar service', 1, lstMsg$)
            }
        }
    };
    async function getAllServicesQtd(id) {
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

            setLstP(arr);
            return arr;
        } catch (err) {
            console.error("Erro ao buscar serviços:", err);
            return [];
        }
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
            return "http://127.0.0.1:8080" + result.usrimg;
        } catch (err) {
            console.error("Erro ao buscar usuário:", err);
            return null;
        }
    }
    /*
    async function getAllServicesQtd(id) {
        //let name = localStorage.getItem("usrName")
        let obj = { "id": id, "status": 1 }
        let result = await fetch(`http://127.0.0.1:8080/pass/lstpass`
            , {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(obj)
            }).then((res) => res.json()).then((res) => {
                //console.log(res)
                return res
            }).catch((err) => { console.log(err) })
        console.log(result)
       let arr = result.map((el)=>{
            el.img = await getUsr(el.email)
            return el
        },[])
        setLstP(result)
        return result
    }
    async function getUsr(email) {
        //let name = localStorage.getItem("usrName")
        let obj = {"email":email}
        let result = await fetch(`http://127.0.0.1:8080/usuario/getAll`
            //`http://127.0.0.1:8080/user/usrData/${name}`
            , {
            //method: "GET",
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(obj)
        }).then((res) => res.json()).then((res) => {
            //console.log(res)
            return res
        }).catch((err) => { console.log(err) })
        console.log(result)
        //setVals(result)

        return result
    }*/
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
    async function changeStatusMain(id) {
        await changeStatus(id)
        await getAllServicesQtd(objO.idC)
        console.log("end status " + id)
    }
    async function getCard(id) {
        //let name = localStorage.getItem("usrName")
        let obj = { "id": id }
        let data
        try {
            const response = await fetch(`http://127.0.0.1:8080/service/getServ`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(obj)
            });

            data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erro ao enviar os dados");
            }

            console.log(data)
            //change2('Sucesso', data.msg, 3, lstMsg$)
            //setQtd(data.qtd)
            console.log("nova qtd" + data.qtd)
            setQtd(data.qtd)
        } catch (error) {
            //console.error("Erro ao enviar os dados:", error);
            change2('Erro', data.msg, 1, lstMsg$)
        }
    }
    return (
        <div>
            {show && (
                <div className={Style.mainC}>
                    <div className={Styles.sideD}>
                        <div className={Styles.numbPass}>{qtd}</div>
                    </div>
                    <div className={Styles.mainC}>
                        <h4>Gerenciar quantidade de senhas</h4>
                        <div className={Styles.mainInput}>
                            <form onSubmit={(e) => { handleSubmit(e) }}>
                                <label htmlFor="vol">Quantidade</label>
                                <input className={Styles.elmtInput}  type="range" id="vol" name="vol" min="0" max="20" value={qtd} onChange={changeVal} />
                                <button>Submit</button>
                            </form>
                            <div className={Styles.lstPass}>
                                {lstP.map((el, index) => {
                                    return <div className={Styles.cardData} key={index}>
                                        <img src={el.img} />
                                        <p>{el.email}</p>
                                        <div className={Styles.dtBox}>
                                            <p>{el.pass}</p>
                                            <img onClick={() => changeStatusMain(el.id)} src="/assets/icons/x-mark.png" />
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    <img onClick={closeBtn} className={Style.closeBtn} src="/assets/icons/x-button.png"></img>
                </div>
            )
            }
        </div>
    );
}