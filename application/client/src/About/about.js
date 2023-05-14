import React from "react";
import {Link} from "react-router-dom"
import "./buttons.css";

const About = () => {
  return (
    <div class="mainBody">
      <div class="header">
        <ul>
        <Link class="button" to='/'>HeapOverload</Link>
        <input class="search" type="text" placeholder="Search..."></input>
        <Link class="button" to='/post'>Post</Link>
        </ul>
      </div>
      <div class="tempMoveDown">
        <div class="button big-btn">
          <Link to='/adam'>Adam Garcia</Link>
        </div>
        <p/>
        <div class="button big-btn">
          <Link to='/bishow'>Bishow Bhattarai</Link>
        </div>
        <p/>
        <div class="button big-btn">
          <Link to='/briana'>Briana Sze</Link>
        </div>
        <p/>
        <div class="button big-btn">
          <Link to='/jasmeet'>Jasmeet Singh Bal</Link>
        </div>
        <p/>
        <div class="button big-btn">
          <Link to='/ming'>Ming Chen</Link>
      </div>
      <p/>
      <div class="button big-btn">
        <Link to='/sakar'>Sakar Pokhrel</Link>
      </div>
    </div>
      <div class="footer">
        <Link class="button" to='/about'>About</Link>
      </div>
    </div>
    
  )
};

export default About;
