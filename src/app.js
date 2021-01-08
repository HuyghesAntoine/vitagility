const dotenv = require('dotenv').config();
var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var path = require('path');
var port = process.env.PORT || 3000;
var routes = require('./routes/router');

app.set('port', port);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.disable('x-powered-by');

app.use('/', routes);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('layout', {
        path: 'error',
        message: err,
        error: err.status,
    });
});

http.listen(port, () => {
    console.log('listening on *:3000');
});
