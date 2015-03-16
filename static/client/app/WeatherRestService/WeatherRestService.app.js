/* global angular */

(function () {
    'use strict';

    angular.module('weatherRestService', [])
        .config(['$compileProvider', function($compileProvider) {
            $compileProvider.debugInfoEnabled(false);
        }]);
})();
