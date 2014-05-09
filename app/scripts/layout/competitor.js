(function () {
    'use strict';
    var controllerId = 'competitorCtrl';
    angular.module('veriskateWebApp').controller(controllerId, ['$location', 'datacontext', competitorCtrl]);

    //TODO:(nice to have) add nested views support using https://github.com/angular-ui/ui-router
    
    //TODO:(nice to have) separate the Navigation for Skater overview & move using a different controller 

    //TODO:(nice to have) maybe separate the sidebar into a different reusable controller also

    //TODO: add the search logic in the skater details views 

    function competitorCtrl($location, datacontext) {
        var vm = this;

        vm.title = 'Competitor Details Overview';
        vm.maxNumListViewStats = datacontext.maxNumListViewStats;
        vm.curMove = 'Overview';


        //Get the current competitor from the datacontext service
        if (datacontext.CompetitionData && datacontext.curCompetitor && datacontext.CompetitionData.events.length > 0) {
            vm.competitor = datacontext.curCompetitor;
            vm.moves = vm.competitor.moves;
            vm.competitors = datacontext.CompetitionData.events[datacontext.curEvent].programs[datacontext.curProgram].competitors;

            for (var i = 0; i < datacontext.CompetitionData.stats_cat.length; i++) {
                if (datacontext.CompetitionData.stats_cat[i].cat_id === 'overview') {
                    vm.OverviewStats = datacontext.CompetitionData.stats_cat[i];
                }
            }
        }


        vm.preventClose = function (event) {
            event.stopPropagation();
        };

        //return the value of the overview stats for a specific competitor
        vm.getStatValue = function (vStatId) {
            var result = 'N/A';

            if (vm.competitor.overview.hasOwnProperty(vStatId)) {
                result = vm.competitor.overview[vStatId];
            }

            return result;
        }

        //navigate to overview (depracated)
        vm.gotoOverview = function () {
            //nothign to do here
        }

        //navigate to competitor overview from search results
        vm.gotoCompetitorOverview = function (vCompetitor) {
            datacontext.curCompetitor = vCompetitor;
            $location.path('/competitor/');
        }

        //navigate to specific move view
        vm.gotoMove = function (vMove) {
            datacontext.curMove = vMove;
            $location.path('/move/');
        }
    }
})();