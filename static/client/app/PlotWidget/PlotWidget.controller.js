/* global angular, console */

(function () {
    'use strict';

    angular
        .module('plotWidget')
        .controller('PlotWidgetController', PlotWidgetController);

    PlotWidgetController.$inject = ['weatherRestService'];

    function PlotWidgetController(weatherRestService) {
        var vm = this;

        weatherRestService.availableData()
            .then(function(data) {
            console.log(data.data);
        });

        weatherRestService.inHumidity('2014-08-30', '2014-08-31')
            .then(function(data) {
            console.log(data.data);
        });

        // ####################################################################
    }
}());
