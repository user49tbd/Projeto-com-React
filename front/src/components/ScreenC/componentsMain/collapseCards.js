import React from "react"
import Styles from "./css/CollapseCards.module.css"
export default function CollapseCards() {
    return (
        <main>
            <h1>Dúvidas Frequentes</h1>

            <input className={Styles.inputEl} type="radio" name="check" id="i1" />
            <label className={Styles.accordion} id="overview" htmlFor={"i1"}>
                <h1 className={Styles.title}><p>Como faço para me cadastrar na plataforma?</p></h1>
                <div className={Styles.content}>
                    <div className={Styles.wrapper}>
                        <p>
                        Basta clicar no botão "Cadastre-se" na página inicial e preencher o 
                        formulário com seus dados pessoais. Após o cadastro, você poderá acessar 
                        sua conta com seu e-mail e senha.
                        </p>
                    </div>
                </div>
            </label>

            <input className={Styles.inputEl} type="radio" name="check" id="i2" />
            <label className={Styles.accordion} id="how-does-it-work" htmlFor={"i2"}>
                <h1 className={Styles.title}><p>Como funciona a prioridade na fila de atendimento?</p></h1>
                <div className={Styles.content}>
                    <div className={Styles.wrapper}>
                        <p>
                        O sistema verifica automaticamente se você se encaixa nos 
                        critérios de prioridade (idosos, gestantes, PCDs, etc.). 
                        Caso não tenha uma condição que garanta prioridade, 
                        você pode removê-la manualmente se desejar. 
                        Idosos acima de 60 anos recebem prioridade automaticamente.
                        </p>
                    </div>
                </div>
            </label>

            <input className={Styles.inputEl} type="radio" name="check" id="i3" />
            <label className={Styles.accordion} id="inspiration" htmlFor={"i3"}>
                <h1 className={Styles.title}><p>Como saber minha posição na fila?</p></h1>
                <div className={Styles.content}>
                    <div className={Styles.wrapper}>
                        <p>
                        Sua posição na fila é exibida em tempo real no painel do usuário. 
                        Você também receberá notificações sobre alterações na ordem de atendimento.
                        </p>
                    </div>
                </div>
            </label>
            <input className={Styles.inputEl} type="radio" name="check" id="i4" />
            <label className={Styles.accordion} id="inspiration" htmlFor={"i4"}>
                <h1 className={Styles.title}><p>O que acontece se eu não comparecer ao atendimento?</p></h1>
                <div className={Styles.content}>
                    <div className={Styles.wrapper}>
                        <p>
                        Caso não compareça, sua senha será automaticamente cancelada, 
                        liberando a vaga para outro paciente. Se precisar reagendar, 
                        será necessário solicitar uma nova senha.
                        </p>
                    </div>
                </div>
            </label>
        </main>
    )
} 