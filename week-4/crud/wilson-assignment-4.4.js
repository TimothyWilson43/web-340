var express = require('express');
var http = require('http');
var logger = require('morgan');

var app = express();

app.use = (logger('dev'));

app.get('/get', function (request, res) {
    res.send("This is an HTTP GET request");
});

app.post('/post', function (request, res) {
    res.send("This is an HTTP POST request");
});

app.put('/put', function (request, res) {
    res.send("This is an HTTP PUT request");
});

app.delete('/delete', function (request, res) {
    res.send("This is an HTTP DELETE request");
});

http.createServer(app).listen(3030, function () {
    console.log("Application started on port 3030");
}); 