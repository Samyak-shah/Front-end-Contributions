(function() {
  'use strict';

  angular
    .module('starter')
    .config(function($stateProvider) {
        $stateProvider
          .state('app.practice', {
            url: '/practice',
            views: {
              'menuContent': {
                templateUrl: 'screens/practice/practice.html',
                controller: 'PracticeCtrl as vm'
              }
            }
        });
    });
})();
