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
            inHumidity: inHumidity
        };

        // ####################################################################

        function availableData() {
            return $http.get('/api/availableData')
                .error(function(data, status, headers, config) {
                console.error('Error when trying to retrieve all available weather data names: ' + data);
            });
        }

        function inHumidity(from, to) {
            return $http.get('/api/inHumidity', {
                params: { from: from, to: to}
            })
                .error(function(data, status, headers, config) {
                console.error('Error when trying to retrieve all inHumidity values: ' + data);
            });
        }
    }
}());
