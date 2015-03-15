/* global angular, console */

(function () {
    'use strict';

    angular
        .module('plotWidget')
        .controller('PlotWidgetController', PlotWidgetController);

    PlotWidgetController.$inject = ['$scope', 'weatherRestService'];

    function PlotWidgetController($scope, weatherRestService) {
        var vm = this;

        weatherRestService.inHumidity('2014-08-30', '2014-08-31')
//        weatherRestService.inHumidity()
            .then(function(data) {
            var newData = [];

            for(var i=0, len=data.data.timePoints.length; i<len; ++i) {
                //newData.push([data.data.timePoints[i], data.data.inHumidity[i]]);
                newData.push([new Date(data.data.timePoints[i]), data.data.inHumidity[i]]);
            }

            $scope.plotData = newData;
        });

        // ####################################################################
    }
}());
