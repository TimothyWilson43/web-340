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

// Database
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

// CSURF Protection setup
var csrfProtection = csrf({ cookie: true });


// initialize the express application
var app = express();

// use statements
app.use(logger("short"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(helmet.xssFilter());
app.use(csrfProtection);
app.use(function(request, response, next) {
    var token = request.csrfToken();
    response.cookie('XSRF-TOKEN', token);
    response.locals.csrfToken = token;
    next();
});

// set statements
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 8080);

// route requests
app.get("/", function (request, response) {
    response.render("index", {
        title: "Home Page - Add an Employee!"
    });
});
app.get("/index", function (request, response) {
    response.render("index", {
        title: "Home Page - Add an Employee!"
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
 // get the request's form data
    var employeeName = request.body.txtName;
    console.log(employeeName);

// Create an employee model
    var employee = new Employee({
        name: employeeName
    });

// save
    employee.save(function (error) {
        if (error) throw error;

        console.log(employeeName + " saved successfully!");
    });

    response.redirect("/list");
});

app.get("/list", function (request, response) {
    Employee.find({}, function (error, employees) {
        if (error) throw error;

        response.render("list", {
            title: "Employee List",
            employees: employees
        });
    });
});

app.get("/view/:queryName", function (request, response) {
    var queryName = request.params.queryName;

    Employee.find({'name': queryName}, function (error, employees) {
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
http.createServer(app).listen(app.get("port"), function () {
    console.log("Application started on port " + app.get("port"));
});
