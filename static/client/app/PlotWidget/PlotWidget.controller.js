/* global angular, console */

(function () {
    'use strict';

    angular
        .module('plotWidget')
        .controller('PlotWidgetController', PlotWidgetController);

    PlotWidgetController.$inject = [];

    function PlotWidgetController() {
        var vm = this;

        vm.data = data();
        vm.options = options();
        vm.width = 800;
        vm.height = 400;

        // ####################################################################

        function data() {
            return [
                {x: 0, value: 12},
                {x: 1, value: 0},
                {x: 2, value: 23}
            ];
        }

        function options() {
            return {
                tooltipMode: 'scrubber',
                lineMode: 'cardinal',
                tension: 0.3,
                series: [
                    {y: 'value', type: 'area'},
                    {y: 'x', type: 'area'}
                ]
            };
        }
    }
}());
