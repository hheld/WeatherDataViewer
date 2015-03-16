/* global angular */

(function () {
    'use strict';

    angular.module('unitService', [])
        .config(['$compileProvider', function($compileProvider) {
            $compileProvider.debugInfoEnabled(false);
        }]);
})();
