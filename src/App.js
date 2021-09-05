import React, { useEffect, useState } from 'react';
import './App.css'
import { Switch, Route } from 'react-router';
import Home from './pages/Home'
import Options from './pages/Options'
import Footer from './components/Footer'
import Landing from './pages/Landing';
import Edit from './pages/Edit';
import New from './pages/New';
import Delete from './pages/Delete';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  const [ loggedIn, setLoggedIn ] = useState(true)
  const [ url, setUrl ] = useState('')
  const [ newLinkState, setNewLinkState ] = useState({
    title: "",
    url: ""
  })
  const [ linkSaved, setLinkSaved ] = useState(false)

  const titleChange = (e) => {
    setNewLinkState({
      title: e.target.value,
      url: newLinkState.url
    })
    console.log(newLinkState)
  }

  const urlChange = (e) => {
    setNewLinkState({
      title: newLinkState.title,
      url: e.target.value
    })
    console.log(newLinkState)
  }

  const newLinkSave = async () => {
    const postLink = async (token, title, url) => {
      try {
          const response = await fetch('http://linxserver.herokuapp.com/api/link', 
          {
              headers: {          
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'auth': token
              },
              method: "POST", 
              body: JSON.stringify({
                title: title,
                url: url
              })
          })
          const message = await response.json()
          return message;
      } catch (error) {
          return {error: "An error occurred!"}
      }
    }
    const { title, url } = newLinkState
    const returned = await postLink(localStorage.getItem('auth'), title, url)

    setLinks(returned)
    resetUrl()
    setNewLinkState({
      title: "",
      url: ""
    })
    setLinkSaved(true)
    console.log(links)
  }

  const [ redirect, setRedirect ] = useState(false)
  const [ links, setLinks ] = useState([])
  const [ urlError, setUrlError ] = useState("")
  const [username, setUsername] = useState('')

  const handleConfirm = () => {
    if (!url) {
      setUrlError("No Url found!")
    } else if ( url.length < 6 || url.indexOf(".") < 1 ) {
      setUrlError("This is not a url")
    } else {
      setRedirect(true)
      setUrlError("")
    }
  }

  const nullifyRedirect = () => setRedirect(false)
  const handleUrlChange = (e) => {
    setUrl(e.target.value)
    setNewLinkState({
      title: newLinkState.title,
      url: e.target.value
    })
  }

  const resetUrl = () => setUrl("")

  useEffect(()=> {
    const run = async ()=> {
    const fetchUser = async (token) => {
      try {
          const response = await fetch('http://linxserver.herokuapp.com/api/auth/', 
          {
              headers: {          
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'auth': token
              },
              method: "GET"
          })
          const message = await response.json()
          return message;
      } catch (error) {
          return {error: "An error occurred!"}
      }
    }
    const token = localStorage.getItem('auth')
    if (token) {
      const result = await fetchUser(token)
      if (!result.error) {
        setLoggedIn(true)
        setLinks(result.links)
        setUsername(result.name)
      }
    } else {
      setLinks([])
      setLoggedIn(false)
    }}
    run()
  },[])

  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/home">
          <Home 
            confirm={handleConfirm} 
            url={url} 
            change={handleUrlChange} 
            redirect={redirect} 
            links={links}
            setLinks={setLinks}
            urlError={urlError}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            username={username}
            setLinkSaved={setLinkSaved}
          />
        </Route>
        <Route exact path="/edit/:id" 
          render={
            ({ match, history })=>
              <Edit 
                history={history}
                links={links} 
                id={match.params.id}
                loggedIn={loggedIn}
                state={newLinkState}
                setState={setNewLinkState}
                setLinks={setLinks}
                resetUrl={resetUrl}
                titleChange={titleChange}
              />
          }
        />
        <Route exact path="/options" render={({history}) => <Options links={links} loggedIn={loggedIn} setLoggedIn={setLoggedIn} history={history}/>
        }>
        </Route>
        <Route exact path="/">
            <Landing loggedIn={loggedIn}/>
        </Route>
        <Route exact path="/new">
          <New 
            url={url} 
            nullifyRedirect={nullifyRedirect} 
            state={newLinkState} 
            titleChange={titleChange}
            urlChange={urlChange}
            save={newLinkSave}
            loggedIn={loggedIn}
            linkSaved={linkSaved}
          />
        </Route>
        <Route exact path="/delete/:id" 
          render={
            ({ match, history })=>
              <Delete 
                links={links} 
                id={match.params.id}
                loggedIn={loggedIn}
                setLinks={setLinks}
                history={history}
              />
          }
        />
        <Route 
          exact 
          path="/register" 
          render={
            ({history}) =>
            <Register loggedIn={loggedIn} history={history} />
          }/>
        <Route 
          exact 
          path="/login" 
          render={
            ({history}) =>
            <Login setLinks={setLinks} loggedIn={loggedIn} setLoggedIn={setLoggedIn} history={history} setUsername={setUsername}/>
          }/>
      </Switch>
      <Footer/>
    </React.Fragment>
  );
}

export default App;
