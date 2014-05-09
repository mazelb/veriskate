(function () {
    'use strict';
    var controllerId = 'competitionCtrl';
    angular.module('veriskateWebApp').controller(controllerId, ['$location', '$http', 'datacontext', competitionCtrl]);

    //TODO: Update code to dynamically take the JSON parameters: 
    //right now the following elements are manually (or semi-manually set) : 
    //  -vm.competitionTabs -> change to dynamic array

    function competitionCtrl($location, $http, datacontext) {
        var vm = this;
        vm.title = 'Competition';
        datacontext.curEvent = 0;
        datacontext.curProgram = 0;

        //read the competitions data from json file
        datacontext.getCompetitionData()
            .then(function (data) {
                if (data.data.events.length > 0) {
                    vm.competition = data.data.events;
                    datacontext.CompetitionData = data.data;
                } else {
                    alert('Error reading JSON file for competition');
                }
            },            
            function () {
                alert('Error reading JSON file for competition');
            }
        );

        ////holds the active status of the competition tabs
        //vm.competitionTabs = [
        //    { active: true },
        //    { active: false },
        //    { active: false },
        //    { active: false }
        //];

        ////Chose a different event 
        //vm.eventClicked = function (vIdx) {
        //    for (var i = 0; i < vm.competitionTabs.length; i++) {
        //        vm.competitionTabs[i].active = false;
        //    }
        //    vm.competitionTabs[vIdx].active = true;
        //    datacontext.curEvent = vIdx;
        //}

        vm.gotoLeaderBoard = function (vComp, vIdx) {
            datacontext.curProgram = vIdx;

            for (var i = 0; i < datacontext.CompetitionData.events.length; i++) {
                if (datacontext.CompetitionData.events[i].event_name == vComp.event_name) {
                    datacontext.curEvent = i;
                    break;
                }
            }
            
            $location.path('/leaderboard/');
            //window.location = '#/leaderboard/';
        }
    }
})();