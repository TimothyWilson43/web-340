/* ============================================ 
; Title: Assignment 1.3
; Author: Timothy Wilson
; Date: 8 August 2018
; Modified By: Timothy Wilson
; Description: This program demonstrates the 
; use of express server.
;=========================================== */

var header = require('../header.js');
console.log(header.display("Timothy", "Wilson", "wilson-assignment-2.2"));



var express = require('express');
var http = require('http');

var app = express();


app.use(function(req, res){
    console.log('In comes a request from %s', req.url);

    res.end('Hello World\n');
})

http.createServer(app).listen(8080, function()
{
    console.log('Application started on port %s', 8080);
});