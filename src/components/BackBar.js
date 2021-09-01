import React from 'react'
import backIcon from '../assets/back-icon.svg'

function BackBar({ destination }) {
    return (
        <div style={{width: "fit-content"}}>
            <p className="paragraph" style={{display: "flex", alignItems: "center"}}>
                <img src={backIcon} alt ="back icon" style={{width: "1em", marginRight: "0.5em"}}/>
                Back to { destination }
            </p>
        </div>
    )
}

export default BackBar
