(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('veriskateWebApp').factory(serviceId, ['$http', datacontext]);

    function datacontext($http) {
        
        var CompetitionData = null; 
        var StatsCategories = null;
        var curEvent = 0;
        var curProgram = 0;
        var curCompetitor = null;
        var curMove = null;
        var maxNumListViewStats = 5;
        var allMoves = [];

        var service = {
            getCompetitionData: getCompetitionData,
            CompetitionData: CompetitionData,
            StatsCategories: StatsCategories,
            curEvent :curEvent,
            curProgram :curProgram,
            curCompetitor: curCompetitor,
            curMove: curMove,
            maxNumListViewStats: maxNumListViewStats,
            allMoves: allMoves
        };

        return service;

        function getCompetitionData() {
            return $http.get('json/competition.json');
        }
    }
})();