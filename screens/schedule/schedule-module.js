(function() {
  'use strict';

  angular
    .module('starter')
    .config(function($stateProvider) {
        $stateProvider
          .state('app.schedule', {
            url: '/schedule',
            views: {
              'menuContent': {
                templateUrl: 'screens/schedule/schedule.html',
                controller: 'ScheduleCtrl as vm'
              }
            }
        });
    });
})();
