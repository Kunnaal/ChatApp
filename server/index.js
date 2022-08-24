require('dotenv').config({path:__dirname+'/../.env'});
const express = require('express');
const router = require('./Router/router')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const socket_io = require("socket.io");
const http = require("http");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
app.use(cors({ origin: true }));

const server = http.createServer(app);
const io = socket_io(server);

mongoose
    .connect('mongodb+srv://admin:'+process.env.MONGODB_PASS+'@cluster0.nh0xtdu.mongodb.net/?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'Userbase',
    })
    .then(() => {
        console.log("Connected to mongoose...");
    })
    .catch((err) => {
        console.log("Mongo not connected, error: "+err);
    });

// Router
app.use('/api', router);

// Socket io initialization
io.on('connection', (socket) => {
    console.log(`${socket.id} has joined...`);
    // If user enters meet
    socket.on("join_room", (messagePayload) => {
        socket.join(messagePayload);
    });
    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.code).emit("receive_message", data);
    });
})

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');

    next();
});

server.listen(process.env.PORT||8000, () => {
    console.log('Server up @ '+(process.env.PORT||8000));
});
