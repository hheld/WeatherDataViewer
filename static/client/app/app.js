/* global angular */

(function(){
    'use strict';

    angular.module('weatherData',
                  ['plotWidget',
                   'weatherRestService',
                   'unitService'])
        .config(['$compileProvider', function($compileProvider) {
            $compileProvider.debugInfoEnabled(false);
        }]);
}());
