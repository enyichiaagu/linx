import React, { useState } from 'react'
import Button from '../components/Button'
import Header from '../components/Header'
import { Link, Redirect } from 'react-router-dom'

function Register({history, loggedIn}) {
    const [ field, setField ] = useState({
        username: "",
        password: "",
        repeatPassword: ""
    })

    const [ error, setError ] = useState('')

    const handleUsernameChange = (e) => {
        setField({
            username: e.target.value,
            password: field.password,
            repeatPassword: field.repeatPassword
        });
        if (e.target.value.indexOf(" ") >= 0 ) {
            setError("Username should not contain spaces")
        } else {
            setError('')
        }

        if (e.target.value[0] && e.target.value[0] !== e.target.value[0].toUpperCase()) {
            setError("Username should start with capital letters")
        }
        console.log(field)
    }

    const handleUserPassword = (e) => {
        setField({
            username: field.username,
            password: e.target.value,
            repeatPassword: field.repeatPassword
        });
        
    }

    const handleRepeatPassword = (e) => {
        setField({
            username: field.username,
            password: field.password,
            repeatPassword: e.target.value
        });
    }

    const fetchData = async (username, password) => {
        try {
            const response = await fetch('https://linxserver.herokuapp.com/api/auth/register', 
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

    const register = async () => {
        setError("")
        const { username, password, repeatPassword } = field
        if (username.length < 4 ) return setError("Username should be more than 4 characters")
        else if (username[0] !== username[0].toUpperCase()) return setError("Username should start with capital letters")
        else if (password.length < 6 ) return setError("Password must be more than 6 characters")
        else if (password !== repeatPassword) return setError("Passwords don't match")
        else {
            const response = await fetchData(username, password)
            if (response.name) setError("Oops. Someone already has the name")
            else if (response.error) setError("An error occurred. Try again.")
            else if (response.user) history.push('/login')
        }
    }

    return (
        <div>
            <Header/>
            <div className="main">
                <p className="paragraph">Register</p>
                <div>
                    <p className="label">Username</p>
                    <input 
                        type="text" 
                        onChange={handleUsernameChange} 
                        value={field.username} 
                        maxLength={20}
                    />
                </div>
                <div>
                    <p className="label">Password</p>
                    <input 
                        type="password"
                        onChange={handleUserPassword}
                        value={field.password}
                    />
                </div>
                <div>
                    <p className="label">Repeat Password</p>
                    <input 
                        type="password"
                        onChange={handleRepeatPassword}
                        value={field.repeatPassword}
                    />
                </div>
                <p className="paragraph error">{error}</p>
                <Button type="normal" text="Register" full style={{marginTop: "1em"}} onClick={register}/>
                <p className="paragraph">Already have an account? <Link to="/login">Login</Link></p>
            </div>
            { loggedIn && <Redirect to={'/home'} />}
        </div>
    )
}

export default Register
