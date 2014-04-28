(function () {
    'use strict';
    var controllerId = 'competitorCtrl';
    angular.module('veriskateWebApp').controller(controllerId, ['$location', 'datacontext', competitorCtrl]);

    //TODO: Update code to dynamically take the JSON parameters: 
    //right now the following elements are manually (or semi-manually set) : 
    //  -vm.competitors.Overview -> in the HTML, because overview is an object, not a table, 
    //                              the ng-repeat won't work on it. Change it to dynamic table.
    // maybe use the following to get the keys in an array : 
    //var getKeys = function (obj) {
    //    var keys = [];
    //    for(var key in obj){
    //        keys.push(key);
    //    }
    //    return keys;
    //}

    function competitorCtrl($location, datacontext) {
        var vm = this;

        vm.title = 'Competitor Details Overview';

        //Get the current competitor from the datacontext service
        if (datacontext.CompetitionData && datacontext.CompetitionData.events.length > 0) {
            vm.competitor = datacontext.CompetitionData.events[datacontext.curEvent].programs[datacontext.curProgram].competitors[datacontext.curCompetitor];
            vm.moves = vm.competitor.moves;
            //vm.
            //if (vm.competitor.hasOwnProperty('merchant_id')) {

            //}
        }

        vm.gotoOverview = function () {

        }

        vm.gotoMove = function (vIdx) {

        }
    }
})();