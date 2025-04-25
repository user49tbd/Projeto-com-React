import React from "react"
import SplitV from "../Layout/ContainerSplitV";
import SplitH from "../Layout/ContainerSplitH";
import Styles from '../sectionCss.module.css'


import Card from '../ScreenC/componentsMain/Card'
import UsrPersp from '../ScreenC/componentsMain/UsrPerspectiveCard'

import CardLImgTxt from '../ScreenC/componentsMain/CardLeftImgTxt';
import RightImgTxt from '../ScreenC/componentsMain/RightImgTxt';
import ImgItem from '../ScreenC/componentsMain/ImgItem';
import ImgLayout from '../ScreenC/componentsMain/ImgLayout';

import SplitVC from '../Layout/SplitVCustom';

import LayoutTxtSlot from "../Layout/LayoutTitleSlot";
import Slot from '../ScreenC/componentsMain/Slot';

import Topic from '../ScreenC/componentsMain/Topic';

import MainTitle from '../ScreenC/componentsMain/mainTitle';

import RightContentM from '../ScreenC/componentsMain/RightContentMain';

import CardTopics from '../ScreenC/componentsMain/CardTopics';

import ImgFrame from '../ScreenC/componentsMain/imgFrame';

import LineC from "../ScreenC/componentsMain/lineC";

import UsrOpn from "../ScreenC/componentsMain/usrOpn";

