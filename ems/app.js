/*
============================================
; Title:  Assignment 5.3
; Author: Timothy Wilson
; Date:   7 Aug 2018
; Modified By: Timothy Wilson
; Description: This program entails the ems program.
;===========================================
*/

var express = require("express");
var http = require("http");
var path = require("path");
var helmet = require("helmet");
var logger = require("morgan");
var mongoose = require("mongoose");


var app = express();
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(helmet.xssFilter());
app.use(logger("short"));

// mLab connection
var mongoDB = "mongodb://wilsonxchevy:Meatball11!!@ds249942.mlab.com:49942/ems";
mongoose.connect(mongoDB, {
    useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connected error: "));
db.once("open", function() {
    console.log("Application connected to mLab MongoDB instance");
});


// application
var app = express();
app.use(logger("short"));

//calling views

app.get("/", function (request, response) {
    response.render("index", {
        title: "Home page"
    });
});

app.get("/index", function (request, response) {
    response.render("index", {
        title: "Home page"
    });
});

app.get("/list", function (request, response) {
    response.render("list", {
        title: "Employee List"
    });
});

app.get("/new", function (request, response) {
    response.render("new", {
        title: "New Employee Page"
    });

});

app.get("/", function(request, response) {

    response.render("index", {

        message: "XSS Prevention Example"

    });

});

// create server
http.createServer(app).listen(8080, function() {
    console.log("Application connected to port 8080!");
});
