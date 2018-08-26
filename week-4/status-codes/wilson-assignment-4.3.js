var express = require('express');
var http = require('http');
var logger = require('morgan');

var app = express();

app.use = (logger('dev'));


// requrests using status
app.get('/not-found', function (req, res) {

    res.status(404);

    res.json({
        error: 'Resource not found.'
    });
});

app.get('/ok', function (req, res) {
    res.status(200);

    res.json({
        error: 'Page loaded correctly.'
    });
});

app.get('/not-implimented', function (req, res) {
    res.status(501);

    res.json({
        error: 'Page not implimented'
    });
});

http.createServer(app).listen(3000, function () {
    console.log('Application started and listening on port 3000');
});