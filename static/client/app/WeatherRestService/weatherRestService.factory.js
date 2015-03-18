/* global angular, console */

(function () {
    'use strict';

    angular
        .module('weatherRestService')
        .factory('weatherRestService', WeatherRestService);

    WeatherRestService.$inject = ['$http'];

    function WeatherRestService ($http) {
        return {
            availableData: availableData,
            data: data
        };

        // ####################################################################

        function availableData() {
            return $http.get('/wd/api/availableData')
                .error(function(data, status, headers, config) {
                console.error('Error when trying to retrieve all available weather data names: ' + data);
            });
        }

        function data(from, to, datum) {
            return $http.get('/wd/api/' + datum, {
                params: { from: from, to: to}
            })
                .error(function(data, status, headers, config) {
                console.error('Error when trying to retrieve all inHumidity values: ' + data);
            });
        }
    }
}());
