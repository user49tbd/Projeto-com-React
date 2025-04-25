import React from "react";
import Style from "./css/ServiceEdit.module.css"
import InputC from "../loginComponents/input";
import ButtonSubmitC from "../loginComponents/buttonSubmit";
import { change2 } from "../../App";
import { lstMsg$ } from "../../Observables/obsShow";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import CardServiceEdit from "../ScreenC/cardServiceEdit";
export default function ServiceEdit() {
    const [cardData, setCardData] = useState({ title: "", descricao: "", cardimg: "" })
    const [cardLst, setCardLst] = useState([])
    const [erros, setErros] = useState({});

    const [field, setfield] = useState(true)
    const [currentId,setCurrentId]=useState()

    let form1 = useRef(null)
    let imgUsr = useRef(null)
    let lap = useRef(null)
    let nav = useNavigate()

    useEffect(() => {
        getServices()
    }, [])

    const validarFormulario = (e) => {
        let novosErros = {};
        let err = ""
        if (!e.value && field) {
            err = err + ` O campo ${e.name} é obrigatório.`
        }
        return novosErros = { [e.name]: err };
    };
    function markAll() {
        let bol = true
        Object.keys(cardData).forEach((res) => {
            let data = form1.current.querySelector(`[name='${res}']`);
            let ckErr = validarFormulario(data)
            setErros((prevErros) => ({ ...prevErros, ...ckErr }));
            let v = Object.values(ckErr)
            if (v != "") {
                bol = false
            }
        })
        return bol
    }
    function submit(e) {
        e.preventDefault()
        console.log(cardData)
        let ck = markAll()
        if (ck) {
            console.log("está válido")
            change2('Sucesso', 'as informações foram enviádas', 3, lstMsg$)
            handleSubmit(e)
        } else {
            console.log("está inválido")
            change2('Erro', 'campos incorretos', 1, lstMsg$)
        }
    }
    function changeImg(e) {
        const inputElements = e.target
        handleChange(e)
        if (inputElements.files) {
            let reader = new FileReader();
            reader.readAsDataURL(inputElements.files[0]);
            reader.onload = () => {
                imgUsr.current.style.backgroundImage = `url(${reader.result})`
            };
        }
        let val = lap.current
        setErros((prevErros) => ({ ...prevErros, ...validarFormulario(val) }));
    }
    function handleImgLabel(e) {
        console.log("this is lap")
        console.log(lap.current)
        let val = lap.current
        setErros((prevErros) => ({ ...prevErros, ...validarFormulario(val) }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let data=""
        try {
            const formData = new FormData();
            formData.append("title", cardData.title);
            formData.append("descricao", cardData.descricao);
            formData.append("email", localStorage.getItem("email"));
            formData.append("mednome", localStorage.getItem("usrName"));

            let op = "http://127.0.0.1:8080/service/createC"
            if(!field){
                op = "http://127.0.0.1:8080/service/updateServ"
                formData.append("id", currentId);
            }
            console.log(op)
            /*
            if (usrData.fileG) {
                formData.append("fileUsr", usrData.fileG);
            }*/
            const fileInput = lap.current;
            if (fileInput && fileInput.files[0]) {
                formData.append("fileCard", fileInput.files[0]);
                console.log(fileInput.files[0])
            }

            const response = await fetch(op, {
                method: "POST",
                body: formData,
            });

            data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erro ao enviar os dados");
            }

            console.log(data.msg)
            //alert("usuário criado")
            //nav("/login")
            console.log(data)
            change2('Sucesso', data.msg, 3, lstMsg$)
            //change2('Sucesso','usuário criado',3,lstMsg$)
            getServices()
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
            change2('Erro', data.msg, 1, lstMsg$)
            //alert("Erro ao enviar os dados. Tente novamente.");
            //change2('Erro','Erro ao enviar os dados. Tente novamente.',1,lstMsg$)
        }
    };
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
    }
    async function delServices(id) {
        let idCard = id
        let data
        try {
            const response = await fetch("http://127.0.0.1:8080/service/delServ", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({ id: idCard })
            });

            data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erro ao enviar os dados");
            }

            console.log(data.msg)
            console.log(data)
            change2('Sucesso', data.msg, 3, lstMsg$)
            getServices()
            nav("/servicedit")
        } catch (error) {
            //console.error("Erro ao enviar os dados:", error);
            change2('Erro', data.msg, 1, lstMsg$)
        }


    }
    async function getCard(id) {
        //let name = localStorage.getItem("usrName")
        let obj = { "id": id }
        let result = await fetch(`http://127.0.0.1:8080/service/getServ`
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
        setVals(result)
        setfield(false)
        //setCardData(result)
        setCurrentId(id)
        lap.current.value=""
    }
    function setVals(obj) {
        Object.keys(cardData).forEach((res) => {
            let ckErr = ""
            let data = form1.current.querySelector(`[name='${res}']`);
            let field = res
            let dataFormatada = ""
            if (res == "cardimg") {
                let path = `http://localhost:8080${obj[field]}`
                imgUsr.current.style.backgroundImage = `url(${path})`
            }
            else {
                data.value = obj[field]
                //setUsrData((prev) => ({ ...prev, [res]: obj[field] }))
                setCardData((prev) => ({ ...prev, [res]: obj[field] }))
            }
        })
    }
    function handleChange(e) {
        setCardData({ ...cardData, [e.target.name]: e.target.value })
    }
    function handleBlur(e) {
        setErros((prevErros) => ({ ...prevErros, ...validarFormulario(e.target) }));
    };
    function changeForm(){
        setfield(true)
        setVals({ title: "", descricao: "", cardimg: "" })
        imgUsr.current.style.backgroundImage = `url('/assets/imgs/default-image.jpg')`;
        lap.current.value=""
    }
    return (
        <div className={Style.Container}>
            <div className={Style.Con}>
                <div className={Style.frmCon}>
                    <div className={Style.imgF}>
                        <div className={Style.imgUsrC}>
                            <label htmlFor="cardimg" className={`${Style.usrImg}`} ref={imgUsr}
                                onClick={(lap) => handleImgLabel(lap)}
                            ></label>
                        </div>
                        {erros.cardimg && (
                            <span>{erros.cardimg}</span>
                        )}
                    </div>
                    <form onSubmit={submit} ref={form1}>
                        <h4>Servicos</h4>
                        <input
                            className={`${Style.inputImg}`}
                            type="file"
                            name="cardimg"
                            id="cardimg"
                            onChange={(e) => changeImg(e)}
                            multiple
                            ref={lap}
                            onBlur={(e) => handleBlur(e)}
                        />

                        <div className={Style.fieldV}>
                            <InputC type="text" text="Titulo" name="title"
                                placeholder=" " handleOnChange={(e) => handleChange(e)}
                                value={cardData.title ? cardData.title : ''}
                                HonBlur={(e) => handleBlur(e)}></InputC>
                            {erros.title && (
                                <span>{erros.title}</span>
                            )}
                        </div>
                        <div className={Style.fieldV}>
                            <textarea className={Style.txtArea} maxLength="50"
                                name="descricao" placeholder=" " onChange={(e) => handleChange(e)}
                                onBlur={(e) => handleBlur(e)}>
                            </textarea>
                            {erros.descricao && (
                                <span>{erros.descricao}</span>
                            )}
                        </div>
                        <ButtonSubmitC text="Send"></ButtonSubmitC>
                    </form>
                    {!field && (
                        <img onClick={changeForm} className={Style.createBtn} src="/assets/icons/new.png" />
                    )

                    }
                </div>
            </div>
            <div className={Style.servC}>
                {cardLst && (
                    cardLst.map((el, index) => {
                        return <CardServiceEdit descricao={el.descricao} mednome={el.mednome}
                            title={el.title} key={index} img={el.cardimg} idC={el.id}
                            getvals={getCard}
                            delvals={delServices}
                        ></CardServiceEdit>
                    })
                )}
            </div>
        </div>
    );
}