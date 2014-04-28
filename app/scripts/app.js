(function () {
    'use strict';

    //TODO: Update code to dynamically take the JSON parameters: 
    //right now the following elements are manually (or semi-manually set) : 
    //  -vm.competitors.Overview -> in the HTML, because overview is an object, not a table, 
    //                              the ng-repeat won't work on it. Change it to dynamic table.

    var app = angular.module('veriskateWebApp', [
        // Angular modules 
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ui.bootstrap'
    ]);

    // Handle routing errors and success events
    app.run(['$route', function ($route) {
        // Include $route to kick start the router.
    }]);
})();