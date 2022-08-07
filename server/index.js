require('dotenv').config({path:__dirname+'/../.env'});
const express = require('express');
const router = require('./Router/router')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
app.use(cors());

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

app.listen(process.env.PORT||8000, () => {
    console.log('Server up @ '+(process.env.PORT||8000));
});
