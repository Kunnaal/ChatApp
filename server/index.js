const express = require('express');
const bodyParser = require("body-parser");
// const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
// app.use(cors());

app.get('/api/', (req, res) => {
    // No. of users on website
    let data = {
        'no_users': 2,
    };
    res.send(data);
});

app.get('/api/get-code/', (req, res) => {
    // console.log(String.fromCharCode(Math.floor((Math.random() * 100)/4)+97))
    let code_str = ''
    for(let i=0; i < 9; i++)
    {
        if (i%3 == 0 && i != 0)
        {
            code_str = code_str.concat('-')
        }
        code_str = code_str.concat(String.fromCharCode(Math.floor((Math.random() * 104)/4)+97))
    }

    let data = {
        "code": code_str
    };
    res.send(data);
})

app.listen(process.env.PORT||8000, () => {
    console.log('Server up @ '+ (process.env.PORT||8000));
});