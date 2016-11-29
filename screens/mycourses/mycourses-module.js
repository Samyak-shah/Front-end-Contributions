(function() {
  'use strict';

  angular
    .module('starter')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('app.mycourses', {
            url: '/mycourses',
            views: {
              'menuContent': {
                templateUrl: 'screens/mycourses/mycourses.html',
                controller: 'MyCoursesCtrl as vm'
              }
            }
        })
		.state('app.mycourses.active', {
            url: '/active',
            views: {
              'active': {
                templateUrl: 'templates/active.html'
              }
            }
        })
		.state('app.mycourses.inactive', {
            url: '/inactive',
            views: {
              'inactive': {
                templateUrl: 'templates/inactive.html'
              }
            }
        });
		
		//$urlRouterProvider.otherwise("/app/mycourses/active");
    });
})();
