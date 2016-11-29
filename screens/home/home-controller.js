(function() {
  angular.module('starter.controllers')
    .controller('HomeCtrl', function($scope, $stateParams, $state, $ionicHistory, $ionicPopup) {
      console.log('HomeCtrl');
	  var lines = 50;
	  $scope.lines = [];
	  for (i = 0; i < lines; i++) {
		$scope.lines.push(i);
	  }
		
	  //Code to potentially default to w/e the last tab was
	  if($state.is('app.home.practice')) {
		//alert('practice mode');
	  }
	  if($state.is('app.home.quiz')) {
		//alert('quiz mode');
	  }
	
	  //Courses
	  $scope.courses = [];
	  for (var i=0; i<5; i++) {
		$scope.courses[i] = {
		  name: i,
		  completion: i + ' of 12 modules complete',
		  modules: []
		};
		for (var j=0; j<3; j++) {
		  $scope.courses[i].modules.push({
			  name: i + '-' + j,
			  completion: (i*j) + ' of 30 questions complete'
			  });
		}
	  }

	  /*
	   * if given course is the selected course, deselect it
	   * else, select the given course
	   */
	  $scope.toggleCourse = function(course) {
		if ($scope.isCourseShown(course)) {
		  $scope.shownCourse = null;
		} else {
		  $scope.shownCourse = course;
		}
	  };
	  $scope.isCourseShown = function(course) {
		return $scope.shownCourse === course;
	  };

	//https://forum.ionicframework.com/t/separate-clicks-on-ion-item-from-embedded-button/10863
	$scope.pieChart = function(action, $index, $event) {
		$event.stopPropagation();
		alert('Maybe show something, maybe not');
	};
	
	$scope.modulesSelected = [];
	$scope.modulesChecked = function(module, isChecked, index) {
		if (isChecked) {
		  $scope.modulesSelected.push(module);
		} else {
		  var _index = $scope.modulesSelected.indexOf(module);
		  $scope.modulesSelected.splice(_index, 1);
		}
	};
	
	//TODO: Set this to be from the database
	$scope.sessionInProgress = false;
	
	$scope.old = function() {
	    //TODO: Check if they currently have an active session
		//This has the module names for selection courses $scope.modulesSelected 
		if($scope.sessionInProgress) {
			var alertPopup = $ionicPopup.alert({
			  title: 'Warning',
			  template: '<div>You currently have an active session in progress, are you sure you\'d like to override it and start a new one?</div>'
			});

			alertPopup.then(function(res) {
			  console.log('User viewed course information for course');
			});
		}
		else {
			var alertPopup = $ionicPopup.alert({
			  title: 'Warning',
			  template: '<div>You currently have an active session in progress, are you sure you\'d like to override it and start a new one?</div>'
			});

			alertPopup.then(function(res) {
			  console.log('User viewed course information for course');
			});
		}
	};
	
	$scope.startNewSession = function() {
	   $scope.data = {}
	   $scope.selectedName = 0;
	   $scope.questionAmounts = [10, 20, 30, 40, 50];
	   //An elaborate, custom popup
	   var myPopup = $ionicPopup.show({ //When you get <center> happy
		 template: '<b><center>You currently have a session in progress, starting a new one will override it!</center></b>' +
				   '<div><center>How many questions would you like to review?</center>' + 
				   '<center><select id="numberOfQuestions" ng-model="selectedName" ng-options="questionAmount for questionAmount in questionAmounts">' + 
				   '</select></center></div>',
		 title: 'Start a New Session',
		 //subTitle: 'Please use normal things',
		 scope: $scope,
		 buttons: [
		   { text: 'Cancel' },
		   {
			 text: '<b>Done</b>',
			 type: 'button-positive',
			 onTap: function(e) {
			   alert('saving tho: ' + $('#numberOfQuestions').val()); //TODO: Angular model it
			   //TODO: Pass in the number of questions and $scope.modulesSelected into some function for Shailja
			 }
		   },
		 ]
	   });
	   myPopup.then(function(res) {
		 console.log('Tapped!', res);
	   });
	  };
	  	  
    });
})();
