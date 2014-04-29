(function () {
    'use strict';
    var controllerId = 'moveCtrl';
    angular.module('veriskateWebApp').controller(controllerId, ['$location', 'datacontext', moveCtrl]);

    //TODO: sidebar tabs need to be dynamic depending on the stats tracked (Similar problem with Overview) 

    //TODO: sidebar tabs the content need to be ordered correctly according to the current stat tracked

    //TODO: The bottom stats need to be dynamic too (similar problem with Overview)

    //TODO: Connect the search bar in specific move to the sidebar content

    //TODO: mobile responsiveness

    function moveCtrl($location, datacontext) {
        var vm = this;

        vm.title = 'Competitor Move Details';

        //Get the current competitor from the datacontext service
        if (datacontext.CompetitionData && datacontext.curMove && datacontext.CompetitionData.events.length > 0) {
            vm.competitor = datacontext.curCompetitor;
            vm.moves = vm.competitor.moves;
            vm.move = datacontext.curMove;
            vm.competitors = datacontext.CompetitionData.events[datacontext.curEvent].programs[datacontext.curProgram].competitors;
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