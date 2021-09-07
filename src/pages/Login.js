import React, { useState } from 'react'
import Button from '../components/Button'
import Header from '../components/Header'
import { Link, Redirect } from 'react-router-dom'

function Login({ setLoaded, loggedIn, setLoggedIn, setUsername, setLinks }) {
    const [ field, setField ] = useState({
        username: "",
        password: ""
    })
    const [ clicked, setClicked ] = useState(false)

    const [ error, setError ] = useState("")

    const handleUsernameChange = (e) => {
        setField({
            username: e.target.value,
            password: field.password,
            repeatPassword: field.repeatPassword
        })

        if (e.target.value.indexOf(" ") >= 0 ) {
            setError("Username should not contain spaces")
        } else {
            setError('')
        }

        if (e.target.value[0] && e.target.value[0] !== e.target.value[0].toUpperCase()) {
            setError("Username should start with capital letters")
        }
    }

    const handleUserPassword = (e) => {
        setField({
            username: field.username,
            password: e.target.value,
            repeatPassword: field.repeatPassword
        });
        
    }

    const setToken = token => localStorage.setItem('auth', token)
    
    const fetchData = async (username, password) => {
        try {
            const response = await fetch('https://linxserver.herokuapp.com/api/auth/login', 
            {
                headers: {          
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    name: username,
                    password: password
                })
            })
            const message = await response.json()
            return message;
        } catch (error) {
            return {error: "An error occurred!"}
        }
    }

    const login = async () => {
        setError("")
        const { username, password } = field
        if (username.length < 4 ) setError("Username should be more than 4 characters")
        else if (username[0] !== username[0].toUpperCase()) return setError("Username should start with capital letters")
        else if (password.length < 6 ) setError("Password must be more than 6 characters")
        else {
            setClicked(true)
            const response = await fetchData(username, password)
            if (response.credentials) {
                setError("Wrong Username or Password")
                setClicked(false)
            }
            else if (response.error) {
                setError("An error occurred!")
                setClicked(false)
            }
            else if (response.success) {
                setLoaded(true)
                setLoggedIn(true)
                setToken(response.auth)
                setUsername(username)
            }
        }
    }

    return (
        <div>
            <Header/>
            <div className="main">
                <p className="paragraph">Login</p>
                <div>
                    <p className="label">Username</p>
                    <input type="text" onChange={handleUsernameChange} value={field.username}/>
                </div>
                <div>
                    <p className="label">Password</p>
                    <input type="password" onChange={handleUserPassword} value={field.password}/>
                </div>
                <p className="paragraph error">{error}</p>
                { !clicked ?
                    <div>
                        <Button type="normal" text="Login" full style={{marginTop: "1em"}} onClick={login}/>
                        <p className="paragraph">Don't have an account yet? <Link to="/register">Register</Link></p>
                    </div>
                     :
                    <div style={{margin: '0 auto', width: 'fit-content'}}>
                        <div className="lds-dual-ring"></div>
                    </div>
                }
            </div>
            {loggedIn && <Redirect to={'/home'}/>}
        </div>
    )
}

export default Login
