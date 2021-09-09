import React from 'react'
import linkIcon from '../assets/link-icon.svg'
import Button from './Button'
import './Link.css'

function Link({ id, title, url, options, notClickable }) {

    let faviconLink;
    faviconLink = url.replace('https://', '')
    return (
        <div className="link-field">
            {
                !notClickable &&
                <div style={{marginRight: '1em'}}>
                    <img src={`https://api.faviconkit.com/${faviconLink}/45`} alt="logo" height="45px"/>
                </div> 
            }
            <div>
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
            </div>
            {
                options &&
                <div style={{display: "flex", alignItems: "center", marginTop: "1em", flexBasis: '100%'}}>
                    <Button text="Edit" type="ghost" goto={"/edit/"+ id}/>
                    <Button text="Delete" type="danger" goto={"/delete/" + id } style={{marginLeft: "1em"}}/>
                </div>
            }
        </div>
    )
}

export default Link
