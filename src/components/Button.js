import React from 'react'
import './Button.css'
import { Link } from 'react-router-dom'

function Button({ type, text, full, style, goto, onClick }) {
    
    let styleName = type + "-style"
    styleName = full ? styleName + " full" : styleName
    return (
        <div>
            { goto ? 
                <Link to={goto}><button className={styleName} style={style} onClick={onClick}>{text}</button></Link> :
                <button className={styleName} style={style} onClick={onClick}>{text}</button>
            }
        </div>
    )
}

export default Button
