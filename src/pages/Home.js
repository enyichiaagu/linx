import React, { useEffect } from 'react'
import Header from '../components/Header'
import Greeting from '../components/Greeting'
import PasteBar from '../components/PasteBar'
import SavedLinks from '../components/SavedLinks'
import { Redirect } from 'react-router-dom'

export default function Home({ setLinkSaved, setLinks, setLoggedIn, username, confirm, url, change, redirect, links, urlError, loggedIn }) {
    useEffect(() => {
        setLinkSaved(false)
        const fetchLinks = async (token = localStorage.getItem('auth')) => {
            if (!token) {
                return setLoggedIn(false)
            }
            try {
                const response = await fetch('https://linxserver.herokuapp.com/api/link', 
                {
                    headers: {          
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'auth': token
                    },
                    method: "GET"
                })
                const message = await response.json()
                console.log(message)
                setLinks(message)
            } catch (error) {
                return {error: "An error occurred!"}
            }
        }
        fetchLinks()
    },[setLinks, setLoggedIn, setLinkSaved])

    return (
        <div>
            <Header options/>
            <div className="main">
                <Greeting name={username}/>
                <PasteBar confirm={confirm} url={url} change={change} redirect={redirect}/>
                <p className="paragraph error" style={{ paddingBottom: 0}}>{urlError}</p>
                <SavedLinks links={links}/>
            </div>
            { !loggedIn && <Redirect to={'/'}/> }
        </div>
    )
}
