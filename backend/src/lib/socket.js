import {Server } from "socket.io"
import express from "express"
import http from "http"


const app = express();
const server = http.createServer(app)

const io = new Server(server,{
    cors: {
        origin: ["http://localhost:5173"]
    }
})

export function getReceiverSocketId(userid)   {
    return userSocketMap[userid];

}





        //{userid:socketid}
        const userSocketMap ={}


io.on("connection",(socket) =>{
    console.log("A user connected", socket.id)

    const userid = socket.handshake.query.userid;
    if(userid) userSocketMap[userid] = socket.id


    io.emit("getonlineusers" , Object.keys(userSocketMap));

    socket.on("disconnect", ()=>{
        console.log("A user disconnected",socket.id)
        delete userSocketMap[userid];
        io.emit("getonlineusers" , Object.keys(userSocketMap));
    });
})



export {io,app,server}