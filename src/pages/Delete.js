import React from 'react'
import Button from '../components/Button'
import Header from '../components/Header'
import Link from '../components/Link'
import { Redirect } from 'react-router-dom'

function Delete({ links, id, loggedIn, setLinks, history }) {
    const entry = links.find(link => link._id === id)
    console.log(entry)
    const linkDelete = async () => {
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
        const result = postLink(localStorage.getItem('auth'))
        if (result.length > 0) {
            setLinks(result)
            history.push('/home')
        } else {
            console.log(error)
        }
    }
    return (
        <div>
            <Header options/>
            <div className="main">
                <p className="paragraph">Are you sure you want to delete this link?</p>
                <Link notClickable title={entry.title} url={entry.url}/>
                <div style={{display: "flex", alignItems: "center", marginTop: "1em"}}>
                    <Button text="Back" type="ghost" style={{marginRight: "1em"}} goto="/options"/>
                    <Button text="Delete" type="danger" onClick={linkDelete}/>
                </div>
            </div>
            { !loggedIn && <Redirect to={'/'}/> }
        </div>
    )
}

export default Delete
