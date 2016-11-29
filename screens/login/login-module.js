(function() {
  'use strict';

  angular
    .module('starter')
    .config(function($stateProvider) {
        $stateProvider
          .state('app.login', {
            url: '/login',
            views: {
              'menuContent': {
                templateUrl: 'screens/login/login.html',
                controller: 'LoginCtrl as vm'
              }
            }
        });
    });
})();
