/*
============================================
; Title:  Assignment 5.2
; Author: Timothy Wilson
; Date:   31 Aug 2018
; Modified By: Timothy Wilson
; Description: This program demonstrates the
; use of EJS templates.
;===========================================
*/ 

// requires
var express = require('express');
var http = require('http');
var path = require('path');


//app functions
var app = express();
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', "ejs");

//local composer array
var composers = [
    "Bach",
    "Mozart",
    "Beethover",
    "Verdi"
];

 
//routes
app.get('/', function(req, res){
    res.render('index', {
        names: composers
    });
});

//creating server
http.createServer(app).listen(3010, function(){
    console.log('Server started and listening on port 3010');
});

 