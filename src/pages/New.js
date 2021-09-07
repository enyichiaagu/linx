import React, { useEffect } from 'react'
import Header from '../components/Header'
import LinkForm from '../components/LinkForm'
import { Redirect } from 'react-router-dom'

function New({ linkSaved, url, nullifyRedirect, state, titleChange, urlChange, save, loggedIn }) {
    useEffect(() => {
        nullifyRedirect()
    }) 

    return (
        <div>
            <Header options/>
            <div className="main">
                <LinkForm 
                    editUrl 
                    url={url} 
                    forceTo="/home" 
                    state={state}
                    titleChange={titleChange} 
                    urlChange={urlChange} 
                    save={save}
                />
            </div>
            { linkSaved && <Redirect to={'/home'} />}
            { !loggedIn && <Redirect to={'/'}/> }
        </div>
    )
}

export default New
