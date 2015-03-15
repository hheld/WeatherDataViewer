/* global angular, console */

(function () {
    'use strict';

    angular
        .module('unitService')
        .factory('unitService', UnitService);

    UnitService.$inject = [];

    function UnitService () {
        return {
            unit: unit
        };

        // ####################################################################

        function unit(quantity) {
            switch(quantity) {
                case 'inTemp':
                    return '°C';
                case 'inHumidity':
                    return '%';
                case 'outTemp':
                    return '°C';
                default:
                    return '';
            }
        }
    }
}());
