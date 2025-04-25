import React from "react";
import Styles from "../css/signUp.module.css"
import { useRef, useEffect, useState } from "react";
import InputC from "../../loginComponents/input";
import ButtonSubmitC from "../../loginComponents/buttonSubmit";
import { lstMsg$ } from "../../../Observables/obsShow";
import { change2 } from "../../../App";
export default function SignUpUsr2Form() {
    let ref = useRef(null)
    let lap = useRef(null)
    let crm = useRef(null)
    //let nav = useNavigate();
    const [usrData, setUsrData] = useState({ name: "", senha: "", email: "", fileUsr: "", fileCrm: "" });
    let imgUsr = useRef(null)
    let imgUsr2 = useRef(null)

    let form1 = useRef(null)
    const [erros, setErros] = useState({});
    const validarFormulario = (e) => {
        let novosErros = {};
        let err = ""
        //console.log(e)
        //console.log("aqui está o valor " + e.name)
        if (e.name == "password" && !validarSenha(e.value)) {
            err = `O campo ${e.name} está fraco`
        }
        if (e.name == "email" && !validarEmail(e.value)) {
            err = `O campo ${e.name} está no formato inválido`
        }
        if (!e.value) {
            err = err + `O campo ${e.name} é obrigatório.`

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
            if (res != "type") {
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
    /*-------------------------------------------*/

    useEffect(() => {
        if (ref.current) {
            ref.current.style.backgroundImage = `url('/assets/imgs/default-image.jpg')`;
        }
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("nome", usrData.name);
            formData.append("senha", usrData.senha);
            formData.append("email", usrData.email);
            formData.append("role", "admin");
            const fileInput = lap.current;
            console.log("usr " + fileInput)
            if (fileInput && fileInput.files[0]) {
                formData.append("fileUsr", fileInput.files[0]);
                console.log(fileInput.files[0])
            }
            const fileInput2 = crm.current;
            console.log("crm " + fileInput2)
            if (fileInput2 && fileInput2.files[0]) {
                formData.append("fileCrm", fileInput2.files[0]);
                console.log(fileInput2.files[0])
            }
            console.log(formData.get("fileUsr"))
            console.log(formData.get("fileCrm"))
            const response = await fetch("http://127.0.0.1:8080/usuario/register", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erro ao enviar os dados");
            }

            console.log(data.msg)
            //alert("usuário criado")
            change2('Sucesso','usuário criado',3,lstMsg$)
            //nav("/login")
            console.log(data)
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
            change2('Erro','Erro ao enviar os dados',1,lstMsg$)
            //alert("Erro ao enviar os dados. Tente novamente.");
        }
    };
    function changeImg(e, imgs, rf) {
        console.log("change init img")
        const inputElements = e.target
        console.log("target " + inputElements)
        handleChange(e)
        if (inputElements.files) {
            let reader = new FileReader();
            reader.readAsDataURL(inputElements.files[0]);
            reader.onload = () => {
                imgs.current.style.backgroundImage = `url(${reader.result})`
            };
        }
        console.log("the curretn img is")
        console.log(rf.current.id)
        setErros((prevErros) => ({ ...prevErros, ...validarFormulario(rf.current) }));
    }
    function handleChange(e) {
        setUsrData({ ...usrData, [e.target.name]: e.target.value })
        console.log(usrData)
    }
    function submit(e) {
        e.preventDefault()
        console.log(usrData)
        let ck = markAll()
        if (ck) {
            console.log("está válido")
            change2('Sucesso','as informações foram enviádas',3,lstMsg$)
            //change2('Sucesso', 'as informações foram enviádas', 3)
            handleSubmit(e)
        } else {
            console.log("está inválido")
            change2('Erro','campos incorretos',1,lstMsg$)
            //change2('Erro', 'campos incorretos', 1)
        }
    }

    /*---------------------------------*/
    function handleBlur(e) {
        let campo = e.target.name
        setErros((prevErros) => ({ ...prevErros, ...validarFormulario(e.target) }));
    };
    function handleImgLabel(e) {
        console.log("this is lap")
        console.log(e.current)
        let val = e.current
        console.log(e)
        setErros((prevErros) => ({ ...prevErros, ...validarFormulario(val) }));
    }
    /*-----------------------------------*/
    return (
        <form className={Styles.mainDiv} onSubmit={submit} ref={form1}>

            <div className={Styles.fieldV}>
                <div className={Styles.imgUsrC}>
                    <label name="usr1" htmlFor="fileUsr" className={`${Styles.usrImg}`} ref={imgUsr}
                        onClick={() => handleImgLabel(lap)}
                    ></label>
                </div>
                {erros.fileUsr && (
                    <span>{erros.fileUsr}</span>
                )}
            </div>
            <input
                className={`${Styles.inputImg}`}
                type="file"
                name="fileUsr"
                id="fileUsr"
                onChange={(e) => changeImg(e, imgUsr, lap)}
                multiple
                ref={lap}
            />


            <div className={Styles.fieldV}>
                <InputC type="text" text="Name" name="name"
                    placeholder=" " handleOnChange={(e) => handleChange(e)}
                    value={usrData.name ? usrData.name : ''}
                    HonBlur={(e) => handleBlur(e)}
                ></InputC>
                {erros.name && (
                    <span>{erros.name}</span>
                )}
            </div>
            <div className={Styles.fieldV}>
                <InputC type="email" text="E-Mail" name="email"
                    placeholder=" " handleOnChange={handleChange}
                    value={usrData.email ? usrData.email : ''}
                    HonBlur={(e) => handleBlur(e)}
                ></InputC>
                {erros.email && (
                    <span>{erros.email}</span>
                )}
            </div>
            <div className={Styles.fieldV}>
                <InputC type="password" text="Senha" name="senha"
                    placeholder=" " handleOnChange={handleChange}
                    value={usrData.senha ? usrData.senha : ''}
                    HonBlur={(e) => handleBlur(e)}
                ></InputC>
                {erros.senha && (
                    <span>{erros.senha}</span>
                )}
            </div>


            <div className={Styles.fieldV}>
                <div className={Styles.imgUsrC2}>
                    <label name="crm1" htmlFor="fileCrm" className={`${Styles.usrImg} ${Styles.usrImg2}`} ref={imgUsr2}
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
                name="fileCrm"
                id="fileCrm"
                onChange={(e) => changeImg(e, imgUsr2, crm)}
                multiple
                ref={crm}
            />

            <ButtonSubmitC text="Send" >
            </ButtonSubmitC>
        </form>
    );
}