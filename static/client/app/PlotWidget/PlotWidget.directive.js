/* global angular, console, document */

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
            }
        };

        return setup;
    }
})();
