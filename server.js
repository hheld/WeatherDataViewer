/* jshint node: true */

var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    port        = process.env.PORT || 8080,
    routes      = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', routes);

app.listen(port);
console.log('Started server on port ' + port);
