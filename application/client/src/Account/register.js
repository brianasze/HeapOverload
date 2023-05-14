import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./account.css"
import AccountDataService from "../services/account"
import Logo from '../heapOverloadNoBackground.png'

const Register = () => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
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

    const onChangeFirstName = e => {
        const firstName = e.target.value
        setFirstName(firstName)
    }

    const onChangeLastName = e => {
        const lastName = e.target.value
        setLastName(lastName)
    }

    const onChangePassword = e => {
        const password = e.target.value
        setPassword(password)
    }

    const onChangeCPassword = e => {
        const cPassword = e.target.value
        setCPassword(cPassword)
    }

    const register = () => {
        var data = {
            email: email,
            password: password,
            username: firstName + lastName
        }

        AccountDataService.register(data)
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
            <br/>
                <h1>User Registeration</h1>
                <div class="register">
                    <div className="input-container">
                        <label>First Name: </label>
                        <input type="text" name="first" required value={firstName} onChange={onChangeFirstName}/>
                    </div><br></br>

                    <div className="input-container">
                        <label>Last Name: </label>
                        <input type="text" name="last" required value={lastName} onChange={onChangeLastName} />
                    </div><br></br>

                    <div className="input-container">
                        <label>Email Address: </label>
                        <input type="email" name="mail" required value={email} onChange={onChangeEmail}/>
                    </div><br></br>

                    <div className="radio">
                        <label>User Type:
                            <input type="radio" value="student" />
                            Student
                            <input type="radio" value="teacher" />
                            Teacher
                        </label>
                    </div><br></br>

                    <div className="input-container">
                        <label>Password: </label>
                        <input type="password" name="pword" required value={password} onChange={onChangePassword}/>
                    </div><br></br>

                    <div className="input-container">
                        <label>Confirm Password: </label>
                        <input type="password" name="cpword" required value={cPassword} onChange={onChangeCPassword}/>
                    </div><br></br>

                    <div className="button-container">
                        <button class="button" onClick={register}>Register</button><br></br><br></br>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Register;
