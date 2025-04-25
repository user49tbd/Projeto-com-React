import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Style from "../css/usrDataM.module.css"
import Styles from "../css/signUp.module.css"
import InputC from "../../loginComponents/input";
import ButtonSubmitC from "../../loginComponents/buttonSubmit";
import { lstMsg$ } from "../../../Observables/obsShow";
import { change2 } from "../../../App";
import SelectData from "../../loginComponents/selectData";
export default function UsrDataM1() {
    const nav = useNavigate();
    /*-----------------------*/
    /*-----------------------*/
    const [conditions1, setConditions1] = useState([]);

    let ref = useRef(null)
    let lap = useRef(null)
    const [usrData, setUsrData] = useState({ nome: "", senha: "", email: "", nasc: "", usrimg: "", conditions: "" });
    const [usrConditions, setConditions] = useState([]);
    let imgUsr = useRef(null)


    let form1 = useRef(null)
    const [erros, setErros] = useState({});
    const validarFormulario = (e) => {
        let novosErros = {};
        let err = ""
        //console.log(e)
        console.log("aqui está o valor " + e.name)
        if (e.name == "password" && e.value.length > 0 && !validarSenha(e.value)) {
            err = `O campo ${e.name} está fraco`
        }
        if (e.name == "email" && !validarEmail(e.value)) {
            err = `O campo ${e.name} está no formato inválido`
        }
        /*
        if (!e.value && e.name != "conditions") {
            err = `O campo ${e.name} é obrigatório.`

        }*/
        if (e.name == "usrimg") {
            //console.log(imgUsr.current.style.backgroundImage)
            if (!imgUsr.current.style.backgroundImage) {
                err = `O campo ${e.name} é obrigatório.`
            } else {
                err = ""
            }

        }
        if (err != "") {
            //console.log("this is the reorrrror")
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
    function validarSenha(senha) {
        // Regex para validar a senha
        const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regexSenha.test(senha);
    }
    function markAll() {
        let bol = true
        Object.keys(usrData).forEach((res) => {
            //console.log(res)
            let ckErr = ""
            if (res != "type" && res != "con" && res != "email") {
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
        if (ref.current) {
            ref.current.style.backgroundImage = `url('/assets/imgs/medico-web.jpg')`;
        }
        getConditions()
        getUsr()
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            console.log("is is sanding this ")
            console.log(usrData)
            formData.append("nome", usrData.nome);
            formData.append("senha", usrData.senha);
            formData.append("email", usrData.email);
            formData.append("nasc", usrData.nasc);
            //formData.append("conditions", usrData.conditions);
            /*
            usrData.conditions.forEach(item => {
                formData.append('arrCon[]', item); // Usando 'myKey[]' para indicar que é um array
            });*/
            if (usrData.conditions && usrData.conditions.length > 0) {
                usrData.conditions.forEach(item => {
                    formData.append('arrCon[]', item);
                });
            } else {
                formData.append('arrCon[]', []);
            }
            if (usrData.fileG) {
                formData.append("fileUsr", usrData.fileG);
            }
            const fileInput = lap.current;
            if (fileInput && fileInput.files[0]) {
                formData.append("fileUsr", fileInput.files[0]);
                console.log(fileInput.files[0])
            }

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
            //change2('Sucesso', 'usuário atualizado', 3)
            if (data.img) {
                let path = `http://localhost:8080${data.img}`
                //console.log("path "+path)
                //console.log(data)
                localStorage.setItem("usrImg", path)
                localStorage.setItem("usrName", data.nome)
            }
            nav("/update")
            console.log(data)
            change2('Sucesso', 'Usuário atualizado', 3, lstMsg$)
            //location.reload()
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
            change2('Erro', 'Erro ao enviar os dados', 1, lstMsg$)
            //alert("Erro ao enviar os dados. Tente novamente.");
            //change2('Erro', 'erro ao usuário atualizado', 1)
        }
    };
    async function getConditions() {
        let result = await fetch("http://127.0.0.1:8080/usuario/getCon", {
            method: "GET",
            headers: {
                "Content-Type": "Application/json"
            }
        }).then((res) => res.json()).then((res) => {
            //console.log(res)
            return res
        }).catch((err) => { console.log(err) })
        setConditions(result)
    }
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
    }
    function setVals(obj) {
        Object.keys(usrData).forEach((res) => {
            //console.log(res)
            let ckErr = ""
            console.log("this is the " + res)
            if (res != "type") {
                let data = form1.current.querySelector(`[name='${res}']`);
                let field = res//.toUpperCase()
                let dataFormatada = ""
                if (res == "nasc") {
                    dataFormatada = new Date(obj[field]).toISOString().split('T')[0]
                    data.value = dataFormatada
                    setUsrData((prev) => ({ ...prev, [res]: dataFormatada }))
                } else if (res == "usrimg") {
                    let path = `http://localhost:8080${obj[field]}`
                    imgUsr.current.style.backgroundImage = `url(${path})`
                }
                else if (res == "conditions") {
                    //console.log("this is the con")
                    obj[field].forEach((res) => {
                        console.log(res)
                        setConditions1((prev) => ([...prev, res.name]))
                    })
                    //console.log(obj[field.toLowerCase()])
                }
                else {
                    if (res != "email") {
                        data.value = obj[field]
                    }
                    setUsrData((prev) => ({ ...prev, [res]: obj[field] }))
                    if (res == "senha") {
                        setUsrData((prev) => ({ ...prev, [res]: '' }))
                    }
                }
                //setUsrData((prev) => ({ ...prev, [res]: obj[field] }))
                //console.log(data)
                //console.log(data.value)
                //ckErr = validarFormulario(data)
                /*
                setErros((prevErros) => ({ ...prevErros, ...ckErr }));
                let v = Object.values(ckErr)
                if (v != "") {
                    bol = false
                }*/
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
                imgUsr.current.style.backgroundImage = `url(${reader.result})`
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
            //change2('Sucesso', 'as informações foram enviádas', 3)
            console.log(usrData.conditions)
            handleSubmit(e)
        } else {
            console.log("está inválido")
            change2('Erro', 'campos incorretos', 1, lstMsg$)
            //change2('Erro', 'campos incorretos', 1)
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
                            <label htmlFor="usrimg" className={`${Styles.usrImg}`} ref={imgUsr}
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
                        <InputC type="text" text="Name" name="nome"
                            placeholder=" " handleOnChange={(e) => handleChange(e)}
                            value={usrData.nome ? usrData.nome : ''}
                            HonBlur={(e) => handleBlur(e)}></InputC>
                        {erros.nome && (
                            <span>{erros.nome}</span>
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
                        <input name="nasc" type="date" className={Styles.form_control} onChange={handleChange}
                            onBlur={(e) => handleBlur(e)
                            }
                            value={usrData.nasc ? usrData.nasc : ''}
                        ></input>
                        {erros.date && (
                            <span>{erros.date}</span>
                        )}
                    </div>


                    <SelectData usrD={usrData} setUsrD={setUsrData} select={conditions1}>
                        {usrConditions.map((condition, index) => (
                            <option key={index} value={condition.NAME}>{condition.NAME}</option>))
                        }
                    </SelectData>

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