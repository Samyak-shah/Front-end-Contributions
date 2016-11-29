(function() {
  angular.module('starter.controllers')
    .controller('MyCoursesCtrl', function($scope, $stateParams, $ionicPopup) {
      console.log('MyCoursesCtrl');
	  $scope.listCanSwipe = true
	  $scope.editingActiveCourses = false;
	  $scope.editingInactiveCourses = false;
	  
	  //Active Courses
	  //TODO: Pull from database
	  $scope.activeCourses = [];
	  for (var i=0; i<5; i++) {
		$scope.activeCourses[i] = {
		  name: i,
		  completion: i + ' of 12 modules complete',
		  modules: []
		};
		for (var j=0; j<3; j++) {
		  $scope.activeCourses[i].modules.push({
			  name: i + '-' + j,
			  completion: (i*j) + ' of 30 questions complete'
			  });
		}
	  }
	  
	  //Inactive Courses
	  //TODO: Pull from database
	  $scope.inactiveCourses = [];
	  for (var i=0; i<3; i++) {
		$scope.inactiveCourses[i] = {
		  name: i,
		  completion: i + ' of 16 modules complete',
		  modules: []
		};
		for (var j=0; j<3; j++) {
		  $scope.inactiveCourses[i].modules.push({
			  name: i + '-' + j,
			  completion: (i*j) + ' of 40 questions complete'
			  });
		}
	  }
	  
	  //Logic for editing active courses
      $scope.editActiveCourses = function() {
		$scope.editingActiveCourses = true;
      };
	  
	  $scope.saveActiveCourses = function() {
		for(var i = 0; i < $scope.activeCoursesSelected.length; i++) {
			$scope.inactiveCourses[$scope.inactiveCourses.length] = $scope.activeCoursesSelected[i];
			var _index = $scope.activeCourses.indexOf($scope.activeCoursesSelected[i]);
			$scope.activeCourses.splice(_index, 1);
		}
		$scope.inactiveCourses.sort();
		$scope.editingActiveCourses = false;
		$scope.activeCoursesSelected = [];
		//TODO: save active and inactive courses in database
      };
	  
	  $scope.cancelActiveCourses = function() {
		$scope.editingActiveCourses = false;
		$scope.activeCoursesSelected = [];
      };

	  $scope.activeCoursesSelected = [];
      $scope.activeCoursesChecked = function (asset, isChecked, index) {
		  if (isChecked) {
			  $scope.activeCoursesSelected.push(asset);
		  } else {
			  var _index = $scope.activeCoursesSelected.indexOf(asset);
			  $scope.activeCoursesSelected.splice(_index, 1);
		  }
      }; 
	  
	  //Logic for editing inactive courses
	  $scope.saveInactiveCourses = function() {
		for(var i = 0; i < $scope.inactiveCoursesSelected.length; i++) {
			$scope.activeCourses[$scope.activeCourses.length] = $scope.inactiveCoursesSelected[i];
			var _index = $scope.inactiveCourses.indexOf($scope.inactiveCoursesSelected[i]);
			$scope.inactiveCourses.splice(_index, 1);
		}
		$scope.activeCourses.sort();
		$scope.editingInactiveCourses = false;
		$scope.inactiveCoursesSelected = [];
		//TODO: save active and inactive courses in database
      };
	  
	  $scope.cancelInactiveCourses = function() {
		$scope.editingInactiveCourses = false;
		$scope.inactiveCoursesSelected = [];
      };
	  
	  $scope.editInactiveCourses = function() {
		$scope.editingInactiveCourses = true;
      };
	  
	  $scope.inactiveCoursesSelected = [];
      $scope.inactiveCoursesChecked = function (asset, isChecked, index) {
		  if (isChecked) {
			  $scope.inactiveCoursesSelected.push(asset);
		  } else {
			  var _index = $scope.inactiveCoursesSelected.indexOf(asset);
			  $scope.inactiveCoursesSelected.splice(_index, 1);
		  }
      }; 
	  
	  $scope.getInfo = function(course, index) {
		//TODO: Show useful information in the popup (what do we have in the database)
		//When course became active, name of modules, etc.
		var alertPopup = $ionicPopup.alert({
		  title: 'Course ' + course.name,
		  template: '<div>Some course information</div>'
	    });

		alertPopup.then(function(res) {
		  console.log('User viewed course information for course ' + course.name);
		});
	  };
    });
})();
