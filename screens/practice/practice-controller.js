(function() {
  angular.module('starter.controllers')
    .controller('PracticeCtrl', function($scope, $stateParams,  $ionicSlideBoxDelegate, DB, $ionicPopup, $ionicModal) {
      console.log('PracticeCtrl');
	  
      $scope.isCorrect = false;
      $scope.response = '';
      $scope.answer = '';
	  $scope.questionIndex = 0;

	  $scope.disableSwipe = function() {
	    $ionicSlideBoxDelegate.enableSlide(false);
	  };
	  
      $scope.options = {
        loop: false,
        effect: 'fade',
        speed: 500,
      }

      $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
        // data.slider is the instance of Swiper
        $scope.slider = data.slider;
      });

      $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
        console.log('Slide change is beginning');
      });

      $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
        // note: the indexes are 0-based
        $scope.activeIndex = data.activeIndex;
        $scope.previousIndex = data.previousIndex;
      });

      $scope.items = [
        {html:"<ion-slide-page> <div class='container'> <quiz/> </div> </ion-slide-page>"},
        {html:"<ion-slide-page> <div class='container'> <quiz/> </div> </ion-slide-page>"},
        {html:"<ion-slide-page> <div class='container'> <quiz/> </div> </ion-slide-page>"},
      ];



      var choices = [
        {
          choice_id: 1 ,
          choice_text: "India" ,
          feedback: "This response is incorrect. India is the second largest country by population.",
          isCorrect: 0 ,
          question_id: "question1"
        },
        {
          choice_id: 2 ,
          choice_text: "USA" ,
          feedback: "This response is incorrect.",
          isCorrect: 0 ,
          question_id: "question1"
        },
        {
          choice_id: 3 ,
          choice_text: "China" ,
          feedback: "This response is correct. China is the largest country by population.",
          isCorrect: 1 ,
          question_id: "question1"
        },
        {
          choice_id: 4 ,
          choice_text: "Russia" ,
          feedback: "This response is incorrect.",
          isCorrect: 0 ,
          question_id: "question1"
        },
        {
          choice_id: 5 ,
          choice_text: "1945" ,
          feedback: "This response is correct. The second world war ended in 1945.",
          isCorrect: 1 ,
          question_id: "question2"
        },
        {
          choice_id: 6 ,
          choice_text: "1939" ,
          feedback: "This response is incorrect.",
          isCorrect: 0 ,
          question_id: "question2"
        },
        {
          choice_id: 7 ,
          choice_text: "1944" ,
          feedback: "This response is incorrect.",
          isCorrect: 0 ,
          question_id: "question2"
        },
        {
          choice_id: 8 ,
          choice_text: "1942" ,
          feedback: "This response is incorrect.",
          isCorrect: 0 ,
          question_id: "question2"
        },
        {
          choice_id: 9 ,
          choice_text: "USA" ,
          feedback: "This response is incorrect.",
          isCorrect: 0 ,
          question_id: "question3"
        },
        {
          choice_id: 10 ,
          choice_text: "France" ,
          feedback: "This response is incorrect.",
          isCorrect: 0 ,
          question_id: "question3"
        },
        {
          choice_id: 11 ,
          choice_text: "Italy" ,
          feedback: "This response is incorrect.",
          isCorrect: 0 ,
          question_id: "question3"
        },
        {
          choice_id: 12 ,
          choice_text: "China" ,
          feedback: "This response is correct. China was the first country to issue paper currency.",
          isCorrect: 1 ,
          question_id: "question3"
        },
        {
          choice_id: 13 ,
          choice_text: "Atlanta" ,
          feedback: "This response is correct. Atlanta hosted the 1996 Summer Olympics.",
          isCorrect: 1 ,
          question_id: "question4"
        },
        {
          choice_id: 14 ,
          choice_text: "Sydney" ,
          feedback: "This response is incorrect.",
          isCorrect: 0 ,
          question_id: "question4"
        },
        {
          choice_id: 15 ,
          choice_text: "Athens" ,
          feedback: "This response is correct.",
          isCorrect: 0 ,
          question_id: "question4"
        },
        {
          choice_id: 16 ,
          choice_text: "Beijing" ,
          feedback: "This response is correct.",
          isCorrect: 0 ,
          question_id: "question4"
        },
        {
          choice_id: 17 ,
          choice_text: "Albert Einstein" ,
          feedback: "This response is incorrect.",
          isCorrect: 0 ,
          question_id: "question5"
        },
        {
          choice_id: 18 ,
          choice_text: "Alexander Graham Bell" ,
          feedback: "This response is correct. Alexander Graham Bell invented the telephone.",
          isCorrect: 1 ,
          question_id: "question5"
        },
        {
          choice_id: 19 ,
          choice_text: "Isaac Newton" ,
          feedback: "This response is incorrect.",
          isCorrect: 0 ,
          question_id: "question5"
        },
        {
          choice_id: 20 ,
          choice_text: "Marie Curie" ,
          feedback: "This response is incorrect.",
          isCorrect: 0 ,
          question_id: "question5"
        },
      ];


      var questions = [
        {
          question_id: "question1",
          question_text: "Which is the largest country in the world by population?",
          hint: "Its in Asia.",
          question_type: "Multiple Choice",
          module_id: "Module1",
          options: ["India", "USA", "China", "Russia"],
          answer: 2
        },
        {
          question_id: "question2",
          question_text: "When did the second world war end?",
          hint: "Closer to mid 1900s.",
          question_type: "Multiple Choice",
          module_id: "Module1",
          options: ["1945", "1939", "1944", "1942"],
          answer: 0
        },
        {
          question_id: "question3",
          question_text: "Which was the first country to issue paper currency?",
          hint: "Its well known for its large population.",
          question_type: "Multiple Choice",
          module_id: "Module1",
          options: ["USA", "France", "Italy", "China"],
          answer: 3
        },
        {
          question_id: "question4",
          question_text: "Which city hosted the 1996 Summer Olympics?",
          hint: "Its well known for its large population.",
          question_type: "Multiple Choice",
          module_id: "Module2",
          options: ["Atlanta", "Sydney", "Athens", "Beijing"],
          answer: 0
        },
        {
          question_id: "question5",
          question_text: "Who invented telephone?",
          hint:"This scientist also did groundbreaking work in optical telecommunications, hydrofoils and aeronautics.",
          question_type: "Multiple Choice",
          module_id: "Module2",
          options: ["Albert Einstein", "Alexander Graham Bell", "Isaac Newton", "Marie Curie"],
          answer: 1
        }
      ];



	$scope.questions_info =
	{

    "question1": {

        "question_id": "question1",

        "question_text": "Which is the largest country in the world by population?",

        "hint": "Its in Asia.",

        "bookmarked": 0,

        "last_response_timestamp": null,

        "last_response_correctness": null,

        "never_show_again": 0,

        "module_id": "Module2",

        "question_type": "Multiple Choice"

    },

    "question2": {

        "question_id": "question2",

        "question_text": "When did the second world war end?",

        "hint": "Closer to mid 1900s.",

        "bookmarked": 0,

        "last_response_timestamp": null,

        "last_response_correctness": null,

        "never_show_again": 0,

        "module_id": "Module1",

        "question_type": "Multiple Choice"

    },

    "question3": {

        "question_id": "question3",

        "question_text": "Which was the first country to issue paper currency?",

        "hint": "Its well known for its large population.",

        "bookmarked": 0,

        "last_response_timestamp": null,

        "last_response_correctness": null,

        "never_show_again": 0,

        "module_id": "Module1",

        "question_type": "Multiple Choice"

    },

    "question4": {

        "question_id": "question4",

        "question_text": "Which city hosted the 1996 Summer Olympics?",

        "hint": "Its well known for its large population.",

        "bookmarked": 0,

        "last_response_timestamp": null,

        "last_response_correctness": null,

        "never_show_again": 0,

        "module_id": "Module1",

        "question_type": "Multiple Choice"

    },

    "question5": {

        "question_id": "question5",

        "question_text": "Who invented telephone?",

        "hint": "This scientist also did groundbreaking work in optical telecommunications, hydrofoils and aeronautics.",

        "bookmarked": 0,

        "last_response_timestamp": null,

        "last_response_correctness": null,

        "never_show_again": 0,

        "module_id": "Module1",

        "question_type": "Multiple Choice"

    },

    "question6": {

        "question_id": "question6",

        "question_text": "Who wrote the book 'The Origin of Species'?",

        "hint": "He was an English naturalist and geologist,best known for his contributions to the science of evolution.",

        "bookmarked": 0,

        "last_response_timestamp": null,

        "last_response_correctness": null,

        "never_show_again": 0,

        "module_id": "Module3",

        "question_type": "Multiple Choice"

    },

    "question7": {

        "question_id": "question7",

        "question_text": "Which of the following is necessary for burning (combustion)?",

        "hint": "It is necessary to sustain most terrestrial life. It is used in cellular respiration.",

        "bookmarked": 0,

        "last_response_timestamp": null,

        "last_response_correctness": null,

        "never_show_again": 0,

        "module_id": "Module3",

        "question_type": "Multiple Choice"

    },

    "question8": {

        "question_id": "question8",

        "question_text": "What is the total number of bones in the human body?",

        "hint": "Definitely more than 32!",

        "bookmarked": 0,

        "last_response_timestamp": null,

        "last_response_correctness": null,

        "never_show_again": 0,

        "module_id": "Module3",

        "question_type": "Multiple Choice"

    },

    "question9": {

        "question_id": "question9",

        "question_text": "In which sport opponents stand on opposite sides of a net? (Select all that apply)",

        "hint": "There is more than one correct answer.",

        "bookmarked": 0,

        "last_response_timestamp": null,

        "last_response_correctness": null,

        "never_show_again": 0,

        "module_id": "Module4",

        "question_type": "Multiple Select"

    },

    "question10": {

        "question_id": "question10",

        "question_text": "In which year did the American Olympic and professional boxer Muhammad Ali pass away?",

        "hint": "Very Recently",

        "bookmarked": 0,

        "last_response_timestamp": null,

        "last_response_correctness": null,

        "never_show_again": 0,

        "module_id": "Module4",

        "question_type": "Multiple Choice"

    },

    "question11": {

        "question_id": "question11",

        "question_text": "Which country quit the European Union recently?",

        "hint": "This country has a royal family.",

        "bookmarked": 0,

        "last_response_timestamp": null,

        "last_response_correctness": null,

        "never_show_again": 0,

        "module_id": "Module2",

        "question_type": "Multiple Choice"

    }

	};

