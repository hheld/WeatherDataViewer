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
            conversion: conversion,
            overallStatistic: overallStatistic
        };

        // ####################################################################

        function unit(quantity) {
            switch(quantity) {
                case 'inTemp':
                    return '°C';
                case 'inHumidity':
                    return '%';
                case 'outHumidity':
                    return '%';
                case 'outTemp':
                    return '°C';
                case 'barometer':
                    return 'mbar';
                case 'rain':
                    return 'mm';
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
                case 'rain':
                    return in2mm;
                default:
                    return identity;
            }
        }

        function overallStatistic(quantity) {
            switch(quantity) {
                case 'inTemp':
                    return { name: 'Avg.', func: avg };
                case 'inHumidity':
                    return { name: 'Avg.', func: avg };
                case 'outHumidity':
                    return { name: 'Avg.', func: avg };
                case 'outTemp':
                    return { name: 'Avg.', func: avg };
                case 'barometer':
                    return { name: 'Avg.', func: avg };
                case 'rain':
                    return { name: 'Sum', func: sum };
                default:
                    return null;
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

        function in2mm(v) {
            return v*2.54*10;
        }

        function sum(v) {
            var s = 0.0;

            for(var i=0, len=v.length; i<len; ++i) {
                s += v[i];
            }

            return s;
        }

        function avg(v) {
            var len = v.length,
                s = sum(v);

            if(len>0) {
                return s / len;
            } else {
                return null;
            }
        }
    }
}());
