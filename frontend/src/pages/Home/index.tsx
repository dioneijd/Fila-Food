import React, { useEffect, useState, FormEvent } from 'react'
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import logo from '../../assets/logo.svg';

import './styles.css'

interface loginResponse {
    data: {
        message: String
    }
}


const Home = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')  
    const [showMsg, setShowMsg] =  useState<boolean>(false)
    const history = useHistory()

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const restaurant = {
            type: 'R',
            email,
            password
        }

        try {
            setShowMsg(false)
            const login:loginResponse = await api.post('/sessions', restaurant)
            
            localStorage.setItem('loginSession', JSON.stringify(login.data))
            history.push('/control-panel')            
        } catch {
            setShowMsg(true)
        }
    }



    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Fila Food" />
                </header>
                <main>
                    <form onSubmit={handleSubmit}>
                        <h1>Fila digital, sem aglomerações</h1>
                        <br/>
                        <br/>
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="password">Senha</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        {
                            showMsg && (
                                <p>
                                    Login e/ou senha não está correto
                                </p>
                            )
                        }
                        
                        <button type="submit">Cadastrar Restaurante</button>



                        {/* <div className="btn">
                        <Link to="/control-panel">
                            <span>
                                <FiLogIn />
                            </span>
                            <strong>Entrar</strong>
                        </Link>
                        </div> */}
                        <p>Crie uma conta <Link to="/create-restaurant">aqui</Link></p>
                    </form>
                </main>
                
            </div>
        </div>
    )
}

export default Home;