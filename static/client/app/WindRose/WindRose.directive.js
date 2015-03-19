/* global angular, console, Dygraph */

(function () {
    'use strict';

    angular
        .module('windRose')
        .directive('windRose', windRose);

    function windRose() {
        var setup = {
            restrict: 'E',
            templateUrl: 'app/WindRose/WindRose.html',
            controller: 'WindRoseController',
            controllerAs: 'ctrl',
            scope: {
                quantity: '='
            },
            link: link
        };

        return setup;

        // ####################################################################

        function link(scope, element, attr) {
            console.log(element);
        }
    }
})();
