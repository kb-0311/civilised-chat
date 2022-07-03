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

let user = [];

const server = http.createServer(app);

const io = socket(server , {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

io.on("connection" , (socket)=>{
    console.log("New Connection");
    socket.on("join" , ()=>{
      
    })
})

const port = process.env.PORT||4000 ;

server.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})