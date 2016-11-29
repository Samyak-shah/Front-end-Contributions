(function() {
  'use strict';
  
  angular
    .module('starter')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('app.home', {
            url: '/home',
            views: {
              'menuContent': {
                templateUrl: 'screens/home/home.html',
                controller: 'HomeCtrl as vm'
              }
            }
        })
		.state('app.home.practice', {
            url: '/practice',
            views: {
              'practice': {
                templateUrl: 'templates/practice.html',
				controller: 'HomeCtrl'
              }
            }
        })
		.state('app.home.quiz', {
            url: '/quiz',
            views: {
              'quiz': {
                templateUrl: 'templates/quiz.html',
				controller: 'HomeCtrl'
              }
            }
        });		
    
		//$urlRouterProvider.otherwise("/app/home/practice");

	});
})();
