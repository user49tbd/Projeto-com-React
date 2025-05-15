import React from "react";
import InputC from "../loginComponents/input";
import SelectData from "../loginComponents/selectData";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./css/usrDataM.module.css";
import Styles from "./css/signUp.module.css";
import { lstMsg$, showCheckP$,newObj$ } from "../../Observables/obsShow";
import { change2 } from "../../App";
import ButtonSubmitC from "../loginComponents/buttonSubmit";
export default function CheckPrivP() {
    const nav = useNavigate();
    /*-----------------------*/
    /*-----------------------*/
    const [conditions1, setConditions1] = useState([]);
    const [conditions2, setConditions2] = useState([]);

    useEffect(() => {
        setConditions1(conditions2)
    }, [conditions2])

    let ref = useRef(null)
    let lap = useRef(null)
    const [usrData, setUsrData] = useState({// email: "", //senha: "", nome: "", nasc: "", usrimg: "", 
        conditions: ""
    });
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
        let isMounted = true;
        if (ref.current) {
            ref.current.style.backgroundImage = `url('/assets/imgs/medico-web.jpg')`;
        }
        const executarEfeito = async () => {
            await getConditions()
            let result = await getUsr()
            if (isMounted) {
                let val = setVals(result);
                setConditions1(val)
            }
        }
        executarEfeito();
    }, [])
    useEffect(() => {

    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            console.log("is is sanding this ")
            console.log(usrData)
            //formData.append("nome", usrData.nome);
            //formData.append("senha", usrData.senha);
            let email = localStorage.getItem("email")
            formData.append("email", email);
            //formData.append("nasc", usrData.nasc);
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
            //nav("/update")
            console.log(data)
            change2('Sucesso', 'Usuário atualizado', 3, lstMsg$)
            updateQtd()
            //location.reload()
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
            change2('Erro', 'Erro ao enviar os dados', 1, lstMsg$)
            //alert("Erro ao enviar os dados. Tente novamente.");
            //change2('Erro', 'erro ao usuário atualizado', 1)
        }
    };
    async function updateQtd() {
        await handleSubmitQtd()
        showCheckP$.next(false)
        window.location.reload();
        //console.log("this is obj")
        //console.log(newObj$.getValue().qtd)
        //console.log(newObj$.getValue())
    }
    async function getQtdF() {
        console.log("this is obj")
        //console.log(newObj$.qtd)
        //console.log(newObj$.props)
        let id =newObj$.getValue().id
        console.log("getting the id "+id)
        return newObj$.getValue().getQtd(id);
    }
    const handleSubmitQtd = async () => {
        //let typeU = usrData.type
        //e.preventDefault();
        let emailPass = localStorage.getItem("email")
        let qtd = await getQtdF();
        let pos = qtd + 1
        const hoje = new Date();
        let objPass = { pass: pos, email: emailPass, servId: newObj$.getValue().id, data: hoje }
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
        //setVals(result)
        //console.log(result)
        return result
    }
    function setVals(obj) {
        const newConditions = [];
        Object.keys(usrData).forEach((res) => {
            //console.log(res)
            let ckErr = ""
            console.log("this is the " + res)
            if (res != "type") {
                let data = form1.current.querySelector(`[name='${res}']`);
                let field = res//.toUpperCase()
                let dataFormatada = ""
                if (res == "conditions") {
                    obj[field].forEach((cond) => {
                        newConditions.push(cond.name);
                    });
                    //setConditions2(newConditions);
                }
            }
        })
        return newConditions
    }
    /*
    function handleChange(e) {
        setUsrData({ ...usrData, [e.target.name]: e.target.value })
        console.log(usrData)
    }*/
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
    //--------------------------------DEL
    let val = '/'
    function navf() {
        nav(val)
    }
    return (
        <div className={Styles.formConC}>
            <h3>informe os Privilegios</h3>
            <form className={Styles.mainDiv} onSubmit={submit} ref={form1}>
                <SelectData usrD={usrData} setUsrD={setUsrData} select={conditions1}>
                    {usrConditions.map((condition, index) => (
                        <option key={index} value={condition.NAME}>{condition.NAME}</option>))
                    }
                </SelectData>

                <ButtonSubmitC text="Send" >
                </ButtonSubmitC>
            </form>
        </div>
    );
}