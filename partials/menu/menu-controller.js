(function() {
  angular.module('starter.controllers')
    .controller('MenuCtrl', function($scope, $ionicSideMenuDelegate) {
      var vm = this;

      function initNames() {
        vm.firstName = window.localStorage.firstName;
        vm.lastName = window.localStorage.lastName;
      }

      initNames();
      $scope.$on('user-login', function () {
        initNames();
      });

      vm.menuItems = [
        {
          state: 'app.home.practice',
          icon: 'ion-home',
          title: 'Home',
        },
        {
          state: 'app.practice',
          icon: 'ion-checkmark-circled',
          title: 'Practice',
        },
        {
          state: 'app.quiz',
          icon: 'ion-ios-list',
          title: 'Quiz-Off',
        },
		{
		  state: 'app.mycourses.active',
		  icon: 'ion-university',
		  title: 'My Courses',
		},
        {
          state: 'app.schedule',
          icon: 'ion-calendar',
          title: 'Schedule',
        },
        {
          state: 'app.profile',
          icon: 'ion-android-person',
          title: 'Profile',
        },
        {
          state: 'app.friends',
          icon: 'ion-android-people',
          title: 'Friends',
        }
      ];
    });
})();
