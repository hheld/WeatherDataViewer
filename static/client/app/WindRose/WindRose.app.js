/* global angular */

(function () {
    'use strict';

    angular.module('windRose',
                   ['weatherRestService',
                    'unitService'])
        .config(['$compileProvider', function($compileProvider) {
            $compileProvider.debugInfoEnabled(false);
        }]);
}());
