import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import axios from 'axios';

import './styles.css';

import logo from '../../assets/logo.svg';

const ControlPanel = () => {
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Fila Food" />
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>
            <form /*onSubmit={handleSubmit}*/>
                <h1>Painel de Controle</h1>
                <fieldset>
                    <legend>
                        <h2>Fila de Espera</h2>
                    </legend>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Controle de Mesas</h2>
                    </legend>

                </fieldset>
            </form>
        </div>
    )
}

export default ControlPanel;