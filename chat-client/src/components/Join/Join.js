import React, { useState } from 'react'
import './Join.css'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom';

let user;

const sendUser = () => {
    user = document.getElementById('joinInput').value;
    
    document.getElementById('joinInput').value = "";
}

const Join = () => {

const [name, setname] = useState("");
  return (
    <div className="JoinPage">
        <div className="JoinContainer">
            <img src={logo} alt="logo" />
            <h1>CIVILISED</h1>
            <input onChange={(e) => {console.log(e.target.value) ;setname(e.target.value)}} placeholder="Enter Your Name" type="text" id="joinInput" />
                <Link onClick={(event) => !name ? event.preventDefault() : null} to="/chat">  
                    <button onClick={sendUser} className="joinbtn">Enter the Train 🚞</button>
                </Link>
        </div>
    </div>
  )
}

export default Join
export  {user} ;