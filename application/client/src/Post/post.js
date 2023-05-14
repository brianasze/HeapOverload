import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import "../Homepage.css"
import PostDataService from "../services/post.js"
import Logo from '../heapOverloadNoBackground.png'

const Post = () => {
    const [search, setSearch] = useState('')
    const [postTitle, setTitle] = useState('')
    const [postData, setPostData] = useState('')

    //get data passed in
    const location = useLocation()

    const navigate = useNavigate()
    const toHome = () => {
        navigate('/', {state:{tag:search}})
    }

    const onChangeSearch = e => {
        const search = e.target.value
        setSearch(search)
    }

    return (
        <div class="mainBody">
            <div class="header">
                <ul>
                    <li><Link to='/'><img src={Logo} alt={'HeapOverload'}/></Link></li>
                    <li><input class="search" type="text" placeholder="Search..." value={search} onChange={onChangeSearch}></input></li>
                    <li><button class="button" onClick={toHome}>Search</button></li>
                    <li><button class="button">Post</button></li>
                    <li><Link class="button" to='/login'>Login</Link></li>
                </ul>
            </div>

            <div class="center">
                <h1>{postTitle}</h1>
                <h2>{postData}</h2>
                <h2>Replies</h2>
                <Link class="button" to="/createpost">Create Post</Link>
            </div>

            <div class="footer">
                <Link class="button" to='/about'>About</Link>
            </div>

        </div>
    )
};

export default Post;