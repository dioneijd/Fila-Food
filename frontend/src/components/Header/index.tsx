import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

// import logo   from '../assets/logo.svg'
// import camera from '../assets/camera.svg'

export default function Header() {
  
    return (
    <header id="main-header">
        <div className="header-content">
            <Link to="/">
                {/* <img src={logo} alt="InstraNei"></img> */}
                <h1>FILA FOOD</h1>
            </Link>
            <Link to="/">
                {/* <img src={camera} alt="Criar postagem"></img> */}
                <h1>DIONEI</h1>
            </Link>
        </div>
    </header>
  )
}
