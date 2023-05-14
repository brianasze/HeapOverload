// Ming Chen's self introduction 
import React from "react";
import { Link } from "react-router-dom";
import './images.css'
import './about.css'
import Picture from './default.png';

const Ming = () => {
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
            <h1>Ming Chen</h1>
            <h2>Back-end master</h2>
            <h3>Retire Early</h3>
        </div>
        <div class="footer">
        <Link class="button" to='/about'>About</Link>
      </div>
        </div>
    )
} ;

export default Ming;