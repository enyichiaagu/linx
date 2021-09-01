import React from 'react'

export default function Greeting({ name }) {
    
    const day = new Date()
    let hour = day.getHours()
    let moment = hour >= 16 ? "Evening" : hour >= 12 ? "Afternoon" : "Morning"

    return (
        <div>
            <p className="paragraph">Good {moment}, {name}</p>
        </div>
    )
}
