import React, { useEffect, useState } from 'react'
import { user } from '../Join/Join'
import './Chat.css'
//import closeIcon from "../../images/closeIcon.png";
import sendLogo from "../../images/send.png";
import socketIO from 'socket.io-client';
import ReactScrollToBottom from "react-scroll-to-bottom";
import Message from '../Message/Message.js'
const ENDPOINT = 'http://localhost:4000'
  let socket

const Chat = () => {

    const [id, setid] = useState("");
    const [messages, setMessages] = useState([])

    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        console.log(message);
        document.getElementById('chatInput').value = "";
    }
    

    useEffect(() => {
        socket =socketIO(ENDPOINT , {trasports : ['websockets']}) 


        socket.on('connect', () => {
            setid(socket.id);

        })
        console.log(socket);
        socket.emit('joined', { user })

        socket.on('welcome', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        socket.on('userJoined', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        socket.on('leave', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message)
        })
        
        return () => {
            socket.disconnect();
            socket.off();
        }
        
    }, [])
    
  return (
    <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h2>Civilised Chat</h2>
                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, id) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
                    <button onClick={send} className="sendBtn"><img src={sendLogo} alt="Send" /></button>
                </div>
            </div>

        </div>
  )
}

export default Chat