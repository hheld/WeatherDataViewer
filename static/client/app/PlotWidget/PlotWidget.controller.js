/* global angular, console */

(function () {
    'use strict';

    angular
        .module('plotWidget')
        .controller('PlotWidgetController', PlotWidgetController);

    PlotWidgetController.$inject = ['$scope',
                                    'weatherRestService',
                                    'unitService'];

    function PlotWidgetController($scope, weatherRestService, unitService) {
        var vm = this;

        vm.toDate   = new Date();
        vm.fromDate = new Date();
        vm.update   = update;

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

            vm.toDate.setMilliseconds(0);

            vm.fromDate.setTime(vm.toDate.getTime() - 24*3600*1000);
            update();
        }

        function getData(from, to) {
            var quantity = $scope.quantity;

            weatherRestService.data(from, to, quantity)
                .then(function(data) {
                if(data.data.timePoints.length===0) {
                    console.log('There is no data in the specified time frame for ' + quantity);
                    return;
                }

                var newData = [],
                    conversionFunc = function(v) { return v; };

                if(/temp/i.test(quantity)) {
                    conversionFunc = function(v) { return (v-32)/1.8; };
                }

                for(var i=0, len=data.data.timePoints.length; i<len; ++i) {
                    newData.push([new Date(data.data.timePoints[i]),    conversionFunc(data.data.dataPoints[i])]);
                }

                $scope.plotData = newData;
                $scope.plotOptions.ylabel = unitService.unit(quantity);
            });
        }

        function update() {
            getData(vm.fromDate.toISOString(), vm.toDate.toISOString());
        }
    }
}());
