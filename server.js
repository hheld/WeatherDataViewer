/* jshint node: true */

var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    port        = process.env.PORT || 8080,
    routes      = require('./routes'),
    morgan      = require('morgan');

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/wd/api', routes);
app.use('/wd', express.static(__dirname + '/static/dist'));
app.use('/wd/3rdParty', express.static(__dirname + '/bower_components'));

app.listen(port);
console.log('Started server on port ' + port);
