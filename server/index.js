const router = require('./Router/router')
const express = require('express');
const bodyParser = require("body-parser");
// const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
// app.use(cors());

// Router
app.use('/api', router);

app.listen(process.env.PORT||8000, () => {
    console.log('Server up @ '+ (process.env.PORT||8000));
});
