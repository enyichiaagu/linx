import React from 'react'
import LinkList from './LinkList'

function SavedLinks({ links }) {
    const style = {
        marginTop: "1em"
    }
    return (
        links.length > 0 ? 
        <div style={style}>
            <p className="label">Saved Links</p>
            <LinkList links={links}/>
        </div> :
        <p className="paragraph">No Links found</p>
    )
}

export default SavedLinks;
