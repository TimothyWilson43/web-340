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
var helmet = require("helmet");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var csrf = require("csurf");
var mongoose = require("mongoose");
var Employee = require("./models/employee");

// CSURF Protection setup
var csrfProtection = csrf({ cookie: true });

// mLab connection
var mongoDB = "mongodb://wilsonxchevy:Meatball11!!@ds249942.mlab.com:49942/ems";
mongoose.connect(mongoDB, {
    useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connected error: "));
db.once("open", function () {
    console.log("Application connected to mLab MongoDB instance");
});

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 8080);

app.use(logger("short"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(csrfProtection);
app.use(helmet.xssFilter());
app.use(function (request, response, next) {
    var token = request.csrfToken();
    response.cookie('XSRF-TOKEN', token);
    response.locals.csrfToken = token;
    next();
});
app.get("/", function (request, response) {
    response.render("index", {
        message: "New Employee Entry Page"
    });
});

app.get("/new", function (request, response) {
    response.render("new", {
        title: "New Employee"
    });
});

app.post("/process", function (request, response) {
    if (!request.body.txtName) {
        response.status(400).send("Entries must have a name");
        return;
    }

    var employeeName = request.body.txtName;
    console.log(employeeName);

    var employee = new Employee({
        name: employeeName
    });

    employee.save(function (error) {
        if (error) throw error;

        console.log(employeeName + " success!");
    });

    response.redirect("/list");
});

app.get("/list", function (request, response) {
    Employee.find({}, function (error, employee) {
        if (error) throw error;

        response.render("list", {
            title: "Employee List",
            employees: employees
        });
    });
});

app.get("/view/:queryName", function (request, response) {
    var queryName = request.params.queryName;

    Employee.find({ 'name': queryName }, function (error, employees) {
        if (error) throw error;

        console.log(employees);

        if (employees.length > 0) {
            response.render("view", {
                title: "Employee Record",
                employee: employees
            })
        }
        else {
            response.redirect("/list")
        }

    });
});

// create server
http.createServer(app).listen(8080, function () {
    console.log("Application connected to port 8080!");
});
