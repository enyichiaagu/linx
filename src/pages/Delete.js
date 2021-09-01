import React from 'react'
import Button from '../components/Button'
import Header from '../components/Header'
import Link from '../components/Link'

function Delete({ links, id }) {
    const entry = links.find(link => link.id === id)

    return (
        <div>
            <Header options/>
            <div className="main">
                <p className="paragraph">Are you sure you want to delete this link?</p>
                <Link notClickable title={entry.title} url={entry.url}/>
                <div style={{display: "flex", alignItems: "center", marginTop: "1em"}}>
                    <Button text="Back" type="ghost" style={{marginRight: "1em"}} goto="/options"/>
                    <Button text="Delete" type="danger"/>
                </div>
            </div>
        </div>
    )
}

export default Delete
