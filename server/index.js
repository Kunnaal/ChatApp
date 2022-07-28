const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

app.get('/', (req, res) => {
    // No. of users on website
    let data = {
        'no_users': 2,
    };
    res.send(data);
});

app.listen(process.env.PORT||8000, () => {
    console.log('Server up @ '+ (process.env.PORT||8000));
});