/* jshint node: true */

var express           = require('express'),
    router            = express.Router(),
    weatherDbHandler  = require('./weatherDbHandler');

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to our api!'});
});

/* /api/inHumidity?from=2014-08-21T00:00:00&to=2014-08-25T15:45:12 */
router.get('/inHumidity', function(req, res) {
    var from = Date.parse(req.query.from)/1000 || 0x00000000,
        to   = Date.parse(req.query.to)/1000   || 0x7FFFFFFF;

    weatherDbHandler.inHumidity(from, to, function(err, timePoints, inHumidities) {
        if(err) {
            res.json('Something went wrong for GET /inHumidity: ' + err);
        } else {
            res.json({
                timePoints: timePoints,
                inHumidity: inHumidities
            });
        }
    });
});

router.get('/availableData', function(req, res) {
    weatherDbHandler.allColumnNames(function(err, availableData) {
        if(err) {
            res.json('Something weng wrong for GET /availableData: ' + err);
        } else {
            res.json(availableData);
        }
    });
});

module.exports = router;
