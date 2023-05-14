import React from "react";
import { Link } from "react-router-dom";
import './about.css'
import './images.css'
import Picture from './briana.JPG';

const Briana = () => {
    return ( 
        <div class="mainBody">
            <div class="header">
                <ul>
                <li><Link class="button" to='/'>HeapOverload</Link></li>
                <li><input class="search" type="text" placeholder="Search..."></input></li>
                <li><button class="button" >Search</button></li>
                <li><Link class="button" to='/post'>Post</Link></li>
                <li><Link class="button" to='/login'>Login</Link></li>
                </ul>
            </div>
        <div class="content">
            <img class='img' src={Picture} alt='not found'/>
            <h1> Briana Sze </h1>   
            <h2> Front End Lead </h2>  
            <h3> Briana is a Front-End Lead working in a group in her Software Engineering class.
                Her primary responsibility in the group includes implementing and designing the User Interface.
                Briana is a Senior at San Francisco State University majoring in Computer Science.
                She likes to play video games with friends as a hobby during her free time.</h3>  
        </div>

        <div class="footer">
        <Link class="button" to='/about'>About</Link>
      </div>
        </div>
    )
};

export default Briana;