/*********************************************************************************************/

	$scope.choices_info=
	{
    "question1": [

        {

            "choice_id": 1,

            "choice_text": "India",

            "feedback": "This response is incorrect. India is the second largest country by population.",

            "isCorrect": 0,

            "question_id": "question1"

        },

        {

            "choice_id": 2,

            "choice_text": "USA",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question1"

        },

        {

            "choice_id": 3,

            "choice_text": "China",

            "feedback": "This response is correct. China is the largest country by population.",

            "isCorrect": 1,

            "question_id": "question1"

        },

        {

            "choice_id": 4,

            "choice_text": "Russia",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question1"

        }

    ],

    "question2": [

        {

            "choice_id": 5,

            "choice_text": "1945",

            "feedback": "This response is correct. The second world war ended in 1945.",

            "isCorrect": 1,

            "question_id": "question2"

        },

        {

            "choice_id": 6,

            "choice_text": "1939",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question2"

        },

        {

            "choice_id": 7,

            "choice_text": "1944",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question2"

        },

        {

            "choice_id": 8,

            "choice_text": "1942",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question2"

        }

    ],

    "question3": [

        {

            "choice_id": 9,

            "choice_text": "USA",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question3"

        },

        {

            "choice_id": 10,

            "choice_text": "France",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question3"

        },

        {

            "choice_id": 11,

            "choice_text": "Italy",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question3"

        },

        {

            "choice_id": 12,

            "choice_text": "China",

            "feedback": "This response is correct. China was the first country to issue paper currency.",

            "isCorrect": 1,

            "question_id": "question3"

        }

    ],

    "question4": [

        {

            "choice_id": 13,

            "choice_text": "Atlanta",

            "feedback": "This response is correct. Atlanta hosted the 1996 Summer Olympics.",

            "isCorrect": 1,

            "question_id": "question4"

        },

        {

            "choice_id": 14,

            "choice_text": "Sydney",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question4"

        },

        {

            "choice_id": 15,

            "choice_text": "Athens",

            "feedback": "This response is correct.",

            "isCorrect": 0,

            "question_id": "question4"

        },

        {

            "choice_id": 16,

            "choice_text": "Beijing",

            "feedback": "This response is correct.",

            "isCorrect": 0,

            "question_id": "question4"

        }

    ],

    "question5": [

        {

            "choice_id": 17,

            "choice_text": "Albert Einstein",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question5"

        },

        {

            "choice_id": 18,

            "choice_text": "Alexander Graham Bell",

            "feedback": "This response is correct. Alexander Graham Bell invented the telephone.",

            "isCorrect": 1,

            "question_id": "question5"

        },

        {

            "choice_id": 19,

            "choice_text": "Isaac Newton",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question5"

        },

        {

            "choice_id": 20,

            "choice_text": "Marie Curie",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question5"

        }

    ],

    "question6": [

        {

            "choice_id": 21,

            "choice_text": "Louis Pasteur",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question6"

        },

        {

            "choice_id": 22,

            "choice_text": "Charles Darwin",

            "feedback": "This response is correct.",

            "isCorrect": 1,

            "question_id": "question6"

        },

        {

            "choice_id": 23,

            "choice_text": "Sir Alexander Fleming",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question6"

        },

        {

            "choice_id": 24,

            "choice_text": "Marie Curie",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question6"

        }

    ],

    "question7": [

        {

            "choice_id": 25,

            "choice_text": "Oxygen",

            "feedback": "This response is correct.",

            "isCorrect": 1,

            "question_id": "question7"

        },

        {

            "choice_id": 26,

            "choice_text": "Nitrogen",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question7"

        },

        {

            "choice_id": 27,

            "choice_text": "Hydrogen",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question7"

        },

        {

            "choice_id": 28,

            "choice_text": "Carbon",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question7"

        }

    ],

    "question8": [

        {

            "choice_id": 29,

            "choice_text": "32",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question8"

        },

        {

            "choice_id": 30,

            "choice_text": "196",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question8"

        },

        {

            "choice_id": 31,

            "choice_text": "206",

            "feedback": "This response is correct.",

            "isCorrect": 1,

            "question_id": "question8"

        },

        {

            "choice_id": 32,

            "choice_text": "512",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question8"

        }

    ],

    "question9": [

        {

            "choice_id": 33,

            "choice_text": "Tennis",

            "feedback": "Tennis and Volleyball are the correct responses.",

            "isCorrect": 1,

            "question_id": "question9"

        },

        {

            "choice_id": 34,

            "choice_text": "Soccer",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question9"

        },

        {

            "choice_id": 35,

            "choice_text": "Volleyball",

            "feedback": "Tennis and Volleyball are the correct responses.",

            "isCorrect": 1,

            "question_id": "question9"

        },

        {

            "choice_id": 36,

            "choice_text": "Cricket",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question9"

        }

    ],

    "question10": [

        {

            "choice_id": 37,

            "choice_text": "1992",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question10"

        },

        {

            "choice_id": 38,

            "choice_text": "2000",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question10"

        },

        {

            "choice_id": 39,

            "choice_text": "2016",

            "feedback": "This response is correct.",

            "isCorrect": 1,

            "question_id": "question10"

        },

        {

            "choice_id": 40,

            "choice_text": "2014",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question10"

        }

    ],

    "question11": [

        {

            "choice_id": 41,

            "choice_text": "France",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question11"

        },

        {

            "choice_id": 42,

            "choice_text": "United Kingdom",

            "feedback": "This response is correct.",

            "isCorrect": 1,

            "question_id": "question11"

        },

        {

            "choice_id": 43,

            "choice_text": "Germany",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question11"

        },

        {

            "choice_id": 44,

            "choice_text": "Italy",

            "feedback": "This response is incorrect.",

            "isCorrect": 0,

            "question_id": "question11"

        }

    ]

};
	  $scope.setDotColor = function() {
		  var dot = $('.dot'  + $scope.questionIndex);

		  if (dot.hasClass('greenDot')) {
			  dot.removeClass('greenDot')
			  dot.addClass('greenDotSelected');
		  }
		  else if (dot.hasClass('redDot')) {
			  dot.removeClass('redDot');
			  dot.addClass('redDotSelected');
		  }

		  //When they go forward, change the previous dot back to the correct color
		  if($scope.questionIndex - 1 > -1) {
			  var previouslySelectedDot = $('.dot' + ($scope.questionIndex-1));

			  if (previouslySelectedDot.hasClass('greenDotSelected')) {
				previouslySelectedDot.removeClass('greenDotSelected')
				previouslySelectedDot.addClass('greenDot');
			  }
		      else if (previouslySelectedDot.hasClass('redDotSelected')) {
			    previouslySelectedDot.removeClass('redDotSelected');
			    previouslySelectedDot.addClass('redDot');
			  }
		  }

		  //When they go back, change the current dot back to the correct color
		  if($scope.questionIndex + 1 < 10) {
			  var previouslySelectedDot = $('.dot' + ($scope.questionIndex+1));

			  if (previouslySelectedDot.hasClass('greenDotSelected')) {
				previouslySelectedDot.removeClass('greenDotSelected')
				previouslySelectedDot.addClass('greenDot');
			  }
		      else if (previouslySelectedDot.hasClass('redDotSelected')) {
			    previouslySelectedDot.removeClass('redDotSelected');
			    previouslySelectedDot.addClass('redDot');
			  }
		  }
	  }


      $scope.previousQuestion = function() {
		if(($scope.questionIndex - 1) >= 0) {
			$scope.questionIndex--;
			console.log("previous question");
			$ionicSlideBoxDelegate.previous();
			$scope.setDotColor();
			$('.questionProgression').html(($scope.questionIndex + 1) + '/' + Object.keys($scope.questions_info).length);
			
			//TODO: Get the current question in a less gross way
			var question = $scope.questions_info['question'+($scope.questionIndex+1)];
			if(question.bookmarked == 1)
				$('.favoriteButton').addClass('yellow');
			else
				$('.favoriteButton').removeClass('yellow');
		}
		
	    if($scope.modal.isShown()) {
   		  $scope.modal.hide();
		}
      };

      $scope.nextQuestion = function(index) {
		if(($scope.questionIndex + 1) >= 0) {
			$scope.questionIndex++;
			console.log("next question");
			$ionicSlideBoxDelegate.next();
			$scope.setDotColor();
			$('.questionProgression').html(($scope.questionIndex + 1) + '/' + Object.keys($scope.questions_info).length);
			$scope.modal.hide();
			
			//TODO: Get the current question in a less gross way
			var question = $scope.questions_info['question'+($scope.questionIndex+1)];
			if(question.bookmarked == 1)
				$('.favoriteButton').addClass('yellow');
			else
				$('.favoriteButton').removeClass('yellow');
		}
      };

      $scope.favoriteQuestion = function() {
		//TODO: Get the current question in a less gross way
		var question = $scope.questions_info['question'+($scope.questionIndex+1)];
        //TODO: Mark this question as a favorite
		console.log("question marked favorite");
		$('.favoriteButton').addClass('yellow');
		question.bookmarked = 1;
		var breakpoint = 'here';
      };

      $scope.getHint = function() {
		//TODO: Get the current question in a less gross way
		var question = $scope.questions_info['question'+($scope.questionIndex+1)];
        var hint = question.hint;
		var alertPopup = $ionicPopup.alert({
			title: 'Hint',
			template: question.hint
	    });



        console.log("student asked for a hint");
      };

      $scope.checkAnswer = function() {
        //TODO: Get the current question in a less gross way
		var question = $scope.questions_info['question'+($scope.questionIndex+1)];
		question.answerGiven = false;
		var selectedResponse = $("input[name=answer" + question.question_id + "]:checked").val();

		//If the user didn't select a response
		if(!selectedResponse) return;

        $scope.response = selectedResponse;
		$scope.isCorrect = false;
		for(var i = 0; i < $scope.choices_info[question.question_id].length; i++) {
			var choice = $scope.choices_info[question.question_id][i];
			if(choice.choice_id == selectedResponse) {
				
				//Set variables needed for the feedback screen
				$scope.questionText = question.question_text;
				$scope.selectedAnswer = choice.choice_text;
				$scope.feedbackText = choice.feedback;
				
				if(choice.isCorrect) {
					$scope.isCorrect = true;
					$scope.answer = choice;
					$('.dot' + $scope.questionIndex).addClass('greenDot');
				}
				else {
				  $('.dot' + $scope.questionIndex).addClass('redDot');
				}
			}
		}

		//Disable the submit button since the user has submitted their answer
		$('#submitButton').removeClass('wguyellowd');
	    $('#submitButton').addClass('wguyellowdisabled');
		
		//Show feedback
		$scope.testModal();
		
      };

      $scope.insertCourse = function(){
        var course_id = "Course1"; // replace with an acrobatiq api call
        var course_name = "General Knowledge";
        var course_description = "This is a course on general knowledge";
        var active = 1;
        DB.insertCourse(course_id, course_name, course_description, active);
      };

      $scope.insertModule = function(){
        var module_id = "Module1";
        var module_name = "Module1";
        var module_description = "This is module1";
        var available = 1;
        var course_id = "Course1";
        DB.insertModule(module_id, module_name, module_description, available, course_id);

        module_id = "Module2";
        module_name = "Module2";
        var module_description = "This is module2";
        var available = 1;
        var course_id = "Course1";
        DB.insertModule(module_id, module_name, module_description, available, course_id);
      };

      $scope.insertNewSession = function (){
        //var session_id =
        DB.insertSession();
      };

      $scope.endSession = function (){
        //var session_id =
        //DB.endSession();
      };

      $scope.insertSkill = function (){
        var skill_id = "Skill1";
        var skill_name = "Skill1";
        var skill_description = "Skill1";
        //var last_timestamp
        //var accuracy
        DB.insertSkill(skill_id, skill_name, null, skill_description );
      };

      $scope.insertQuestion = function (){
        questions.forEach(function(value, key) {
          var bookmarked = 0;
          var lastseen = null;
          var last_response = null;
          var never_show_again = 0;
          DB.insertQuestion(value.question_id, value.question_text, value.hint, bookmarked, lastseen, last_response, never_show_again,value.module_id, value.question_type);
        })
      };

      $scope.selectQuestionsWithChoices = function (){
          DB.selectQuestions().then(function(data)
          {
              var choices_fetched = 0;
              var choices_info = {};
              var questions_info = {};

              for (var i = 0; i < data.rows.length; i++)
              {
                  var question_id = data.rows.item(i).question_id;
                  var question_text = data.rows.item(i).question_text;
                  var hint = data.rows.item(i).hint;
                  var bookmarked = data.rows.item(i).bookmarked;
                  var lastseen  = data.rows.item(i).lastseen ;
                  var last_response = data.rows.item(i).last_response;
                  var never_show_again = data.rows.item(i).never_show_again;
                  var module_id = data.rows.item(i).module_id;
                  var question_type = data.rows.item(i).question_type;
                  questions_info[question_id] = data.rows.item(i);

                  // select choices for each question_id
                  DB.selectChoices(question_id).then(function(choices)
                  {
                    for (var k = 0; k < choices.rows.length; k++)
                     {
                       var choice_id = choices.rows.item(k).choice_id;
                       var choice_text = choices.rows.item(k).choice_text;
                       var feedback = choices.rows.item(k).feedback;
                       var isCorrect = choices.rows.item(k).isCorrect;
                       var question_id1 = choices.rows.item(k).question_id;
                       if (question_id1 in choices_info) {
                          choices_info[question_id1].push(choices.rows.item(k));
                       } else {
                          choices_info[question_id1] = [choices.rows.item(k)];
                       }

                      }
                      choices_fetched++;
                      if (choices_fetched == data.rows.length) {
                        console.log(JSON.stringify(choices_info, null, 4));
                      }

                  });
              }
                  console.log(JSON.stringify(questions_info, null, 4));

          });
       };

