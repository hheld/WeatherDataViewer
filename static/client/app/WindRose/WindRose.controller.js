/* global angular, console */

(function () {
    'use strict';

    angular
        .module('windRose')
        .controller('WindRoseController', WindRoseController);

    WindRoseController.$inject = ['$scope',
                                  'weatherRestService',
                                  'unitService',
                                  '$interval'];

    function WindRoseController($scope, weatherRestService, unitService, $interval) {
        var vm = this;

        vm.toDate                   = new Date();
        vm.fromDate                 = new Date();
        vm.update                   = update;
        vm.startAutoUpdate          = startAutoUpdate;
        vm.stopAutoUpdate           = stopAutoUpdate;
        vm.enableAutoUpdate         = true;
        vm.enableAutoUpdateToggled  = enableAutoUpdateToggled;
        vm.quantityName             = $scope.quantity;

        var autoUpdate;

        init();
        update();

        // ####################################################################

        function init() {
            vm.toDate.setMilliseconds(0);
            vm.fromDate.setTime(vm.toDate.getTime() - 24*3600*1000);

            vm.quantityName = unitService.userFriendlyNames($scope.quantity);

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

                $scope.val = data.data.dataPoints;
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

        function enableAutoUpdateToggled() {
            if(vm.enableAutoUpdate) {
                startAutoUpdate();
            } else {
                stopAutoUpdate();
            }
        }
    }
}());
