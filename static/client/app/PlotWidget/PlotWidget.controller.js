/* global angular, console */

(function () {
    'use strict';

    angular
        .module('plotWidget')
        .controller('PlotWidgetController', PlotWidgetController);

    PlotWidgetController.$inject = ['$scope', 'weatherRestService'];

    function PlotWidgetController($scope, weatherRestService) {
        var vm = this;

        init();

        // ####################################################################

        function init() {
            $scope.plotOptions = {
                showRangeSelector: true,
                title: $scope.quantity,
                color: 'rgb(42, 101, 212)',
                gridLineColor: 'rgb(200, 200, 200)',
                rangeSelectorPlotFillColor: '#575df5',
                rangeSelectorPlotStrokeColor: '#676877'
            };
        }

        weatherRestService.inHumidity('2014-08-30', '2014-08-31')
//        weatherRestService.inHumidity()
            .then(function(data) {
            var newData = [];

            for(var i=0, len=data.data.timePoints.length; i<len; ++i) {
                newData.push([new Date(data.data.timePoints[i]), data.data.inHumidity[i]]);
            }

            $scope.plotData = newData;
        });

    }
}());
