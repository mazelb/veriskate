(function () {
    'use strict';

    var app = angular.module('veriskateWebApp');

    // Collect the routes
    app.constant('routes', getRoutes());
    
    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }

    // Define the routes 
    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'views/layout/competition.html',
                    controller: 'competitionCtrl'
                }
            },

            {
                url: '/leaderboard',
                config: {
                    templateUrl: 'views/layout/leaderboard.html',
                    controller: 'leaderboardCtrl'
                }
            },

            {
                url: '/competitor',
                config: {
                    templateUrl: 'views/layout/competitor.html',
                    controller: 'competitorCtrl'
                }
            },

            {
                url: '/move',
                config: {
                    templateUrl: 'views/layout/move.html',
                    controller: 'moveCtrl'
                }
            }
        ];
    }
})();