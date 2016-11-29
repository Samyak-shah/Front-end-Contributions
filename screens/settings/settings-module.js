(function() {
  'use strict';

  angular
    .module('starter')
    .config(function($stateProvider) {
        $stateProvider
          .state('app.settings', {
            url: '/settings',
            views: {
              'menuContent': {
                templateUrl: 'screens/settings/settings.html',
                controller: 'SettingsCtrl as vm'
              }
            }
        });
    });
})();