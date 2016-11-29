(function() {
  angular.module('starter.controllers')
    .controller('LoginCtrl', function($scope, $rootScope, $state, $http, DB,
        WGUAuthService, AcrobatiqService, UserProfileService) {
      var vm = this;

      function doLogin() {
        // for dev purposes
        $state.go('app.home');
        UserProfileService.loadUserProfile();
        $rootScope.$broadcast('user-login');
      }

      function doLoginFinal() {
        var authPromise = AcrobatiqService.login(
          vm.username,
          vm.password
        );
        authPromise.then(function(response) {
          handleIsLoggedIn(response.data.valid);
        }, function(errorResponse){
          $scope.loginForm.$setValidity("invalid_pair", false);
        })
      }

      function handleIsLoggedIn(isValid) {
        $state.go('app.home');
        UserProfileService.loadUserProfile();
        $rootScope.$broadcast('user-login');
        getCoursesQuestions();
      }

      function getCoursesQuestions() {
        var enrollmentPromise = AcrobatiqService.userEnrollments(1);
        enrollmentPromise.then(function(enrollmentResponse) {
          for (var i = 0; i < enrollmentResponse.data.length; i++) {
            var enrollment = enrollmentResponse.data[i];
            var coursePromise = $http.get(enrollment.course);
            coursePromise.then(
              courseCallbackGenerator(enrollment),
              function(errorResponse) {
                console.log('error getting course');
              }
            );
          }
        }, function(errorR){
          console.log('error getting enrollments');
        });
      }

      function courseCallbackGenerator(enrollment) {
        return function(courseResponse) {
          var course = courseResponse.data;
          DB.insertCourse(
            course.course_id,
            course.course_title,
            course.course_description,
            enrollment.status
          );

          course.modules.forEach(function(module) {
            if (module.questions.length < 1) { return; }

            DB.insertModule(
              module.id,
              module.title,
              module.description,
              1,  // available
              course.course_id
            );

            module.questions.forEach(function(question) {
              DB.insertQuestion(
                question.id,
                question.body,
                "", // hint
                0,  // bookmarked
                null,
                null,
                0,
                module.id,
                question.type
              );

              question.skills.forEach(function(skill) {
                DB.insertSkill(
                  skill.id,
                  skill.title,
                  // '1',  // learning_objective_id
                  '', // skill description
                  null, // last_timestamp
                  0 // accuracy
                );
              });
            });
          });
        }
      }

      vm.username = '';
      vm.password = '';
      vm.doLogin = doLogin;
    });
})();
