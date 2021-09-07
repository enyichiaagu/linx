import React from 'react'
import BackBar from '../components/BackBar'
import Header from '../components/Header'
import LinkForm from '../components/LinkForm'
import { Link, Redirect } from 'react-router-dom'

function Edit({ history, links, id, loggedIn, state, setState, setLinks, resetUrl, titleChange }) {
    const entry = links.find(link => link._id === id)
    const linkEdit = async () => {
        const postLink = async (token, title) => {
          try {
              const response = await fetch(`https://linxserver.herokuapp.com/api/link/${id}`, 
              {
                  headers: {          
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'auth': token
                  },
                  method: "PUT", 
                  body: JSON.stringify({
                    title: title
                  })
              })
              const message = await response.json()
              return message;
          } catch (error) {
              return {error: "An error occurred!"}
          }
        }
        const returned = await postLink(localStorage.getItem('auth'), state.title)
    
        setLinks(returned)
        history.push('/home')
        resetUrl()
        setState({
          title: "",
          url: ""
        })
    }
    

    return (
        <div>
            <Header options/>
            <div className="main">
                <Link to="/options">
                    <BackBar destination="Options"/>
                </Link>
                <LinkForm title={state.title} entry={entry} save={linkEdit} titleChange={titleChange} state={state}/>
            </div>
            { !loggedIn && <Redirect to={'/'}/> }
        </div>
    )
}

export default Edit
