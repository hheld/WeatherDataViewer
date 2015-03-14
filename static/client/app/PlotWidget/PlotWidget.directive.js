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
                quantity: '=',
                width: '=',
                height: '='
            },
            compile: compile
        };

        return setup;

        function compile(tElement, tAttr) {
            var lineChartEl = tElement.find('linechart');

            if(lineChartEl) {
                var widthAttr = document.createAttribute('width');
                widthAttr.value = tAttr.width;

                var heightAttr = document.createAttribute('height');
                heightAttr.value = tAttr.height;

                lineChartEl[0].attributes.setNamedItem(widthAttr);
                lineChartEl[0].attributes.setNamedItem(heightAttr);
            }

            return {
                pre: function() {},
                post: function() {}
            };
        }
    }
})();
