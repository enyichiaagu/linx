import React, { useEffect } from 'react'
import Header from '../components/Header'
import Greeting from '../components/Greeting'
import PasteBar from '../components/PasteBar'
import SavedLinks from '../components/SavedLinks'
import { Redirect } from 'react-router-dom'

export default function Home({ loaded, setLoaded, setLinkSaved, setLinks, setLoggedIn, username, confirm, url, change, redirect, links, urlError, loggedIn }) {
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
                setLinks(message)
                setLoaded(true)
            } catch (error) {
                setLoaded(true)
            }
        }
        fetchLinks()
    },[setLinks, setLoggedIn, setLinkSaved, setLoaded])

    return (
        <div>
            <Header options/>
            <div className="main">
                {
                    loaded ? 
                    <div>
                        <Greeting name={username}/>
                        <PasteBar confirm={confirm} url={url} change={change} redirect={redirect}/>
                        <p className="paragraph error" style={{ paddingBottom: 0}}>{urlError}</p>
                        <SavedLinks links={links}/>
                    </div> :
                    <div style={{margin: '0 auto', width: 'fit-content', paddingTop: '1em'}}>
                        <div className="lds-dual-ring"></div>
                    </div>
                }
            </div>
            { !loggedIn && <Redirect to={'/'}/> }
        </div>
    )
}
