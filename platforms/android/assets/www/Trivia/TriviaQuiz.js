var FILENAME = 'TriviaHighScores.txt';
document.addEventListener('deviceready', function () {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, null);
}, false);

var TriviaQuiz = function(t, x) {

    // TriviaQuiz.initialise
    // Set up the initial object properties
    this.initialise = function (t, x) {

        this.target = t;
        this.question_data = x;
        this.current_question = -1;
        this.score = 0;

        this.shuffle(this.question_data);

        // Start the first question
        this.nextQuestion();

    }

    // TriviaQuiz.shuffle
    // Randomise and array
    this.shuffle = function(a) {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }

    // TriviaQuiz.nextQuestion
    // Processes the next question by manipulating the DOM
    this.nextQuestion = function () {

        // Increment the question count
        this.current_question++;

        // If no more questions, end the game
        if (this.current_question == this.question_data.length) {
            this.endGame();
            return;
        }

        var this_obj = this.question_data[this.current_question];
        var this_question = this_obj["question"];
        var this_answers = this_obj["answers"];

        this.shuffle(this_answers);

        // Fill the DOM with the current question and answers
        this.target.find('.question').html((this.current_question+1) + ". " + this_question);
        for (var i=0; i<this_answers.length; i++) {
            this.target.find('.answers .answer-' + i).html(this_answers[i]["text"]);
        }

        // Set the click events for the questions
        this.activateClickEvents();

    }

    // TrviaQuiz.activateClickEvents
    // When clicking on each answer, check whether it is correct
    this.activateClickEvents = function () {
        // Temporary "this" store as overloaded in the anonymous function below
        game = this;
        this.target.find('.answers div').on('click', function () {
            // Find the position number of the answer and check it
            var ans_index = $(this).index('.answers div');
            game.checkAnswer(ans_index);
        });
    }

    // TriviaQuiz.checkAnswer
    // Validate the chosen answer and if correct, go to the next question
    // If wrong, do something else
    this.checkAnswer = function (i) {
        // Use the question property to work out if this answer is correct
        var this_obj = this.question_data[this.current_question];
        var this_answers = this_obj["answers"];
        if (this_answers[i]["correct"]) {
            // Show this answer as correct
            // Add the appropriate points
            // Disable all further clicks for 3 seconds
            // Then show the next question
            this.target.find('.answer-' + i).addClass('right');
            this.score++;
            this.updateScore();
            this.target.find('.answers div').unbind('click');
            timer_ref = this;
            setTimeout(function () {
                timer_ref.target.find('.answers div').removeClass('right');
                timer_ref.nextQuestion();
            }, 1000);
        }
        else {
            // Show this as the wrong answer and show the correct one
            // Disable all further clicks for 3 seconds
            // Then show the next question
            this.target.find('.answer-' + i).addClass('wrong');
            for (x in this_answers) {
                if (this_answers[x]["correct"]) {
                    this.target.find('.answer-' + x).addClass('right');
                }
            }
            this.target.find('.answers div').unbind('click');
            timer_ref = this;
            setTimeout(function () {
                timer_ref.target.find('.answers div').removeClass('wrong').removeClass('right');
                timer_ref.nextQuestion();
            }, 1000);
        }
    }

    // TriviaQuiz.updateScore
    // Updates the score box with the newest score count
    this.updateScore = function () {
        this.target.find('.scoreBox .score').html(this.score);
    }

    // TriviaQuiz.endGame
    // Finish the game and show highscore table
    this.endGame = function () {
        readText(function (text) {
            numberToDisplay = 5;
            if (text == "") {
                scores = [];
            }
            else {
                scores = JSON.parse(text);
            }
            scores.push({
                name: "...",
                score: this.score
            })
            scores.sort(function (a, b) {
                return b.score - a.score;
            });
            scores = scores.splice(0, numberToDisplay);
            $('.question').html('ציוני');
            $('.answers').after('<div class="scores"></div>');
            $('.answers').hide();
            for (i=0; i<scores.length; i++) {
                if (scores[i].name == "...") {
                    $('.scores').append('<div class="row s"><div class="name"><input type="text" class="highscore-name" placeholder="הכנס את שמך" id="'+i+'" /></div><div class="number">'+this.score+'</div></div>');
                }
                else {
                    $('.scores').append('<div class="row"><div class="name">'+scores[i].name+'</div><div class="number">'+scores[i].score+'</div></div>');
                }
            }
            $('.scores').append('<br /><button class="finish">שלח</button>');
            $('.finish').click(this.onfinishscores.bind(this));
            $(document).keypress(function (e) {
                if (e.which == 13) {
                    this.onfinishscores.bind(this)();
                }
            }.bind(this));
        }.bind(this));
    }

    this.onfinishscores = function () {
        if ($('.highscore-name').size() > 0) {
            name = $('.highscore-name').val();
            i = parseInt($('.highscore-name').attr('id'));
            scores[i].name = name;
            saveText(JSON.stringify(scores), function () {
                this.reset();
            }.bind(this));
        }
        else {
            this.reset();
        }
    }

    // TriviaQuiz.reset
    // Re-start the game
    this.reset = function () {
        location.href='../index.html';
    }

    this.initialise(t, x);

}
