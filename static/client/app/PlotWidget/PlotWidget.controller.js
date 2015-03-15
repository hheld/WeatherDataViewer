/* global angular, console */

(function () {
    'use strict';

    angular
        .module('plotWidget')
        .controller('PlotWidgetController', PlotWidgetController);

    PlotWidgetController.$inject = ['$scope',
                                    'weatherRestService',
                                    'unitService',
                                    '$interval'];

    function PlotWidgetController($scope, weatherRestService, unitService, $interval) {
        var vm = this;

        vm.toDate           = new Date();
        vm.fromDate         = new Date();
        vm.update           = update;
        vm.startAutoUpdate  = startAutoUpdate;
        vm.stopAutoUpdate   = stopAutoUpdate;

        var autoUpdate;

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
            startAutoUpdate();

            $scope.$on('$destroy', function() {
                stopAutoUpdate();
            });
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
                    conversionFunc = unitService.conversion(quantity);

                for(var i=0, len=data.data.timePoints.length; i<len; ++i) {
                    newData.push([new Date(data.data.timePoints[i]), conversionFunc(data.data.dataPoints[i])]);
                }

                $scope.plotData = newData;
                $scope.plotOptions.ylabel = unitService.unit(quantity);

                vm.max = conversionFunc(Math.max.apply(null, data.data.dataPoints));
                vm.min = conversionFunc(Math.min.apply(null, data.data.dataPoints));
            });
        }

        function update() {
            getData(vm.fromDate.toISOString(), vm.toDate.toISOString());
        }

        function startAutoUpdate() {
            if(angular.isDefined(autoUpdate)) return;

            // get new data every 5 minutes
            autoUpdate = $interval(function() {
                vm.toDate = new Date();
                vm.toDate.setMilliseconds(0);
                update();
            }, 5*60*1000);
        }

        function stopAutoUpdate() {
            if(angular.isDefined(autoUpdate)) {
                $interval.cancel(autoUpdate);
                autoUpdate = undefined;
            }
        }
    }
}());
