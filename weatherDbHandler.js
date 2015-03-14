/* jshint node: true */

var sqlite3 = require('sqlite3'),
    db = new sqlite3.Database('weewx.sdb');

exports.inHumidity = function(from, to, callback) {
    if(typeof(callback)!=='function') {
        return new Error('No callback function given!');
    }

    db.serialize(function() {
        var timePoints = [],
            inHumidities = [];
        
        db.each("SELECT dateTime, inHumidity FROM archive WHERE dateTime>=" + from + " AND dateTime<=" + to, function(err, row) {
            var timePoint = new Date(row.dateTime*1000),
                inHumidity = row.inHumidity;
            
            timePoints.push(timePoint);
            inHumidities.push(inHumidity);
        }, function(err, numRows) {
            callback(err, timePoints, inHumidities);
        });
    });
};

exports.allColumnNames = function(callback) {
    if(typeof(callback)!=='function') {
        return new Error('No callback function given!');
    }

    db.serialize(function() {
        var tableNames = [];

        db.each("PRAGMA table_info(archive)", function(err, row) {
            tableNames.push(row.name);
        }, function(err, numRows) {
            callback(err, tableNames);
        });
    });
};
