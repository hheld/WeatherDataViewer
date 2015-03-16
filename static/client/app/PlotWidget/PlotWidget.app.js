/* global angular */

(function () {
    'use strict';

    angular.module('plotWidget',
                   ['weatherRestService',
                    'unitService'])
        .config(['$compileProvider', function($compileProvider) {
            $compileProvider.debugInfoEnabled(false);
        }]);
}());
