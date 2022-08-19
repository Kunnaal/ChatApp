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
app.use(cors());

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
    io.on('<meet-code>', (messagePayload) => {
        console.log(messagePayload);
    })
})

server.listen(process.env.PORT||8000, () => {
    console.log('Server up @ '+(process.env.PORT||8000));
});
