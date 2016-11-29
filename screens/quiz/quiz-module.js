(function() {
  'use strict';

  angular
    .module('starter')
    .config(function($stateProvider) {
        $stateProvider
          .state('app.quiz', {
            url: '/quiz',
            views: {
              'menuContent': {
                templateUrl: 'screens/quiz/quiz.html',
                controller: 'QuizCtrl as vm'
              }
            }
        });
    });
})();
