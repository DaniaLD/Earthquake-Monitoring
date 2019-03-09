const express = require('express');
const request = require('request');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/views/'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, err => {
    err ?
        console.log(`Couldn't connect to server. ERROR => ${err}`) :
        console.log(`Connected to server successfully. PORT => localhost:${port}`);
});