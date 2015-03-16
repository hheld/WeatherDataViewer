/* global angular, console, Dygraph */

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
            var graphEl = element[0].querySelector('#chart'),
                g;

            if(graphEl) {
                g = new Dygraph(graphEl, [[0, 0]], {
                    labels: ['Time', scope.quantity]
                });
            }

            scope.$watch('plotData', function(newData, oldData) {
                if(!newData) {
                    return;
                }

                var plotOptions = scope.plotOptions;

                if(!plotOptions) {
                    plotOptions = {};
                }

                plotOptions.file = scope.plotData;

                g.updateOptions(plotOptions);
                g.resetZoom();
            }, false);
        }
    }
})();
