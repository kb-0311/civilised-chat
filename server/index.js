const http = require("http");
const express = require('express');
const cors = require("cors");
const socket = require("socket.io");
const dotenv = require("dotenv");
const { log } = require("console");

const app = express();
app.use(cors());
app.get("/",(req,res)=>{
    res.send("HELL ITS WORKING");
})

let users = [{}];

const server = http.createServer(app);

const io = socket(server , {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

io.on("connection" , (socket)=>{
    console.log("New Connection");
    socket.on('joined',({user})=>{
      users[socket.id]=user;
      console.log(`${user} has joined `);
      socket.broadcast.emit('userJoined',{user:"KB :",message:` ${users[socket.id]} has joined`});
      socket.emit('welcome',{user:"KB :",message:`Welcome to the Civilised Chat,${users[socket.id]} `})
    })

    socket.on('message',({message,id})=>{
      console.log(message);
        io.emit('sendMessage',{user:users[id],message,id});
    })
    
    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user:"KB :",message:`${users[socket.id]}  has left`});
        console.log(`user left`);
    })
    
})

const port = process.env.PORT||4000 ;

server.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})