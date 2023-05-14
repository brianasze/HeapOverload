import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"
import "./Homepage.css"
import PostDataService from "./services/post"
import Logo from './heapOverloadNoBackground.png'
/*
  This is the main app page. This logic doesn't really belong here and should be moved to its own page
  like home.js, but this needs to be created and added to the list of routes.
*/

function App() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([])
  const [curTag, setCurTag] = useState('');
  var tag = ''
  const [post, setPost] = useState(null)
  const [search, setSearch] = useState('');

  const location = useLocation()

  React.useEffect(()=>{
    if (tag === '' && curTag === ''){
      tag = 'computer'
    }
    else if (tag !== curTag){
      tag = curTag
    }
    else if (location.state.tag !== null){
      tag = location.state.tag
      location.state.tag = null
    }
    
    buildBase()
  },[curTag])

  React.useEffect(()=>{
    if (post !== null) {
      navigate('/viewPost', {state:post})
    }
  },[post])

  const buildBase = () => {
    if (location.state != null) {
      tag=location.state.tag
      location.state = null
    }
    setCurTag(tag)
    setSearch(tag)
    findPost('tag', tag)
  }

  const navigate = useNavigate()

  const toCreatePost = () => {
    navigate('/createPost')
}

  const getTags = (posts) => {
    var uTags = new Set()
    for (var i = 0; i < posts.length; i++){
      for (var j = 0; j < posts[i].tag.length; j++)
        uTags.add(posts[i].tag[j])
    }
    setTags(Array.from(uTags))
  }

  const onChangeSearch = e => {
    const search = e.target.value
    setSearch(search)
  }

  const findPost = (method, search) => {
    PostDataService.find(method, search)
      .then(response => {
        setPosts(response.data.data);
        getTags(response.data.data)
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div class="App" onLoad={buildBase}>
      <div class="header">
        <ul>
          <li><Link to='/'><img src={Logo} alt={'HeapOverload'}/></Link></li>
          <li><input class="search" type="text" placeholder="Search..." value={search} onChange={onChangeSearch}></input></li>
          <li><button class="button" onClick={() => {tag=search
             buildBase()}}>Search</button></li>
          <li><button class="button" onClick={toCreatePost}>Post</button></li>
          <li><Link class="button" to='/login'>Login</Link></li>
        </ul>
      </div>
      <div class="center">
        <br/>
        <h1>Posts with tag: {curTag}</h1>
        <ul>
          {posts.map((post) => {
            return (
            <li onClick={() => {setPost(post)}}>
              <h1>{post.title}</h1>
              <p>{post.content}</p>
            </li>
            )
          })}
        </ul>
        <h1>Related Tags</h1>
        <ul>
          {tags.map((tag) => {
              return (
              <li onClick={() => {setCurTag(tag)}}>
                <h1>{tag}</h1>
              </li>
              )
            })}
        </ul>
        <br/><br/>
      </div>
    </div>
  );
}

export default App;
