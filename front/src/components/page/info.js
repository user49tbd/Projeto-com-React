import React from "react";
import Styles from "./css/Info.module.css"
import InfoTopic from "../ScreenC/InfoTopic";
import { useState } from "react";
export default function Info(props){

    const [activeText,setActiveText] = useState("1")
    function showTxt(e){
        setActiveText(e.target.id)
    }
    return(
        <div className={Styles.Container}>
            <div className={Styles.leftContent}>
                <InfoTopic imgSrc="/assets/icons/user_17740838.png" id={"1"} eventC={(e)=>{showTxt(e)}}>
                    Lei Geral de Proteção de Dados (LGPD)
                </InfoTopic>
                <InfoTopic imgSrc="/assets/icons/user_17740838.png" id={"2"} eventC={(e)=>{showTxt(e)}}>
                    Política de Privacidade
                </InfoTopic>
                <InfoTopic imgSrc="/assets/icons/user_17740838.png" id={"3"} eventC={(e)=>{showTxt(e)}}>
                    Acessibilidade Digital (Lei Brasileira de Inclusão - LBI)
                </InfoTopic>
                <InfoTopic imgSrc="/assets/icons/user_17740838.png" id={"4"} eventC={(e)=>{showTxt(e)}}>
                    Termos de Uso da Plataforma
                </InfoTopic>
            </div>
            <div className={Styles.rightContent}>
                <div className={activeText==1 ? Styles.Txtcontent : Styles.Nocontent}>
                    <h3>Lei Geral de Proteção de Dados (LGPD)</h3>
                    <p>
                    Nosso sistema segue rigorosamente a Lei Geral de Proteção de Dados (LGPD), 
                    garantindo a privacidade e segurança das informações de todos os usuários. 
                    Os dados pessoais coletados são utilizados exclusivamente para a prestação 
                    dos serviços oferecidos na plataforma, sendo armazenados de forma segura e 
                    protegidos contra acessos não autorizados. Além disso, os usuários têm o 
                    direito de acessar, corrigir ou solicitar a exclusão de seus dados a qualquer 
                    momento.
                    </p>
                </div>
                <div className={activeText==2 ? Styles.Txtcontent : Styles.Nocontent}>
                    <h3>Política de Privacidade</h3>
                    <p>
                    Valorizamos a transparência e a segurança dos seus dados. Nossa 
                    Política de Privacidade explica detalhadamente quais informações 
                    são coletadas, como são utilizadas e protegidas dentro da plataforma. 
                    Nenhuma informação é compartilhada com terceiros sem o devido consentimento 
                    do usuário, e todas as práticas de tratamento de dados seguem as regulamentações 
                    da LGPD. O objetivo é oferecer uma experiência segura e confiável para todos os 
                    usuários.
                    </p>
                </div>
                <div className={activeText==3 ? Styles.Txtcontent : Styles.Nocontent}>
                    <h3>Acessibilidade Digital (Lei Brasileira de Inclusão - LBI)</h3>
                    <p>
                    Nosso sistema foi desenvolvido seguindo os princípios da Lei 
                    Brasileira de Inclusão (LBI), garantindo que pessoas com deficiência 
                    ou mobilidade reduzida tenham acesso completo às funcionalidades da 
                    plataforma. Implementamos recursos como compatibilidade com leitores 
                    de tela, alto contraste, redimensionamento de texto e navegação 
                    intuitiva para tornar a experiência mais acessível e inclusiva para todos.
                    </p>
                </div>
                <div className={activeText==4 ? Styles.Txtcontent : Styles.Nocontent}>
                    <h3>Termos de Uso da Plataforma</h3>
                    <p>
                        Os Termos de Uso estabelecem as diretrizes para a utilização da plataforma, 
                        garantindo um ambiente organizado e seguro para todos os usuários. 
                        Ao utilizar o sistema, o usuário concorda com as regras de acesso, 
                        privacidade e uso responsável das funcionalidades. A plataforma reserva o 
                        direito de suspender ou banir contas que violem essas diretrizes, 
                        garantindo um serviço de qualidade e confiável para todos.
                    </p>
                </div>
            </div>
        </div>
    );
}