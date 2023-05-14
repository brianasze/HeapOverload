import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Homepage.css"
import "./post.css"
import PostDataService from '../services/post'
import Logo from '../heapOverloadNoBackground.png'

const CreatePost = () => {
  const [title, setTitle] = useState()
  const [post, setPost] = useState()
  const [tag, setTag] = useState()
  const [search, setSearch] = useState('')

  const navigate = useNavigate()
  const toHome = () => {
      navigate('/', {state:{tag:search}})
  }
  
  const toCreatePost = () => {
    navigate('/createPost')
  }

  const onChangeSearch = e => {
      const search = e.target.value
      setSearch(search)
  }

  const onChangeTitle = e => {
    const title = e.target.value
    setTitle(title)
  }

  const onChangePost = e => {
    const post = e.target.value
    setPost(post)
  }

  const onChangeTags = e => {
    const tag = e.target.value
    setTag(tag)
  }

  const createPost = () => {
    var tags = Array.from(new Set(tag.toLowerCase().split(',')))
    var trimmed = []
    console.log(tags)
    tags.forEach(element => trimmed.push(element.trim()))
    console.log(trimmed)
    var data = {
      title: title,
      author: "636afea341d9ba12edc1bc1a",
      content: post,
      tag: trimmed
    }
    PostDataService.addPost(data)
            .then(response => {
                console.log(response.data)
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
      <br/>
      <h1>Create a post</h1>
        <div class="create_post">
            <input type="text" placeholder="Title" required onChange={onChangeTitle} value={title} />
            <br/>
            <textarea placeholder="Post" rows="10" cols="60" required onChange={onChangePost} value={post}/>
            <br/>
            <input type="text" placeholder="Tags (seperate with a comma)" required onChange={onChangeTags} value={tag} />
            <br/>
            <button class="button" onClick={createPost}>Post</button>
        </div>
      </div>
    </div>
  )
};

export default CreatePost;