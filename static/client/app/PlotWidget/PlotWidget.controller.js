/* global angular, console */

(function () {
    'use strict';

    angular
        .module('plotWidget')
        .controller('PlotWidgetController', PlotWidgetController);

    PlotWidgetController.$inject = [];

    function PlotWidgetController() {
        var vm = this;

        vm.data = [];
        vm.options = [];
        vm.width = 800;
        vm.height = 400;

        // ####################################################################
    }
}());
