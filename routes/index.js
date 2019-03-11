const express= require('express');
const router = express.Router();
const request = require('request');
require('dotenv').config();

router.route('/')
    .get((req, res) => res.render('index', { mapToken: process.env.MAP_TOKEN }) )
    .post((req, res) => {
        request(`https://earthquake.usgs.gov/fdsnws/event/1/query?starttime=2018-01-01&endtime=2019-03-01&format=geojson&latitude=${req.body.lat}&longitude=${req.body.lng}&maxradiuskm=100`,
            (err, response, body) => {
                err ?
                    console.log(err) : res.send(body);
            });
    });

module.exports = router;