/*Question Selection Logic*/
       $scope.selectQuestionsBasedOnLogic = function(){
         var modules = ["Module1", "Module2"];

         $scope.selectSkillsFromModules(modules).then(function(selected_skills){
               console.log(JSON.stringify(selected_skills));

               var questions = {};
               var non_unique_questions_seen = 0;
               for(var i = 0; i < selected_skills.length; i++)
               {
                  var skill_id = selected_skills[i];
                  console.log("going through each skill: "+ skill_id);

                  $scope.selectUnseenQuestionsForSkill(skill_id).then(function(unseenQuestions){
                      var twoQuestions = 0;
                      //console.log("going through each skill: "+ skill_id);
                      console.log(JSON.stringify(unseenQuestions, null, 4));
                      console.log("twoQuestions: "+twoQuestions);
                      for (var unseenQuestion_id in unseenQuestions)
                      {
                          questions[unseenQuestion_id] = unseenQuestions[unseenQuestion_id];
                          non_unique_questions_seen++;
                          twoQuestions ++;
                          console.log("twoQuestions: "+twoQuestions);
                          if(non_unique_questions_seen == 2 * selected_skills.length)
                          {
                            console.log("final list of questions");
                            console.log(JSON.stringify(questions, null, 4));
                          }
                      }
                    })

                      /*if(twoQuestions == 0) // there are no unseen questions
                      {
                          //get one incorrect and one correct question with the oldest timestamps
                          $scope.selectIncorrectQuestionForSkill(skill_id).then(function(incorrectQuestions){
                              //console.log(JSON.stringify(incorrectQuestions, null, 4));
                              for (var incorrectQuestion_id in incorrectQuestions)
                              {
                                questions[incorrectQuestion_id] = incorrectQuestions[incorrectQuestion_id];
                                twoQuestions ++;
                              }
                              $scope.selectCorrectQuestionForSkill(skill_id).then(function(correctQuestions){
                                  //console.log(JSON.stringify(correctQuestions, null, 4));
                                  for (var correctQuestion_id in correctQuestions)
                                  {
                                    questions[correctQuestion_id] = correctQuestions[correctQuestion_id];
                                    twoQuestions ++;
                                    if(twoQuestions == 2)
                                    {
                                      console.log(JSON.stringify(questions, null, 4));
                                    }
                                  }
                              }) // end of selecting all correct questions
                          }) // end of selecting all incorrect questions

                      }
                      else
                      if(twoQuestions == 1) // one unseen question is selected
                      {
                          //get one incorrect question with the oldest timestamp
                          $scope.selectIncorrectQuestionForSkill(skill_id).then(function(incorrectQuestions){
                              //console.log(JSON.stringify(incorrectQuestions, null, 4));
                              for (var incorrectQuestion_id in incorrectQuestions)
                              {
                                questions[incorrectQuestion_id] = incorrectQuestions[incorrectQuestion_id];
                                twoQuestions ++;
                                if(twoQuestions == 2)
                                {
                                  console.log(JSON.stringify(questions, null, 4));
                                }
                              }
                          })
                      } // end of if one unseen question is selected
                  })// end of selecting all unseen questions*/
               } // end of for loop for going through each selected skill_id
         })// end of selecting all skills for selected modules
       };

       $scope.selectSkillsFromModules = function (modules){

         // We need the SQL query to have the list of Modules with quotes around each module_id
         var modules1 = [];
         for (var i = 0; i < modules.length; i++)
         {
           modules1.push("'"+modules[i]+"'");
         }

         //fesf
         var checkpoint_num_questions = 5;
         var selected_skills_info = {};
         return DB.selectSkillsFromModules(modules1, checkpoint_num_questions).then(function(data)
           {
             for (var i = 0; i < data.rows.length; i++)
             {
                 var skill_id = data.rows.item(i).skill_id;
                 var accuracy = data.rows.item(i).accuracy;
                 selected_skills_info[skill_id] = accuracy;
             }

            var sortedSelected_skills_info = Object.keys(selected_skills_info).sort(function(a,b){return selected_skills_info[a]-selected_skills_info[b]});
          //  console.log(JSON.stringify(sortedSelected_skills_info, null, 4));
            return sortedSelected_skills_info;
           }, function(error) {
               console.error("selectSkillsFromModules Error message: "+ JSON.stringify(error, null, 4));
           });
       };

       $scope.selectUnseenQuestionsForSkill = function(skill_id){
         //var skill_id = "Skill1";
         return DB.selectUnseenQuestionsForSkill(skill_id).then(function(data)
         {
           var questions_info = {};

           for (var i = 0; i < data.rows.length; i++)
           {
               var question_id = data.rows.item(i).question_id;
               var question_text = data.rows.item(i).question_text;
               var hint = data.rows.item(i).hint;
               var bookmarked = data.rows.item(i).bookmarked;
               var lastseen  = data.rows.item(i).lastseen ;
               var last_response = data.rows.item(i).last_response;
               var never_show_again = data.rows.item(i).never_show_again;
               var module_id = data.rows.item(i).module_id;
               var question_type = data.rows.item(i).question_type;
               questions_info[question_id] = data.rows.item(i);
            }
            //console.log(JSON.stringify(questions_info, null, 4));
            return questions_info;

         }, function(error) {
             console.error("selectUnseenQuestionsForSkill Error message: "+ JSON.stringify(error, null, 4));
         });
       };

       $scope.selectIncorrectQuestionForSkill = function(skill_id){
         //var skill_id = "Skill1";
         return DB.selectIncorrectQuestionForSkill(skill_id).then(function(data)
         {
           var questions_info = {};

           for (var i = 0; i < data.rows.length; i++)
           {
               var question_id = data.rows.item(i).question_id;
               var question_text = data.rows.item(i).question_text;
               var hint = data.rows.item(i).hint;
               var bookmarked = data.rows.item(i).bookmarked;
               var lastseen  = data.rows.item(i).lastseen ;
               var last_response = data.rows.item(i).last_response;
               var never_show_again = data.rows.item(i).never_show_again;
               var module_id = data.rows.item(i).module_id;
               var question_type = data.rows.item(i).question_type;
               questions_info[question_id] = data.rows.item(i);
            }
            //console.log(JSON.stringify(questions_info, null, 4));
            return questions_info;

         }, function(error) {
             console.error("selectUnseenQuestionsForSkill Error message: "+ JSON.stringify(error, null, 4));
         });
       };

       $scope.selectCorrectQuestionForSkill = function(skill_id){
         //var skill_id = "Skill1";
         return DB.selectCorrectQuestionForSkill(skill_id).then(function(data)
         {
           var questions_info = {};

           for (var i = 0; i < data.rows.length; i++)
           {
               var question_id = data.rows.item(i).question_id;
               var question_text = data.rows.item(i).question_text;
               var hint = data.rows.item(i).hint;
               var bookmarked = data.rows.item(i).bookmarked;
               var lastseen  = data.rows.item(i).lastseen ;
               var last_response = data.rows.item(i).last_response;
               var never_show_again = data.rows.item(i).never_show_again;
               var module_id = data.rows.item(i).module_id;
               var question_type = data.rows.item(i).question_type;
               questions_info[question_id] = data.rows.item(i);
            }
            //console.log(JSON.stringify(questions_info, null, 4));
            return questions_info;

         }, function(error) {
             console.error("selectUnseenQuestionsForSkill Error message: "+ JSON.stringify(error, null, 4));
         });
       };

