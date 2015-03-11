/* jshint node: true */

var weatherDbHandler = require('./weatherDbHandler'),
    timePoints,
    inHumidityData;

weatherDbHandler.inHumidity(function(timePoint, inHumidity) {
    timePoints = timePoint;
    inHumidityData = inHumidity;
    
    console.log(timePoints);
});
