﻿(function () {
    'use strict';
    var controllerId = 'leaderboardCtrl';
    angular.module('veriskateWebApp').controller(controllerId, ['$location', 'datacontext', leaderboardCtrl]);

    function leaderboardCtrl($location, datacontext) {
        var vm = this;

        vm.title = 'Leader Board';

        vm.curCat = 0; //Current stats category (temp disabled)
        vm.sortingpredicate = 'overview.ranking'; //The sorting predicate for the competitors list
        vm.reverseSort = false; //list oredering: false = ascending, true = descending
        vm.maxNumListViewStats = datacontext.maxNumListViewStats;

        
        //Get the list of competitors from the datacontext service
        if(datacontext.CompetitionData && datacontext.CompetitionData.events.length > 0) {
            vm.competitors = datacontext.CompetitionData.events[datacontext.curEvent].programs[datacontext.curProgram].competitors;
        }

        //Get the list of tracked statistics from the datacontext service
        if(datacontext.CompetitionData && datacontext.CompetitionData.stats_cat.length > 0) {
            vm.categories = datacontext.CompetitionData.stats_cat;
            for(var i=0; i < datacontext.CompetitionData.stats_cat.length; i++) {
                if(datacontext.CompetitionData.stats_cat[i].cat_id === 'overview') {
                    vm.OverviewStats = datacontext.CompetitionData.stats_cat[i];
                } 
            }
        }

        //return the value of the overview stats for a specific competitor
        vm.parseOverviewStats = function (vStatId, vCompetitor) {
            var result = 'N/A';

            if (vCompetitor.overview.hasOwnProperty(vStatId)) {
                result = vCompetitor.overview[vStatId];
            }

            return result;
        }

        //Change the viewed stats (temp disabled)
        vm.categoryChanged = function (vIdx) {
            //vm.curCat = vIdx;
        }

        //Verify which sorting predicate we are currently using
        vm.isCurSortingPredicate = function (vStatId) {
            var vTempStateId = vStatId;

            if (vStatId === 'names') {
                vTempStateId = vStatId;
            } else {
                vTempStateId = 'overview.' + vStatId;
            }

            return (vm.sortingpredicate === vTempStateId);
        }

        //When list header element cliced, change the competitors' list sorting predicate 
        vm.changeSortingPredicate = function (vStatId, vIdx) {
            console.log(vStatId);

            var newPredicate = '';

            if (vStatId === 'names') {
                newPredicate = 'names'
            } else {
                newPredicate = 'overview.' + vStatId;
            }

            if (vm.sortingpredicate === newPredicate) {
                vm.reverseSort = !vm.reverseSort;
            } else {
                vm.reverseSort = false;
                vm.sortingpredicate = newPredicate;
            }
        }

        //When a competitor is selected, switch to details view of competitor
        vm.competitorSelected = function (vCompetitor) {
            datacontext.curCompetitor = vCompetitor;
            $location.path('/competitor/');
        }
        
    }
})();