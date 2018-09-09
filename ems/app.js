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
var logger = require("morgan");

var app = express();
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("short"));

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

http.createServer(app).listen(8000, function () {
    console.log("Application started on port 8000!");
});