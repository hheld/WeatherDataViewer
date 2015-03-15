/* global angular, console */

(function () {
    'use strict';

    angular
        .module('unitService')
        .factory('unitService', UnitService);

    UnitService.$inject = [];

    function UnitService () {
        return {
            unit: unit,
            conversion: conversion
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
                case 'barometer':
                    return 'mbar';
                default:
                    return '';
            }
        }

        function conversion(quantity) {
            switch(quantity) {
                case 'inTemp':
                    return F2C;
                case 'outTemp':
                    return F2C;
                case 'barometer':
                    return inHg2mbar;
                default:
                    return identity;
            }
        }

        function identity(v) {
            return v;
        }

        function F2C(v) {
            return (v-32)/1.8;
        }

        function inHg2mbar(v) {
            return 33.8638815*v;
        }
    }
}());
