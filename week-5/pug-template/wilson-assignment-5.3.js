/*
============================================
; Title:  Assignment 5.3
; Author: Timothy Wilson
; Date:   31 Aug 2018
; Modified By: Timothy Wilson
; Description: This program demonstrates the
; use of pug templates.
;===========================================
*/ 

// requires
var express = require('express');
var http = require('http');
var path = require('path');
var pug = require('pug');


//app functions
var app = express();
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', "pug");
 
//routes
app.get('/', function(req, res){
    res.render('index', {
        message: "passing through a message here!"
    });
});

//creating server
http.createServer(app).listen(8080, function(){
    console.log('Server started and listening on port 8080');
});

 