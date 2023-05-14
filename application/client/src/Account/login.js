import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./account.css"
import AccountDataService from "../services/account"
import Logo from '../heapOverloadNoBackground.png'

const Login = () => {
    // const [errorMessages, setErrorMessages] = useState({});
    // const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [search, setSearch] = useState('')

    const navigate = useNavigate()
    const toHome = () => {
        navigate('/', {state:{tag:search}})
    }

    const toHomeBlank = () => {
        navigate('/')
    }
      
    const toCreatePost = () => {
        navigate('/createPost')
    }

    const onChangeSearch = e => {
        const search = e.target.value
        setSearch(search)
    }

    const onChangeEmail = e => {
        const email = e.target.value
        setEmail(email)
    }

    const onChangePassword = e => {
        const password = e.target.value
        setPassword(password)
    }

    const login = () => {
        var data = {
            "email": email,
            "password": password,
        }

        AccountDataService.login(data)
            .then(response => {
                alert(`${response.data.message}`)
                if (response.data.status) {
                    toHomeBlank()
                }
            })
            .catch(e => {
                alert(`${e.response.data.message}`)
                console.log(e)
            })
    }

    return (

        <div class="mainBody">
            <div class="header">
                <ul>
                    <li><Link to='/'><img src={Logo} alt={'HeapOverload'}/></Link></li>
                    <li><input class="search" type="text" placeholder="Search..." value={search} onChange={onChangeSearch}></input></li>
                    <li><button class="button" onClick={toHome}>Search</button></li>
                    <li><button class="button" onClick={toCreatePost}>Post</button></li>
                    <li><Link class="button" to='/login'>Login</Link></li>
                </ul>
            </div>
            
            <div class="center">
                <div class="login">
                    <br/>
                    <h1>User Login</h1>
                    <input type="text" placeholder="Email" required value={email} onChange={onChangeEmail}/>
                    <br/>
                    <input type="password" placeholder="Password" required value={password} onChange={onChangePassword}/>
                    <br/>
                    <input type="submit" class="button" value="Login" onClick={login} />
                    <br/>
                    <h2>Do not have an account? </h2>
                    <br/>
                    <Link class="button" to='/register'>Register</Link>
                </div>
            </div>
        </div>
    )
};

export default Login;