import CollapseCards from "../ScreenC/componentsMain/collapseCards";
export default function MainPage() {
    return (
        <div>
            <SplitH gapItem="10%">
                <div className={Styles.ItemCard4} >
                    <SplitVC ItemW1={"100%"} ItemW2={"100%"}>
                        <div>
                            <MainTitle txt1="www.Agilidade na Saúde.com" Title="Agilidade na Saúde">
                                Bem-vindo ao nosso sistema inteligente de gerenciamento de filas médicas! 
                                Nossa plataforma foi desenvolvida para otimizar o atendimento, 
                                reduzindo o tempo de espera e tornando o processo mais prático e eficiente.
                            </MainTitle>
                        </div>
                        <div className={Styles.ItemCard4}>
                            <RightContentM>
                                <CardTopics num="1">
                                    Atendimento sem Filas
                                </CardTopics>
                                <CardTopics num="2">
                                    Prioridade Automática
                                </CardTopics>
                                <CardTopics num="3">
                                    Notificações em Tempo Real
                                </CardTopics>
                                <ImgFrame imgSrc1="/assets/imgs/medico-web.jpg"
                                    imgSrc2="/assets/imgs/corredor.jpeg">
                                </ImgFrame>
                            </RightContentM>
                        </div>
                    </SplitVC>
                </div>
                <div className={Styles.ItemCard2} >
                    <SplitVC ItemW1={"100%"} ItemW2={"40%"}>
                        <div className={Styles.ItemCard3}>
                            <LayoutTxtSlot Title="Benefícios do Nosso Sistema">
                                <Slot Title="Atendimento sem Filas" imgBK="/assets/imgs/corredor.jpeg"
                                    imgSrc="/assets/icons/settings.png">
                                    Evite esperas longas e desnecessárias! Com nosso sistema, 
                                    você pode se inscrever digitalmente e acompanhar sua posição na 
                                    fila em tempo real, garantindo mais conforto e organização no seu 
                                    atendimento.
                                </Slot>
                                <Slot Title="Prioridade Automática" imgBK="/assets/imgs/saude.jpg"
                                    imgSrc="/assets/icons/password_14562503.png">
                                    Gestantes, idosos e pessoas com deficiência têm atendimento 
                                    garantido de forma prioritária. Nosso sistema identifica 
                                    automaticamente os usuários que possuem direito a prioridade, 
                                    assegurando um fluxo eficiente e justo.
                                </Slot>
                                <Slot Title="Notificações em Tempo Real" imgBK="/assets/imgs/saude-site[2].jpg"
                                    imgSrc="/assets/icons/user_17740838.png">
                                    Fique sempre informado sobre sua posição na fila! 
                                    Receba atualizações diretamente no seu perfil e saiba exatamente 
                                    quando será chamado, sem precisar esperar no local.
                                </Slot>
                            </LayoutTxtSlot>
                        </div>
                        <div className={Styles.ItemLeftImgTxtC}>
                            <Topic imgSrc="/assets/icons/user_17740838.png">
                                Evite esperas longas e desnecessárias! Com nosso sistema
                            </Topic>
                            <Topic imgSrc="/assets/icons/user_17740838.png">
                                Gestantes, idosos e pessoas com deficiência têm atendimento garantido de forma prioritária.
                            </Topic>
                            <Topic imgSrc="/assets/icons/user_17740838.png">
                                Fique sempre informado sobre sua posição na fila! Receba atualizações diretamente no seu perfil
                            </Topic>
                        </div>
                    </SplitVC>
                </div>
            </SplitH>
            
            <SplitV className={Styles.ItemCard2}>
                <ImgLayout>
                    <ImgItem Title="Otimização de Tempo" bkImg="/assets/imgs/istockphoto-1386596147-612x612.jpg">
                        Ao reduzir filas físicas e oferecer atualizações instantâneas sobre a posição 
                        do paciente, o sistema otimiza o tempo tanto dos usuários quanto dos 
                        profissionais de saúde. Isso resulta em maior produtividade e menos 
                        espera desnecessária.
                    </ImgItem>
                    <ImgItem Title="Eficiência na Organização" bkImg="/assets/imgs/infra.jpg">
                        Com um sistema inteligente de triagem e verificação de prioridade automática, 
                        garantimos que o atendimento seja realizado de forma justa e eficaz. 
                        Além disso, relatórios detalhados ajudam na análise do tempo médio de 
                        espera e na melhoria contínua do serviço.
                    </ImgItem>
                    <ImgItem Title="Praticidade no Uso" bkImg="/assets/imgs/medico-web.jpg">
                        Nosso sistema foi projetado para ser intuitivo e acessível a todos os usuários. 
                        Com poucos cliques, o paciente pode se inscrever, visualizar sua 
                        posição e receber notificações, tornando o processo de atendimento 
                        muito mais prático e acessível.
                    </ImgItem>
                    <ImgItem Title="Usabilidade Intuitiva" bkImg="/assets/imgs/saude.png">
                        A interface do sistema foi desenvolvida com foco na experiência do usuário, 
                        garantindo navegação simples e acessível. Os botões, menus e informações 
                        são dispostos de maneira clara, proporcionando facilidade de uso para 
                        todas as idades.
                    </ImgItem>
                    <ImgItem Title="Agilidade no Atendimento" bkImg="/assets/imgs/sistema-de-informacao-em-saude-telemedicina-morsch.jpg">
                        Nosso sistema elimina a necessidade de longas esperas presenciais ao permitir 
                        que os usuários se inscrevam digitalmente na fila e acompanhem sua posição 
                        em tempo real. Isso reduz atrasos e melhora a fluidez no atendimento, 
                        garantindo uma experiência mais rápida e organizada.
                    </ImgItem>
                    <ImgItem Title="Dinamismo na Gestão de Filas" bkImg="/assets/imgs/saude.jpg">
                        A plataforma foi desenvolvida para oferecer uma experiência dinâmica tanto para 
                        pacientes quanto para médicos. A possibilidade de ajustar a fila, gerar 
                        senhas rapidamente e reorganizar atendimentos em casos emergenciais torna 
                        o sistema flexível e adaptável a diferentes situações.
                    </ImgItem>
                    <ImgItem Title="Tecnologia a Favor do Atendimento" bkImg="/assets/imgs/Qualidadeprestadores.jpg">
                        Nosso sistema alia inovação e tecnologia para transformar a 
                        experiência de pacientes e médicos. Com funcionalidades como geração 
                        automática de senhas, ajuste da fila e notificações instantâneas, 
                        oferecemos um serviço digital moderno, eficiente e confiável.
                    </ImgItem>
                </ImgLayout>
            </SplitV>
            <SplitH gapItem="0%">
                <div className={Styles.ItemCard}>
                    <LineC></LineC>
                </div>
                <div className={Styles.ItemCard}>
                    <UsrPersp imgSrc='/assets/icons/password_14562503.png'>
                        Médicos podem criar serviços personalizados e gerenciar a 
                        fila de espera em tempo real, garantindo eficiência no atendimento.
                    </UsrPersp>
                    <UsrPersp imgSrc='/assets/icons/bell.png'>
                        Idosos, gestantes e PCDs têm prioridade automática, e usuários podem 
                        gerenciar sua própria prioridade quando necessário.
                    </UsrPersp>
                    <UsrPersp imgSrc='/assets/icons/password_14562503.png'>
                        Receba alertas diretamente no perfil sobre sua posição na fila e mudanças no atendimento, 
                        evitando longas esperas.
                    </UsrPersp>
                    <UsrPersp imgSrc='/assets/icons/settings.png'>
                        Gere estatísticas detalhadas sobre tempo médio de espera e eficiência do 
                        atendimento para otimizar a gestão da clínica.
                    </UsrPersp>
                </div>
            </SplitH>
            <SplitV>
                <div className={Styles.ItemLeftImgTxtC}>
                    <CardLImgTxt imgSrc="/assets/imgs/lista_saude-publica_gestao-em-saude.jpg">
                        Com a nossa plataforma, médicos podem gerar senhas de atendimento 
                        de forma automática e gerenciar a fila com base em critérios de prioridade, 
                        garantindo atendimento eficiente para idosos, gestantes e pessoas 
                        com deficiência (PCDs).

                    </CardLImgTxt>
                    <CardLImgTxt imgSrc="/assets/imgs/saude-site[2].jpg">
                        Usuários podem cancelar suas senhas diretamente na plataforma, liberando a 
                        vaga para outros pacientes. Além disso, médicos podem ajustar a fila em 
                        casos de emergência, evitando atrasos e otimizando o fluxo de atendimento.
                    </CardLImgTxt>
                    <CardLImgTxt imgSrc="/assets/imgs/saude.png">
                        Nosso sistema gera relatórios sobre o tempo médio de atendimento, 
                        permitindo que médicos e administradores avaliem a eficiência e 
                        façam melhorias no fluxo de pacientes, tornando o serviço mais ágil e acessível.
                    </CardLImgTxt>
                </div>
                <div className={Styles.ItemCard}>
                    <RightImgTxt imgSrc="/assets/imgs/medico-web.jpg" Title="Nossa Solução">
                        Nosso sistema de gerenciamento de filas foi desenvolvido para tornar o 
                        atendimento médico mais eficiente e acessível. Com a possibilidade de 
                        inscrição digital, os usuários podem garantir sua vaga na fila sem a 
                        necessidade de deslocamento antecipado ou espera prolongada em salas 
                        de espera lotadas.
                    </RightImgTxt>
                </div>
            </SplitV>
            <SplitH gapItem="0%">
                <div className={Styles.ItemCard}>
                    <CollapseCards></CollapseCards>
                </div>
            </SplitH>
            <SplitH gapItem="0%">
                <div className={Styles.ItemCard}>
                <Card imgSrc='/assets/icons/add.png'>
                Nosso sistema foi projetado para ser acessível a todos os usuários, 
                independentemente de suas necessidades.
                    </Card>
                    <Card imgSrc='/assets/icons/bell.png'>
                        Priorizamos a otimização do tempo tanto para os pacientes quanto para os 
                        profissionais de saúde. Nosso sistema permite a inscrição digital na fila, 
                        atualização em tempo real da posição e um gerenciamento inteligente das 
                        prioridades.
                    </Card>
                    <Card imgSrc='/assets/icons/settings.png'>
                        Nosso sistema permite que os usuários gerenciem seu atendimento de forma 
                        prática e autônoma.
                    </Card>
                </div>
                <div className={Styles.ItemCard}>
                    <UsrPersp imgSrc='/assets/icons/password_14562503.png'>
                        Médicos podem criar serviços personalizados e gerenciar a 
                        fila de espera em tempo real, garantindo eficiência no atendimento.
                    </UsrPersp>
                    <UsrPersp imgSrc='/assets/icons/bell.png'>
                        Idosos, gestantes e PCDs têm prioridade automática, e usuários podem 
                        gerenciar sua própria prioridade quando necessário.
                    </UsrPersp>
                    <UsrPersp imgSrc='/assets/icons/password_14562503.png'>
                        Receba alertas diretamente no perfil sobre sua posição na fila e mudanças no atendimento, 
                        evitando longas esperas.
                    </UsrPersp>
                    <UsrPersp imgSrc='/assets/icons/settings.png'>
                        Gere estatísticas detalhadas sobre tempo médio de espera e eficiência do 
                        atendimento para otimizar a gestão da clínica.
                    </UsrPersp>
                </div>
            </SplitH>
        </div>
    )
}