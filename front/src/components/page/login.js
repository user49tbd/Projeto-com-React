import React from "react";
import StylesL from "./css/login.module.css"
import InputC from "../loginComponents/input"
import ButtonSubmitC from "../loginComponents/buttonSubmit"
import { useState, useRef } from "react";
import { change2 } from "../../App";
import { lstMsg$ } from "../../Observables/obsShow";
import { show$,showS$,showFgt$ } from "../../Observables/obsShow";
export default function Login() {
    let ref = useRef(null)
    let form1 = useRef(null)
    const [usrData, setUsrData] = useState({ email: "", senha: "" });
    const [erros, setErros] = useState({});

    const handleSubmit = async (e) => {
        //let typeU = usrData.type
        e.preventDefault();
        let data
        try {
            //"http://localhost:8080/auth",
            const response = await fetch("http://127.0.0.1:8080/usuario/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(usrData),
            });

            data = await response.json();

            if (!response.ok) {
                console.log(data)
                throw new Error(data.error || "Erro ao enviar os dados");
            }

            //alert("login realizado com sucesso")
            change2('Sucesso', 'login realizado com sucesso', 3,lstMsg$)
            //nav("/")
            //let path = `http://localhost:8080${data.USRIMG}`
            let path = `http://localhost:8080${data.usrimg}`
            console.log("path "+path)
            console.log(data)
            /*
            localStorage.setItem("usrImg", path)
            localStorage.setItem("usrName", data.NAME)
            localStorage.setItem("type", typeU)
            */
            localStorage.setItem("usrImg", path)
            localStorage.setItem("usrName", data.name)
            localStorage.setItem("email", data.email)
            localStorage.setItem("type", data.role)

            show$.next(false);
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
            //alert("Erro ao enviar os dados. Tente novamente.");
            change2('Erro', data.msg, 1,lstMsg$)
        }
    };

    const validarFormulario = (e) => {
        let novosErros = {};
        let err = ""
        if (!e.value) {
            err = `O ${e.name} é obrigatório.`

        }
        if (e.name == 'email') {
            if (!/\S+@\S+\.\S+/.test(e.value)) {
                err = err += ' O email deve ser válido.';
            }
        }
        return novosErros = { [e.name]: err };
    };
    function markAll() {
        let bol = true
        Object.keys(usrData).forEach((res) => {
            let ckErr = ""
            if (res != "type") {
                let data = form1.current.querySelector(`[name='${res}']`);
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
    function handleChange(e) {
        setUsrData({ ...usrData, [e.target.name]: e.target.value })

        setErros((prevErros) => ({ ...prevErros, ...validarFormulario(e.target) }));
    }
    function submit(e) {
        e.preventDefault()
        console.log(usrData)
        let ck = markAll()
        if (ck) {
            console.log("está válido")
            change2('Sucesso', 'as informações foram enviádas', 3, lstMsg$)
            //change2('Sucesso', 'as informações foram enviádas', 3)
            handleSubmit(e)
        } else {
            console.log("está inválido")
            change2('Erro', 'campos inválidos', 1, lstMsg$)
            //change2('Erro', 'campos incorretos', 1)
        }
    }
    function handleBlur(e) {
        let campo = e.target.name
        setErros((prevErros) => ({ ...prevErros, ...validarFormulario(e.target) }));
    };
    function goToSign(){
        show$.next(false);
        showS$.next(true);
    }
    function goTofgt(){
        console.log("this is the change "+showFgt$.getValue())
        show$.next(false);
        showFgt$.next(true);
    }

    return (
        <div className={`${StylesL.Pos}`}>
            <div className={StylesL.sideTitle}>
                <p>login</p>
            </div>
            <form onSubmit={submit} ref={form1}>
                <div className={StylesL.fieldV}>
                    <InputC type="email" text="Email" name="email"
                        placeholder=" " handleOnChange={(e) => handleChange(e)}
                        value={usrData.email ? usrData.email : ''}
                        HonBlur={(e) => handleBlur(e)}
                    ></InputC>
                    {erros.email && (
                        <span>{erros.email}</span>
                    )}
                </div>
                <div className={StylesL.fieldV}>
                    <InputC type="password" text="Senha" name="senha"
                        placeholder=" " handleOnChange={handleChange}
                        value={usrData.senha ? usrData.senha : ''}
                        HonBlur={(e) => handleBlur(e)}
                    ></InputC>
                    {erros.senha && (
                        <span>{erros.senha}</span>
                    )}
                </div>
                <ButtonSubmitC text="Send" ></ButtonSubmitC>
                <br/>
                <p className={StylesL.sc} onClick={goTofgt}>Esqueceu_a_senha</p>
                <br/>
                <p className={StylesL.sc} onClick={goToSign}>Realizar_cadastro</p>
            </form>
        </div>
    );
}