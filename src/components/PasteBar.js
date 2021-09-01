import React from 'react'
import './PasteBar.css'
import confirmIcon from '../assets/confirm-icon.svg'
import { Redirect } from 'react-router-dom'

export default function PasteBar({ confirm, url, change, redirect }) {
    return (
        <div className="paste-bar">
            <input 
                type="url" 
                className="input-bar" 
                placeholder="Paste your url here to save"
                value={url}
                onChange={change}
            />
            <button className="enter" onClick={confirm}>
                <img src={confirmIcon} alt="confirm icon" />
            </button>
            {redirect && <Redirect to="/new"/>}
        </div>
    )
}
