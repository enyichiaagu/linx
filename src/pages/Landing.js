import React from 'react'
import Header from '../components/Header'
import Button from '../components/Button'
import { Redirect } from 'react-router-dom'

function Landing({ loggedIn }) {
    return (
        <div>
            <Header/>
            <div className="main">
                <p className="paragraph" style={{fontWeight: "bold", fontSize: "1.5em"}}>Save your favourite websites in one place</p>
                <p className="paragraph" style={{marginBottom: "3em"}}>Have a homepage on the internet that contains links to all your favourite websites, blogs and resources on the internet. GO!</p>
                <Button type="normal" text="Login" full goto="login"/>
                <p className="paragraph" style={{textAlign: "center"}}>Don't have an account?</p>
                <Button type="ghost" text="Register" full goto="register"/>
            </div>
            { loggedIn && <Redirect to={'/home'} />}
        </div>
    )
}

export default Landing
