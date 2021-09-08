import React, { useState } from 'react'
import Button from '../components/Button'
import Header from '../components/Header'
import Link from '../components/Link'
import { Redirect } from 'react-router-dom'

function Delete({ links, id, loggedIn, setLinks, history }) {

    const [ clicked, setClicked ] = useState(false)

    const entry = links.find(link => link._id === id)
    const linkDelete = async () => {
        setClicked(true)
        const postLink = async (token) => {
          try {
              const response = await fetch(`https://linxserver.herokuapp.com/api/link/${id}`, 
              {
                  headers: {          
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'auth': token
                  },
                  method: "DELETE"
              })
              const message = await response.json()
              return message;
          } catch (error) {
              return {error: "An error occurred!"}
          }
        }
        const result = await postLink(localStorage.getItem('auth'))
        if (result.length >= 0) {
            setClicked(false)
            setLinks(result)
            history.push('/home')
        } else {
            setClicked(false)
        }
    }
    return (
        <div>
            <Header options/>
            <div className="main">
            {
                entry ?
                <div>
                    <p className="paragraph">Are you sure you want to delete this link?</p>
                    <Link notClickable title={entry.title} url={entry.url}/>
                    {
                        !clicked ? 
                        <div style={{display: "flex", alignItems: "center", marginTop: "1em"}}>
                            <Button text="Back" type="ghost" style={{marginRight: "1em"}} goto="/options"/>
                            <Button text="Delete" type="danger" onClick={linkDelete}/>
                        </div> :
                        <div style={{margin: '0 auto', width: 'fit-content'}}>
                            <div className="lds-dual-ring"></div>
                        </div>
                    }
                </div> :
                <p className="paragraph error">Link has been deleted, or an error occured</p>
            }
            </div>
            { !loggedIn && <Redirect to={'/'}/> }
        </div>
    )
}

export default Delete
