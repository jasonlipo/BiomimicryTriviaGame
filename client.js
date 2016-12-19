$(function () {
	
	// Initialise the game object on the HTML element with class 'wrapper'
	// Below is a list of all the questions and correct/incorrect answers in JSON format
	quiz = new TriviaQuiz($('.wrapper'), [
		{
			"question": "This is question 1.",
			"answers": [
				{ "text": "Answer 1 is incorrect", "correct": false },
				{ "text": "Answer 2 is incorrect", "correct": false },
				{ "text": "Answer 3 is correct", "correct": true },
				{ "text": "Answer 4 is incorrect", "correct": false }
			]
		},
		{
			"question": "This is question 2.",
			"answers": [
				{ "text": "Answer 1 is correct", "correct": true },
				{ "text": "Answer 2 is incorrect", "correct": false },
				{ "text": "Answer 3 is incorrect", "correct": false },
				{ "text": "Answer 4 is incorrect", "correct": false }
			]
		}
	]);

});