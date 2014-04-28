(function () {
    'use strict';
    var controllerId = 'moveCtrl';
    angular.module('veriskateWebApp').controller(controllerId, ['$location', 'datacontext', moveCtrl]);

    function moveCtrl($location, datacontext) {
        var vm = this;

        vm.title = 'Competitor Details Overview';

        //Get the current competitor from the datacontext service
        if (datacontext.CompetitionData && datacontext.CompetitionData.events.length > 0) {
            vm.competitor = datacontext.CompetitionData.events[datacontext.curEvent].programs[datacontext.curProgram].competitors[datacontext.curCompetitor];
        }
    }
})();