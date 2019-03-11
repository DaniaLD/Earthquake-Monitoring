const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

// Configs
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views/'));
app.set('view engine', 'ejs');

// Routes
app.use('/', routes);

app.listen(port, err => {
    err ?
        console.log(`Couldn't connect to server. ERROR => ${err}`) :
        console.log(`Connected to server successfully. PORT => localhost:${port}`);
});