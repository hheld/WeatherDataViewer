/* jshint node: true */

var sqlite3 = require('sqlite3'),
    db = new sqlite3.Database('weewx.sdb');

exports.inHumidity = function(callback) {
    db.serialize(function() {
        var timePoints = [],
            inHumidities = [];
        
        db.each("SELECT dateTime, inHumidity FROM archive", function(err, row) {
            var timePoint = new Date(row.dateTime*1000),
                inHumidity = row.inHumidity;
            
            timePoints.push(timePoint);
            inHumidities.push(inHumidity);
        }, function(err, numRows) {
            if(!err) {
                callback(timePoints, inHumidities);
            }
        });
    });
};
