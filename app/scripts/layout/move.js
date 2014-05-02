(function () {
    'use strict';
    var controllerId = 'moveCtrl';
    angular.module('veriskateWebApp').controller(controllerId, ['$location', 'datacontext', moveCtrl]);

    //TODO: sidebar tabs the content need to be ordered correctly according to the current stat tracked and filtered by the top 5

    //TODO: Connect the search bar in specific move to the sidebar content

    //TODO: mobile responsiveness

    function moveCtrl($location, datacontext) {
        var vm = this;

        vm.title = 'Competitor Move Details';
        vm.maxNumViewStats = datacontext.maxNumListViewStats;

        //Get the current competitor from the datacontext service
        if (datacontext.CompetitionData && datacontext.curMove && datacontext.CompetitionData.events.length > 0) {
            vm.competitor = datacontext.curCompetitor;
            vm.moves = vm.competitor.moves;
            vm.move = datacontext.curMove;
            vm.competitors = datacontext.CompetitionData.events[datacontext.curEvent].programs[datacontext.curProgram].competitors;

            for (var i = 0; i < datacontext.CompetitionData.stats_cat.length; i++) {
                if (datacontext.CompetitionData.stats_cat[i].cat_id === vm.move.move_category) {
                    vm.moveStats = datacontext.CompetitionData.stats_cat[i];
                }
            }
        }

        //return the value of the overview stats for a specific competitor
        vm.getStatValue = function (vStatId) {
            var result = 'N/A';

            if (vm.move.hasOwnProperty(vStatId)) {
                result = vm.move[vStatId];
            }

            return result;
        }

        vm.gotoOverview = function () {
            $location.path('/competitor/');
        }

        vm.gotoMove = function (vMove) {
            datacontext.curMove = vMove;
            vm.move = vMove;
        }
    }
})();