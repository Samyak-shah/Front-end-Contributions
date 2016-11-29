(function() {
  'use strict';

  angular
    .module('starter')
    .config(function($stateProvider) {
        $stateProvider
          .state('app.profile', {
            url: '/profile',
            views: {
              'menuContent': {
                templateUrl: 'screens/profile/profile.html',
                controller: 'ProfileCtrl as vm'
              }
            }
        });
    });
})();
