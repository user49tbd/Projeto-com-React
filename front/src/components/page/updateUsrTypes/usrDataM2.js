import React from "react";
import InputC from "../../loginComponents/input";
import ButtonSubmitC from "../../loginComponents/buttonSubmit";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import Styles from "../css/signUp.module.css"
import Style from "../css/usrDataM.module.css"
import { lstMsg$ } from "../../../Observables/obsShow";
import { change2 } from "../../../App";
export default function UsrDataM2() {
    let nav = useNavigate()
    const [popLst, setPopLst] = useState([])
    let lap = useRef(null)
    let crm = useRef(null)
    const [usrData, setUsrData] = useState({ nome: "", senha: "", email: "", usrimg: "", crmimg: "" });
    let usrimg = useRef(null)
    let crmimg = useRef(null)
    const [erros, setErros] = useState({});
    let form1 = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("nome", usrData.nome);
            formData.append("senha", usrData.senha);
            formData.append("email", usrData.email);

            const fileInput = lap.current;
            //console.log("usr " + fileInput)
            if (fileInput && fileInput.files[0]) {
                formData.append("fileUsr", fileInput.files[0]);
                //console.log(fileInput.files[0])
            }
            const fileInput2 = crm.current;
            //console.log("crm " + fileInput2)
            if (fileInput2 && fileInput2.files[0]) {
                formData.append("fileCrm", fileInput2.files[0]);
                //console.log(fileInput2.files[0])
            }
            console.log(formData.get("fileUsr"))
            console.log(formData.get("fileCrm"))
            const response = await fetch("http://127.0.0.1:8080/usuario/updateU", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erro ao enviar os dados");
            }

            console.log(data.msg)
            //alert("usuário criado")
            //change2("Sucesso", "Usuário atualizado", 3)
            let path = `http://localhost:8080${data.img}`
            //console.log("path "+path)
            console.log(data)
            //localStorage.setItem("usrImg", path)
            /*
            if (data.img) {
                console.log("the value of data is ")
                console.log(data.img)
                let path = `http://localhost:8080${data.img}`
                //console.log("path "+path)
                //console.log(data)
                localStorage.setItem("usrImg", path)
            }*/
            if (data.img) {
                let path = `http://localhost:8080${data.img}`
                //console.log("path "+path)
                //console.log(data)
                localStorage.setItem("usrImg", path)
                localStorage.setItem("usrName", data.nome)
            }
            nav("/update")
            change2('Sucesso', '"Usuário atualizado', 3, lstMsg$)
            //nav("/login")
            //console.log(data)
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
            //alert("Erro ao enviar os dados. Tente novamente.");
            //change2("Erro", "Erro ao atualizar usuário", 1)
            change2('Erro', 'Erro ao atualizar usuário', 1, lstMsg$)
        }
    };
    const validarFormulario = (e) => {
        let novosErros = {};
        let err = ""
        if (e.name == "email" && !validarEmail(e.value)) {
            err = `O campo ${e.name} está no formato inválido`
        }
        if (!e.value && e.name != "conditions" && e.name != "senha") {
            err = `O campo ${e.name} é obrigatório.`

        }
        if (e.name == "usrimg") {
            if (!usrimg.current.style.backgroundImage) {
                err = `O campo ${e.name} é obrigatório.`
            } else {
                err = ""
            }

        }
        if (e.name == "crmimg") {
            if (!crmimg.current.style.backgroundImage) {
                err = `O campo ${e.name} é obrigatório.`
            } else {
                err = ""
            }

        }
        if (err != "") {
            console.log("this is the reorrrror")
            console.log(e)
            console.log(err)
        }
        return novosErros = { [e.name]: err };
    };
    function validarEmail(email) {
        // Regex para validar o formato do email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }
    function markAll() {
        let bol = true
        Object.keys(usrData).forEach((res) => {
            //console.log(res)
            let ckErr = ""
            if (res != "type" && res != "con") {
                let data = form1.current.querySelector(`[name='${res}']`);
                //console.log(data.value)
                ckErr = validarFormulario(data)
                setErros((prevErros) => ({ ...prevErros, ...ckErr }));
                let v = Object.values(ckErr)
                if (v != "") {
                    bol = false
                }
            }
        })
        return bol
    }
    useEffect(() => {
        if (usrimg.current) {
            usrimg.current.style.backgroundImage = `url('/assets/imgs/default-image.jpg')`;
        }
        if (crmimg.current) {
            crmimg.current.style.backgroundImage = `url('/assets/imgs/default-image.jpg')`;
        }
        //getConditions()
        getUsr()
    }, [])
    async function getUsr() {
        //let name = localStorage.getItem("usrName")
        let email = localStorage.getItem("email")
        let obj = { "email": email }
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
        //setConditions(result)
        //console.log("this is the res")
        //console.log(result)
        //setUsrData((prev)=>({...prev,result}))
        console.log(result)
        setVals(result)
        //console.log(result)
    }/*
    async function getUsr() {
        let name = localStorage.getItem("usrName")
        let result = await fetch(`http://127.0.0.1:8080/user/usrData2/${name}`, {
            method: "GET",
            headers: {
                "Content-Type": "Application/json"
            }
        }).then((res) => res.json()).then((res) => {
            return res
        }).catch((err) => { console.log(err) })
        console.log(result)
        setVals(result)
    }*/
    function setVals(obj) {
        Object.keys(usrData).forEach((res) => {
            //console.log(res)
            let ckErr = ""
            if (res != "type") {
                let data = form1.current.querySelector(`[name='${res}']`);
                //console.log(obj[res.toUpperCase()])
                let field = res//.toUpperCase()
                //console.log(field)
                let dataFormatada = ""
                //data.value = obj[field]
                /*if(res == "nasc"){
                    dataFormatada=new Date(obj[field]).toISOString().split('T')[0]
                    data.value = dataFormatada
                    setUsrData((prev) => ({ ...prev, [res]: dataFormatada }))
                }else*/
                console.log("the current val is " + res)
                if (res == "usrimg" || res == "crmimg") {
                    console.log("the img is " + res + " - " + obj[field])
                    let path = `http://localhost:8080${obj[field]}`
                    if (res == "usrimg") {
                        usrimg.current.style.backgroundImage = `url(${path})`
                    } else {
                        crmimg.current.style.backgroundImage = `url(${path})`
                    }
                }
                else {
                    if (field != 'senha') {
                        data.value = obj[field]
                        setUsrData((prev) => ({ ...prev, [res]: obj[field] }))
                    } else {
                        setUsrData((prev) => ({ ...prev, [res]: '' }))
                    }
                }
            }
        })
    }
    function changeImg(e) {
        const inputElements = e.target
        handleChange(e)
        if (inputElements.files) {
            let reader = new FileReader();
            reader.readAsDataURL(inputElements.files[0]);
            reader.onload = () => {
                if (inputElements.name == "usrimg") {
                    usrimg.current.style.backgroundImage = `url(${reader.result})`
                } else if (inputElements.name == "crmimg") {
                    crmimg.current.style.backgroundImage = `url(${reader.result})`
                }
                //usrimg.current.style.backgroundImage = `url(${reader.result})`
            };
        }
    }
    function handleChange(e) {
        setUsrData({ ...usrData, [e.target.name]: e.target.value })
        console.log(usrData)
    }
    function submit(e) {
        e.preventDefault()
        console.log(usrData)
        //markAll()
        let ck = markAll()
        if (ck) {
            console.log("está válido")
            change2('Sucesso', 'as informações foram enviádas', 3, lstMsg$)
            //console.log(usrData.conditions)
            handleSubmit(e)
        } else {
            console.log("está inválido")
            change2('Erro', 'campos incorretos', 1, lstMsg$)
        }
    }
    function handleBlur(e) {
        let campo = e.target.name
        setErros((prevErros) => ({ ...prevErros, ...validarFormulario(e.target) }));
    };
    function handleImgLabel(e) {
        console.log("this is lap")
        console.log(lap.current)
        let val = lap.current
        setErros((prevErros) => ({ ...prevErros, ...validarFormulario(val) }));
    }
    //--------------------------------DEL
    let val = '/'
    function navf() {
        nav(val)
    }
    function logout() {
        localStorage.setItem("usrImg", "")
        localStorage.setItem("usrName", "")
        localStorage.setItem("type", "")
        navf()
    }
    /*
    const delUsrAccount = async (e) => {
        e.preventDefault();
        try {
            //formData.append("conditions", usrData.conditions);
            let type = localStorage.getItem("type")
            let email = usrData.email
            const response = await fetch("http://127.0.0.1:8080/user/delAccount", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    type
                }),

            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erro ao excluir os dados");
            }

            console.log(data.msg)
            //alert("usuário criado")
            change2('Sucesso', 'conta excluida', 3)
            logout()
        } catch (error) {
            console.error("Erro ao excluir os dados:", error);
            //alert("Erro ao enviar os dados. Tente novamente.");
            change2('Erro', 'erro ao excluir', 1)
        }
    };*/
    const delUsrAccount = async (e) => {
        e.preventDefault();
        let data
        try {
            //formData.append("conditions", usrData.conditions);
            //let type = localStorage.getItem("type")
            let email = usrData.email
            const response = await fetch(`http://127.0.0.1:8080/usuario/delU/${email}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                /*body: JSON.stringify({
                    email,
                    type
                }),*/

            });

            data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erro ao excluir os dados");
            }

            //console.log(data.msg)
            //alert("usuário criado")
            change2('Sucesso', data.msg, 3, lstMsg$)
            logout()
        } catch (error) {
            //console.error("Erro ao excluir os dados:", error);
            //alert("Erro ao enviar os dados. Tente novamente.");
            change2('Erro', data.msgE, 1, lstMsg$)
        }
    };

    function delUsr(e) {
        e.preventDefault()
        console.log("del usr")
        delUsrAccount(e)
    }

    return (
        <div className={Style.Container}>
            <div className={Style.Sect}>
                <div className={Style.Item}>
                    <div className={Style.fieldVImg}>
                        <div className={Style.imgUsrC}>
                            <label htmlFor="usrimg" className={`${Styles.usrImg}`} ref={usrimg}
                                onClick={(lap) => handleImgLabel(lap)}
                            ></label>
                        </div>
                        {erros.usrImg && (
                            <span>{erros.usrImg}</span>
                        )}
                    </div>
                </div>
                <div className={Style.Item}></div>
            </div>
            <div className={Style.Sect}>
                <form className={Styles.mainDiv} onSubmit={submit} ref={form1}>
                    <input
                        className={`${Styles.inputImg}`}
                        type="file"
                        name="usrimg"
                        id="usrimg"
                        onChange={(e) => changeImg(e)}
                        multiple
                        ref={lap}
                        onBlur={(e) => handleBlur(e)}
                    />


                    <div className={Styles.fieldV}>
                        <InputC type="text" text="Nome" name="nome"
                            placeholder=" " handleOnChange={(e) => handleChange(e)}
                            value={usrData.nome ? usrData.nome : ''}
                            HonBlur={(e) => handleBlur(e)}></InputC>
                        {erros.nome && (
                            <span>{erros.nome}</span>
                        )}
                    </div>
                    <div className={Styles.fieldV}>
                        <InputC type="email" text="E-Mail" name="email"
                            placeholder=" " handleOnChange={handleChange}
                            value={usrData.email ? usrData.email : ''}
                            HonBlur={(e) => handleBlur(e)}></InputC>
                        {erros.email && (
                            <span>{erros.email}</span>
                        )}
                    </div>
                    <div className={Styles.fieldV}>
                        <InputC type="password" text="Senha" name="senha"
                            placeholder=" " handleOnChange={handleChange}
                            value={usrData.senha ? usrData.senha : ''}
                            HonBlur={(e) => handleBlur(e)}></InputC>
                        {erros.senha && (
                            <span>{erros.senha}</span>
                        )}
                    </div>

                    <div className={Styles.fieldV}>
                        <div className={Styles.imgUsrC2}>
                            <label htmlFor="crmimg" className={`${Styles.usrImg} ${Styles.usrImg2}`} ref={crmimg}
                                onClick={() => handleImgLabel(crm)}
                            ></label>
                        </div>
                        {erros.fileCrm && (
                            <span>{erros.fileCrm}</span>
                        )}
                    </div>
                    <input
                        className={`${Styles.inputImg}`}
                        type="file"
                        name="crmimg"
                        id="crmimg"
                        onChange={(e) => changeImg(e)}
                        multiple
                        ref={crm}
                    />

                    <ButtonSubmitC text="Send" >
                    </ButtonSubmitC>
                    <button className={Styles.delBtn} onClick={(e) => delUsr(e)}>
                        <img src="/assets/icons/delete.png">
                        </img>
                    </button>
                </form>
            </div>
        </div>
    );
}