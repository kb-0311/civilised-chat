import React, { useEffect } from 'react'
import { user } from '../Join/Join'
import closeIcon from "../../images/closeIcon.png";
import sendLogo from "../../images/send.png";
import socketIO from 'socket.io-client';

const ENDPOINT = 'http://localhost:4000'

  

const Chat = () => {

    

    useEffect(() => {
        const socket =socketIO(ENDPOINT , {trasports : ['websockets']}) 

        socket.on("connect" , ()=>{
            console.log("connected ");
          })

          socket.emit("joined" , {user})
    }, [])
    
  return (
    <div className="chatPage">
    <div className="chatContainer">
        <div className="header">
            <h2>C CHAT</h2>
            <a href="/"> <img src={closeIcon} alt="Close" /></a>
        </div>
        <div className='chatBox'>

        </div>

        <div className='inputBox'>
            <input type="text" id="chatInput" ></input>
            <button className='sendBtn'>
                <img src={sendLogo} alt="send">
                </img>
            </button>
        </div>
    </div>
    </div>
  )
}

export default Chat