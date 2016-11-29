(function() {
  'use strict';

  angular
    .module('starter')
    .config(function($stateProvider) {
        $stateProvider
          .state('app.modules', {
            url: '/modules',
            views: {
              'menuContent': {
                templateUrl: 'screens/modules/modules.html',
                controller: 'ModulesCtrl as vm'
              }
            }
        });
    });
})();
