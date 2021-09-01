import React from 'react'
import logo from '../assets/logo.png'
import optionsIcon from '../assets/options-icon.svg'
import './Header.css'
import { Link } from 'react-router-dom'

export default function Header({options}) {
    return (
        <header>
            <Link to="/">
                <div className="brand">
                    <img src={logo} alt="logo"/>
                </div>
            </Link>
            {options && 
            <Link to="/options">
                <div className="options-icon">
                    <img src={optionsIcon} alt="options icon"/>
                </div>
            </Link>
            }
        </header>
    )
}
