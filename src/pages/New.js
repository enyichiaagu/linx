import React, { useEffect } from 'react'
import Header from '../components/Header'
import LinkForm from '../components/LinkForm'

function New({ url, nullifyRedirect, state, titleChange, urlChange, save }) {
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
        </div>
    )
}

export default New