/**********************/


		$scope.answerSelected = function (opt, index) {
			if(opt){
			  $("input[value=" + opt.choice_id + "]").prop("checked", true);
			  $('#submitButton').removeClass('wguyellowdisabled');
			  $('#submitButton').addClass('wguyellow');
			}
		}

		angular.element(document).ready(function () {
			$('.questionProgression').html(($scope.questionIndex + 1) + '/' + Object.keys($scope.questions_info).length);
		});
		
		$ionicModal.fromTemplateUrl('my-modal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		  }).then(function(modal) {
			$scope.modal = modal;
		  });
		  $scope.openModal = function() {
			$scope.modal.show();
		  };
		  $scope.closeModal = function() {
			$scope.modal.hide();
		  };
		  // Cleanup the modal when we're done with it!
		  $scope.$on('$destroy', function() {
			$scope.modal.remove();
		  });
		  // Execute action on hide modal
		  $scope.$on('modal.hidden', function() {
			// Execute action
		  });
		  // Execute action on remove modal
		  $scope.$on('modal.removed', function() {
			// Execute action
		  });

	    $scope.testModal = function () {
	      $scope.modal.show();
		  if($scope.isCorrect) {
			$('.feedbackSelectedAnswer').addClass('correctAnswer');  
		  }
		  else {
		    $('.feedbackSelectedAnswer').addClass('incorrectAnswer');
		  }
		}
    });
})();
