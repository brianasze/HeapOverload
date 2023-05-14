import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import "../Homepage.css"
import PostDataService from "../services/post.js"
import ReplyDataService from "../services/reply.js"
import Logo from '../heapOverloadNoBackground.png'
import "./Posts.css"

const ViewPost = () => {
    const [search, setSearch] = useState('')
    const [post, setPost] = useState({})
    const [replies, setReplies] = useState([{comment:'No Replies Yet'}])
    const [tags, setTags] = useState(['No Tags Yet'])
    const [input, setInput] = useState('')

    //get data passed in
    const location = useLocation()

    React.useEffect(()=>{
        setPost(location.state)
        setReplies(location.state.replies)
        setTags(location.state.tag)
        location.state = null
    }, [])

    const navigate = useNavigate()
    const toHome = (tag) => {
        navigate('/', {state:{tag:tag}})
    }

    const toCreatePost = () => {
        navigate('/createPost')
    }

    const onChangeSearch = e => {
        const search = e.target.value
        setSearch(search)
    }

    const onChangeInput = e => {
        const input = e.target.value
        setInput(input)
    }

    const printPost = () => {
        console.log(post)
        console.log(input)
        setInput('')
    }

    const addTag = () => {
        var newPost = post
        post.tag.push(input)
        setPost(newPost)
        var data = {
            post_id: post._id,
            author: post.author,
            tag: input
        }
        PostDataService.addTagToPost(data)
        .then(response => {
            setInput('')
            console.log(response)
        })
        .catch(e => {
            console.log(`Error = ${e}`)
        })
    }

    const addReply = () => {
        var newPost = post
        var newReply = {
            comment: input,
            post_id: post._id,
            comment_by: "636afea341d9ba12edc1bc1a"
        }
        post.replies.push(newReply)
        setPost(newPost)
        var data = {
            comment: input,
            post_id: post._id,
            comment_by: "636afea341d9ba12edc1bc1a"
        }
        ReplyDataService.addReply(data)
        .then(response => {
            setInput('')
            console.log(response)
        })
        .catch(e => {
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
                <h1>{post.title}</h1>
                <h2>{post.content}</h2>
                <br/><br/>
                <h2>Tags</h2>
                <ul class='tags'>
                    {
                        tags.map((tag) => {
                            return (
                                <li class='tags' onClick={() => {
                                    toHome(tag)
                                }
                                }>
                                    <h1>{tag}</h1>
                                </li>
                            )
                        })
                    }
                </ul>
                <h2>Replies</h2>
                <ul class='replies'>
                    {
                        replies.map((reply) => {
                            return (
                                <li class='replies'>
                                    <h1>{reply.comment}</h1>
                                </li>
                            )
                        })
                    }
                </ul>
                <div class='addButtons'>
                    <input class="search" type="text" placeholder="Tag or Reply" value={input} onChange={onChangeInput}></input>
                </div>
                <div class='addButtons'>
                    <button class="button" onClick={addTag}>Add Tag</button>
                    <button class="button"  onClick={addReply}>Add Reply</button>
                </div>
                <br/><br/>
            </div>
        </div>
    )
};

export default ViewPost;