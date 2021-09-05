import React from 'react'
import Header from '../components/Header'
import LinkList from '../components/LinkList'
import BackBar from '../components/BackBar'
import { Link, Redirect } from 'react-router-dom'
import Button from '../components/Button'

function Options({ links, loggedIn, setLoggedIn, history }) {
    return (
        <div>
            <Header options/>
            <div className="main">
                <Link to="/home">
                    <BackBar destination="Home"/>
                </Link>
                {links && links.length > 0 && 
                <div>
                    <p className="label">Edit Links</p>
                    <LinkList options links={links} notClickable/>
                </div>
                }
                <div>
                    <p className="label" style={{marginTop:"1em"}}>Have any complaints or feedback?</p>
                    <a href="mailto:enyichiaagu@gmail.com" target="_blank" rel="noreferrer">Send a mail to Enyichi</a>
                </div>
                <Button full text="Logout" type="ghost"style={{marginTop: "2em"}} onClick={()=> {setLoggedIn(false); history.push('/'); localStorage.setItem('auth', '')}}/>
            </div>
            { !loggedIn && <Redirect to={'/'} />}
        </div>
    )
}

export default Options
