/* jshint node: true */

var sqlite3 = require('sqlite3'),
    db = new sqlite3.Database('weewx.sdb');

exports.queryData = function(from, to, datum, callback) {
    if(typeof(callback)!=='function') {
        return new Error('No callback function given!');
    }

    db.serialize(function() {
        var timePoints = [],
            dataPoints = [];
        
        db.each("SELECT dateTime, " + datum + " FROM archive WHERE dateTime>=" + from + " AND dateTime<=" + to, function(err, row) {
            var timePoint = new Date(row.dateTime*1000),
                dataPoint = row[datum];
            
            timePoints.push(timePoint);
            dataPoints.push(dataPoint);
        }, function(err, numRows) {
            callback(err, timePoints, dataPoints);
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
