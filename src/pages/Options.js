import React from 'react'
import Header from '../components/Header'
import LinkList from '../components/LinkList'
import BackBar from '../components/BackBar'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

function Options({ links }) {
    return (
        <div>
            <Header options/>
            <div className="main">
                <Link to="/home">
                    <BackBar destination="Home"/>
                </Link>
                {links.length > 0 && 
                <div>
                    <p className="label">Edit Links</p>
                    <LinkList options links={links} notClickable/>
                </div>
                }
                <div>
                    <p className="label" style={{marginTop:"1em"}}>Have any complaints or feedback?</p>
                    <a href="mailto:enyichiaagu@gmail.com" target="_blank" rel="noreferrer">Send a mail to Enyichi</a>
                </div>
                <Button full text="Logout" type="ghost" goto="/" style={{marginTop: "2em"}} />
            </div>
        </div>
    )
}

export default Options
