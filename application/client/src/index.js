import {render} from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import App from './App';
import Adam from './About/adam'
import Bishow from './About/bishow'
import Briana from './About/briana'
import Jasmeet from './About/jasmeet'
import Ming from './About/ming'
import Sakar from './About/sakar'
import About from './About/about'
import Post from './Post/post'
import ViewPost from './Post/viewPost'
import CreatePost from './Post/createpost'
import Login from './Account/login'
import Register from './Account/register'

/*
  This is the home of the routes, meaning these are the links to the other pages.
*/
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="adam" element={<Adam />}></Route>
      <Route path="bishow" element={<Bishow />}></Route>
      <Route path="briana" element={<Briana />}></Route>
      <Route path="jasmeet" element={<Jasmeet />}></Route>
      <Route path="ming" element={<Ming />}></Route>
      <Route path="sakar" element={<Sakar />}></Route>
      <Route path="about" element={<About />}></Route>
      <Route path="post" element={<Post />}></Route>
      <Route path="viewPost" element={<ViewPost />}></Route>
      <Route path="createpost" element={<CreatePost />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="register" element={<Register />}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
