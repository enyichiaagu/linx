import React from 'react'
import Header from '../components/Header'
import Greeting from '../components/Greeting'
import PasteBar from '../components/PasteBar'
import SavedLinks from '../components/SavedLinks'

export default function Home({ confirm, url, change, redirect, links, urlError }) {
    return (
        <div>
            <Header options/>
            <div className="main">
                <Greeting name="Enyichi"/>
                <PasteBar confirm={confirm} url={url} change={change} redirect={redirect}/>
                <p className="paragraph error" style={{ paddingBottom: 0}}>{urlError}</p>
                <SavedLinks links={links}/>
            </div>
        </div>
    )
}
