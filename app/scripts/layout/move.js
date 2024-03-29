﻿(function () {
    'use strict';
    var controllerId = 'moveCtrl';
    var filterId = 'filterMoves';
    angular.module('veriskateWebApp').controller(controllerId, ['$location', 'datacontext', moveCtrl]);
    angular.module('veriskateWebApp').filter(filterId, filterMoves);

    //TODO: Connect the search bar in specific move to the sidebar content

    function moveCtrl($location, datacontext) {
        var vm = this;

        vm.title = 'Competitor Move Details';
        vm.maxNumViewStats = datacontext.maxNumListViewStats;
        vm.orderPredicate = '';
        vm.filterByMoveRotations = false;
        vm.filterByMoveType = false;

        var getCurCategories = function () {
            //console.log(vm.move.move_category);

            for (var i = 0; i < datacontext.CompetitionData.stats_cat.length; i++) {
                if (datacontext.CompetitionData.stats_cat[i].cat_id === vm.move.move_category) {
                    vm.moveCategory = datacontext.CompetitionData.stats_cat[i];
                    // console.log(vm.moveCategory.stats_tracked);
                }
            }
        }

        vm.preventClose = function (event) {
            event.stopPropagation();
        };

        var getMovesByCategory = function () {
            //flatten moves into a single array
            vm.movesByCategory = [];
            for (var j = 0 ; j < vm.competitors.length; j++) {
                for (var k = 0; k < vm.competitors[j].moves.length; k++) {
                    //all moves by same category 
                    if (vm.move.move_category === vm.competitors[j].moves[k].move_category) {
                        var vMove = { 'move': vm.competitors[j].moves[k], 'competitor_id': j };
                        vm.movesByCategory.push(vMove);
                    }
                }
            }
        }
       
        //Get the current competitor from the datacontext service
        if (datacontext.CompetitionData && datacontext.curMove && datacontext.CompetitionData.events.length > 0) {
            vm.competitor = datacontext.curCompetitor;
            vm.moves = vm.competitor.moves;
            vm.move = datacontext.curMove;
            vm.competitors = datacontext.CompetitionData.events[datacontext.curEvent].programs[datacontext.curProgram].competitors;
            //console.log(vm.competitors);
            
            getCurCategories();
            getMovesByCategory();
        }

        //decide if it's a pair event
        vm.isPairEvent = function(){
            if(datacontext.curEvent == "2" ||
                datacontext.curEvent == "3" ) {
                return true;
            } else {
                return false;
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

        vm.getMoveStatValue = function (vMove, vMoveStatId) {
            var result = 'N/A';
            //console.log(vMove);
            //console.log(vMoveStatId);
            if (vMove.hasOwnProperty(vMoveStatId)) {
                result = vMove[vMoveStatId];
            }

            return result;
        }

        vm.getCompetitorPicture = function (vCompetitorID) {
            var vIdx = parseInt(vCompetitorID);
            //console.log(vIdx);
            return vm.competitors[vIdx].picture;
        }

        vm.getCompetitorNames = function (vCompetitorID) {
            var vIdx = parseInt(vCompetitorID);
            //console.log(vIdx);
            return vm.competitors[vIdx].names;
        }

        vm.changePredicate = function (vStatId) {
            //alert('changing order predicate');
            var result = '';
            if (vm.move.hasOwnProperty(vStatId)) {
                result = 'move.' + vStatId;
            }
            vm.orderPredicate = result;
        }

        vm.filterByMoveClicked = function () {
            // console.log('toggle filtering by move');
            vm.filterByMoveType = !vm.filterByMoveType;
        }
        
        vm.filterByRotClicked = function () {
            // console.log('toggle filtering by Rot');
            vm.filterByMoveRotations = !vm.filterByMoveRotations;
        }

        //vm.changeMoveType = function (vMoveType) {
        //    //switch to a different move type in the sidebar
        //}

        vm.gotoOverview = function () {
            $location.path('/competitor/');
        }

        vm.gotoMove = function (vMove) {
            datacontext.curMove = vMove;
            vm.move = vMove;
            getCurCategories();
            getMovesByCategory();
        }

        vm.gotoCompetitorOverview = function (vCompetitorID) {
            var vIdx = parseInt(vCompetitorID);

            datacontext.curCompetitor = vm.competitors[vIdx];
            $location.path('/competitor/');
        }

        //navigate to competitor overview from search results
        vm.gotoOverviewSearch = function (vCompetitor) {
            datacontext.curCompetitor = vCompetitor;
            $location.path('/competitor/');
        }
    }

    function filterMoves() {
        return function (items, vMove, vFilterByType, vFilterByRotation) {

            var arrayToReturn = [];

            for (var i = 0; i < items.length; i++) {
                if (vFilterByType) {
                    if (items[i].move.move_type == vMove.move_type) {
                        if (vFilterByRotation) {
                            if (vMove.move_use_rot && items[i].move.move_rot == vMove.move_rot) {
                                arrayToReturn.push(items[i]);
                            } else if ((!vMove.move_use_rot) && items[i].move.move_rotations == vMove.move_rotations) {
                                arrayToReturn.push(items[i]);
                            }
                        } else {
                            arrayToReturn.push(items[i]);
                        }
                    }
                } else {
                    arrayToReturn.push(items[i]);
                }
            }

            return arrayToReturn;
        };
    };

})();