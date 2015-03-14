/* global angular, console, Chart */

(function () {
    'use strict';

    angular
        .module('plotWidget')
        .directive('plotWidget', plotWidget);

    function plotWidget() {
        var setup = {
            restrict: 'E',
            templateUrl: 'app/PlotWidget/PlotWidget.html',
            controller: 'PlotWidgetController',
            controllerAs: 'ctrl',
            scope: {
                quantity: '='
            },
            link: link
        };

        return setup;

        // ####################################################################

        function link(scope, element, attr) {
            var chartEl = element.find('canvas'),
                chart;

            if(chartEl) {
                var ctx = chartEl[0].getContext('2d');
                chart = new Chart(ctx).Line({}, {});
            }

            scope.$watch('plotData', function(newData, oldData) {
                chart.initialize(newData);
            }, true);

            scope.$watch('plotOptions', function(newData, oldData) {
                if(chart) {
                    angular.extend(
                        chart.plotOptions,
                        scope.plotOptions
                    );
                }
            }, true);
        }
    }
})();
