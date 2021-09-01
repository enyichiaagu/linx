import React from 'react'
import BackBar from '../components/BackBar'
import Header from '../components/Header'
import LinkForm from '../components/LinkForm'
import { Link } from 'react-router-dom'

function Edit({ links, id }) {
    const entry = links.find(link => link.id === id)

    return (
        <div>
            <Header options/>
            <div className="main">
                <Link to="/options">
                    <BackBar destination="Options"/>
                </Link>
                <LinkForm entry={entry}/>
            </div>
        </div>
    )
}

export default Edit
