const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const req = require('express/lib/request');
const res = require('express/lib/response');
require("dotenv").config();
const Port = 3000;
let app = express();
app.use(morgan('dev'));
let movieData =[];

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
// Make a request for a user with a given ID

app.get('/',(req, res) => {
if(req.query.hasOwnProperty('i') || req.query.hasOwnProperty('t')){
    for(let i=0; i<movieData.length; i++){   
        if((movieData[i]['imdbID'] == req.query.i) ||((movieData[i]['Title']).toLowerCase() == (req.query.t).toLowerCase()) ){
            res.send(movieData[i]);
        return;}}}

axios.get('http://www.omdbapi.com'+ req.url + '&apikey=' + process.env.API_KEY)
.then(function (response) {
    let {Title,Year,imdbID} = response.data;
            movieData.push({Title,Year,imdbID});
        res.send({Title,Year,imdbID});})
.catch(function (error) {
    // handle error
})})
module.exports = app