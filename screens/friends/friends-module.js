(function() {
  'use strict';

  angular
    .module('starter')
    .config(function($stateProvider) {
        $stateProvider
          .state('app.friends', {
            url: '/friends',
            views: {
              'menuContent': {
                templateUrl: 'screens/friends/friends.html',
                controller: 'FriendsCtrl as vm'
              }
            }
        });
    });
})();
