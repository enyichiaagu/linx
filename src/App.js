import React, { useState } from 'react';
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
  const [ url, setUrl ] = useState('')
  const [ newLinkState, setNewLinkState ] = useState({
    title: "",
    url: ""
  })

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

  const newLinkSave = () => {
    links.push({
      id: `${Date.now()}`,
      title: newLinkState.title,
      url: newLinkState.url
    })
    setLinks(links)
    resetUrl()
    setNewLinkState({
      title: "",
      url: ""
    })
    console.log(links)
  }

  const [ redirect, setRedirect ] = useState(false)
  const [ links, setLinks ] = useState([])
  const [ urlError, setUrlError ] = useState("")

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
            urlError={urlError}
          />
        </Route>
        <Route exact path="/edit/:id" 
          render={
            ({ match })=>
              <Edit 
                links={links} 
                id={match.params.id}
              />
          }
        />
        <Route exact path="/options">
          <Options links={links}/>
        </Route>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/new">
          <New 
            url={url} 
            nullifyRedirect={nullifyRedirect} 
            state={newLinkState} 
            titleChange={titleChange}
            urlChange={urlChange}
            save={newLinkSave}
          />
        </Route>
        <Route exact path="/delete/:id" 
          render={
            ({ match })=>
              <Delete 
                links={links} 
                id={match.params.id}
              />
          }
        />
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
      </Switch>
      <Footer/>
    </React.Fragment>
  );
}

export default App;
