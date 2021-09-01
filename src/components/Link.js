import React from 'react'
import linkIcon from '../assets/link-icon.svg'
import Button from './Button'
import './Link.css'

function Link({ id, title, url, options, notClickable }) {
    return (
        <div className="link-field">
            <div className="link-panel">
                {
                    notClickable ?
                        <div>
                            <p className="title">{ title }</p>
                        </div> :
                        <div>
                            <a href={url} className="title" target="_blank" rel="noreferrer">{ title }</a>
                            <img src={linkIcon} alt="Link Icon" className="svg-style"/>
                        </div>
                }
            </div>
            <p className="url">{ url }</p>
            {
                options &&
                <div style={{display: "flex", alignItems: "center", marginTop: "1em"}}>
                    <Button text="Edit" type="ghost" goto={"/edit/"+ id}/>
                    <Button text="Delete" type="danger" goto={"/delete/" + id } style={{marginLeft: "1em"}}/>
                </div>
            }
        </div>
    )
}

export default Link
