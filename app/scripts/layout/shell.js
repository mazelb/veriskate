﻿$(document).ready(function(){

	//get navbar height
	var navbarHeight;
	
	//controlls nav bar locking to top
	$(window).scroll(function () { 
		navbarHeight = $('.navbar').height();
		if($(window).scrollTop() >= 300){
			$('#main-nav').css({
				position 	: 	'fixed',
				top 		: 	'0',
				width		: 	'100%',
				zIndex		: 	'9'
			});

			$('#section-filterlist').css('margin-top', (navbarHeight+30)+'px');
			$('#section-competitor').css('margin-top', (navbarHeight+30)+'px');
		} else {
			$('#main-nav').css({
				position 	: 	'static',
				top 		: 	'auto',
				width		: 	'auto',
				zIndex		: 	'auto'
			});

			$('#section-filterlist').css('margin-top', '30px');
			$('#section-competitor').css('margin-top', '30px');
		}

	});
});
//(function () {
//    'use strict';

//    var controllerId = 'shell';
//    angular.module('app').controller(controllerId,
//        ['$rootScope', 'common', 'config', shell]);

//    function shell($rootScope, common, config) {
//        var vm = this;
//        var logSuccess = common.logger.getLogFn(controllerId, 'success');
//        var events = config.events;
//        vm.busyMessage = 'Please wait ...';
//        vm.isBusy = true;
//        vm.spinnerOptions = {
//            radius: 40,
//            lines: 7,
//            length: 0,
//            width: 30,
//            speed: 1.7,
//            corners: 1.0,
//            trail: 100,
//            color: '#F58A00'
//        };

//        activate();

//        function activate() {
//            logSuccess('Hot Towel Angular loaded!', null, true);
//            common.activateController([], controllerId);
//        }

//        function toggleSpinner(on) { vm.isBusy = on; }

//        $rootScope.$on('$routeChangeStart',
//            function (event, next, current) { toggleSpinner(true); }
//        );

//        $rootScope.$on(events.controllerActivateSuccess,
//            function (data) { toggleSpinner(false); }
//        );

//        $rootScope.$on(events.spinnerToggle,
//            function (data) { toggleSpinner(data.show); }
//        );
//    };
//})();