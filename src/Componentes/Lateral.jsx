import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faMapMarkedAlt, faChartBar } from '@fortawesome/free-solid-svg-icons';
import estilos from './Lateral.module.css';
import perfil from '../assets/perfil.png';
import logo from '../assets/logo-branco.png'

export function Lateral() {
    return (
        <aside className={estilos.container}>
            <header>
                <p>IOT-MAPA</p>
                <div className={estilos.perfil}>
                    <img className={estilos.avatar} src={perfil} alt="Perfil" />
                    <p className={estilos.nome}>Isabela Rocha</p>
                </div>
            </header>
            <section>
                <Link className={estilos.link} to='/inicial'>
                    <FontAwesomeIcon icon={faThermometerHalf} className={estilos.icon} />
                    Sensor
                </Link>
                <Link className={estilos.link} to='/inicial/perfil'>
                    <FontAwesomeIcon icon={faMapMarkedAlt} className={estilos.icon} />
                    Mapa
                </Link>
                <Link className={estilos.link} to='/inicial/perfil'>
                    <FontAwesomeIcon icon={faChartBar} className={estilos.icon} />
                    Gráfico
                </Link>
                <img className={estilos.logo} src={logo}/>    
            </section>
        </aside>
    );
}
