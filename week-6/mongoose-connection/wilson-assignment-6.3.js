/*
============================================
; Title:  Assignment 5.3
; Author: Timothy Wilson
; Date:   07 Sep 2018
; Modified By: Timothy Wilson
; Description: This program demonstrates the
; use of Mongoose Databases.
;===========================================
*/ 

 var express = require('express');
 var http = require('http');
 var logger = require('morgan');
 var mongoose = require('mongoose');

 var mongoDB = 'mongodb://wilsonxchevy:Meatball11!!@ds249942.mlab.com:49942/ems';
 mongoose.connect(mongoDB, {
     useMongoClient: true
 });

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error: "));
db.once('open', function(){
    console.log('Application connected to mLab');
});

var app = express();
app.use(logger('dev'));

http.createServer(app).listen(3000, function(){
    console.log('Application started and listening on port 3000');
});