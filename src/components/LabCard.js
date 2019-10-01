import React from 'react';

import '../assets/css/block/labCard.css';

export default function LabCard(props) {
    const conectado = props.laboratorio.status.toLowerCase() === "conectado";

    return (
        <div className="labCard">
            <div className="labCard-header">
                <div className="labCard-number">
                    <span className="labCard-number-text">{props.laboratorio.numero}</span>
                </div>
                <p className="labCard-name labCard-hover">
                    {props.laboratorio.nome_usual}

                    <span className="labCard-info">{props.laboratorio.nome}</span>
                </p>
            </div>
            <div className="labCard-body">
                <div className={`labCard-icons ${props.laboratorio.status.toLowerCase()}`}>
                    <ConectadoIcon status={props.laboratorio.status} />
                    <TemperaturaIcon temperatura={props.laboratorio.temperatura} conectado={conectado} />
                    <UmidadeIcon umidade={props.laboratorio.umidade} conectado={conectado} />
                    <MovimentoIcon movimento={props.laboratorio.movimento} conectado={conectado} />
                    <PortaIcon fechado={props.laboratorio.fechado} conectado={conectado} />
                </div>
            </div>
        </div>
    );
}

const ConectadoIcon = (props) => {
    const iconClass = "fas fa-plug";
    let colorClass;

    const status = props.status.toLowerCase();
    if (status === "conectado") {
        colorClass = "success";
    } else if (status === "desconectado") {
        colorClass = "danger";
    } else {
        colorClass = "dark";
    }
    const text = props.status;
    return (
        <Icon colorClass={colorClass} iconClass={iconClass} text={text} />
    );
};

const TemperaturaIcon = (props) => {
    let iconClass = "fas fa-thermometer-half";
    let colorClass = "dark";
    let text = "Desconectado";
    if (props.conectado) {
        if (props.temperatura <= 23) {
            colorClass = "success";
        } else if (props.temperatura <= 25) {
            colorClass = "warning";
        } else {
            colorClass = "danger";
            iconClass = "fas fa-thermometer-full";
        }

        text = `${props.temperatura}ºC`;
    }
    return (
        <Icon colorClass={colorClass} iconClass={iconClass} text={text} />
    );
};

const UmidadeIcon = (props) => {
    const iconClass = "fas fa-tint";
    let colorClass = "dark";
    let text = "Desconectado";
    if (props.conectado) {
        if (props.umidade >= 30) {
            colorClass = "success";
        } else if (props.umidade >= 20) {
            colorClass = "warning";
        } else {
            colorClass = "danger";
        }
        text = `${props.umidade}%`;
    }
    return (
        <Icon colorClass={colorClass} iconClass={iconClass} text={text} />
    );
}

const MovimentoIcon = (props) => {
    const iconClass = "fas fa-running";
    let colorClass = "dark";
    let text = "Desconectado";
    if (props.conectado) {
        colorClass = props.movimento ? "success" : "dark";
        text = props.movimento ? "Movimento" : "Sem Movimento";
    }
    return (
        <Icon colorClass={colorClass} iconClass={iconClass} text={text} />
    );
}

const PortaIcon = (props) => {
    const iconClass = "fas fa-door-closed";
    let colorClass = "dark";
    let text = "Desconectado";
    if (props.conectado) {
        colorClass = props.fechado ? "success" : "danger";
        text = props.fechado ? "Fechado" : "Aberto";
    }
    return (
        <Icon iconClass={iconClass} text={text} colorClass={colorClass} />
    );
}

const Icon = (props) => {
    return (
        <div className={`labCard-icons-icon labCard-hover ${props.colorClass}`}>
            <i className={props.iconClass}></i>
            <span className="labCard-info">{props.text}</span>
        </div>
    );
};