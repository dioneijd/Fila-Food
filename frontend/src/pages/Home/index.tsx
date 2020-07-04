import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

import './styles.css';

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Fila Food" />
                </header>
                <main>
                    <form /*onSubmit={handleSubmit}*/>
                        <h1>Fila digital, sem aglomerações</h1>
                        <br/>
                        <br/>
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                /*onChange={handleImputChange}*/
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                /*onChange={handleImputChange}*/
                            />
                        </div>
                        <div className="btn">
                        <Link to="/control-panel">
                            <span>
                                <FiLogIn />
                            </span>
                            <strong>Entrar</strong>
                        </Link>
                        </div>
                        <p>Crie uma conta <Link to="/create-restaurant">aqui</Link></p>
                    </form>
                </main>
                
            </div>
        </div>
    )
}

export default Home;