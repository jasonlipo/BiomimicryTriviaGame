var FILENAME = 'HangmanHighScores.txt';
document.addEventListener('deviceready', function () {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, null);
}, false);

var Hangman = function (e, w) {

    // Hangman.initialise
    // Build the hangman game
    this.initialise = function (el, words) {

        this.el = el;
        this.listOfLetters = ["א","ב","ג","ד","ה","ו","ז","ח","ט","י","כ","ל","מ","נ","ס","ע","פ","צ","ק","ר","ש","ת"];

        this.guessedLetters = [];
        this.incorrectGuessedLetters = [];
        this.wrong = 0;

        // Initialise the new word
        this.listOfWords = words;
        this.wordToGuess = this.listOfWords[Math.round(Math.random() * (this.listOfWords.length-1))];
        this.revealedLetters = [];

        // Set up the DOM
        this.el.find('.word-container').empty();
        for (i=0; i<this.wordToGuess.length; i++) {
            this.revealedLetters.push(this.wordToGuess[i]==" "?" ":"");
            this.el.find('.word-container').append("<p class='letter "+(this.wordToGuess[i]==" "?"space":"")+"'></p>");
        }

        this.el.find('.unguessed-letters').empty();
        for (i=0; i<this.listOfLetters.length; i++) {
            this.el.find(".unguessed-letters").append("<span class='letter-choice'>" + this.listOfLetters[i] + "</span>");
        }

        $('.start_button').click(this.start.bind(this));

    }

    this.start = function () {

        $('.start_button').hide();

        // Guess a letter
        game = this;
        this.el.find(".letter-choice").click(function() {
            $(this).addClass("muted");
            guessedLetter = $(this).text();
            game.makeGuess(guessedLetter);
        });

        this.startTimer();

    }

    this.startTimer = function () {
        this.timer = 0;
        this.timerInterval = setInterval(this.incrementTimer.bind(this), 1000);
    }

    this.incrementTimer = function () {
        this.timer++;
        this.showTimer();
    }

    this.secondsToString = function (s) {
        minutes = Math.floor(s/60);
        if (minutes.toString().length == 1) { minutes = "0" + minutes; }
        seconds = s % 60;
        if (seconds.toString().length == 1) { seconds = "0" + seconds; }
        return minutes + " : " + seconds;
    }

    this.showTimer = function () {
        $('.timer').html(this.secondsToString(this.timer));
    }

    // Hangman.makeGuess
    // Callback function when the user guesses a letter
    this.makeGuess = function (guessedLetter) {

        if (this.guessedLetters.indexOf(guessedLetter) === -1) {

            this.guessedLetters.push(guessedLetter);
            if (this.wordHasLetter(guessedLetter)) {
                this.revealLetters(guessedLetter);
            } else {
                this.incorrectGuessedLetters.push(guessedLetter);
                this.timer += 30;
                this.showTimer();
            }

            $('.word-container').empty();
            for (i=0; i<this.revealedLetters.length; i++) {
                this.el.find('.word-container').append("<p class='letter "+(this.wordToGuess[i]==" "?"space":"")+"'>" + this.revealedLetters[i] + "</p>");
            }

            if (this.isOver()) {
                this.finish();
            }

        }

    }

    this.synonymLetters = function (letter) {
        synonyms = [letter];
        switch (letter) {
            case "כ‎":
            synonyms.push("ך");
            break;
            case "מ":
            synonyms.push("ם");
            break;
            case "נ‎":
            synonyms.push("ן‎");
            break;
            case "פ":
            synonyms.push("ף");
            break;
            case "צ":
            synonyms.push("ץ");
            break;
        }
        return synonyms;
    }

    // Hangman.wordHasLetter
    // Returns true if the word contains the queried letter
    this.wordHasLetter = function(guessedLetter) {
        letters = this.synonymLetters(guessedLetter);
        for (var i=0; i<letters.length; i++) {
            if (this.wordToGuess.indexOf(letters[i]) > -1) {
                return true;
            }
        }
        return false;
    }

    // Hangman.revealLetters
    // Add the guessedLetter into the revealedLetters array at the right index
    this.revealLetters = function(guessedLetter) {
        synonyms = this.synonymLetters(guessedLetter);
        for (i=0; i<this.revealedLetters.length; i++) {
            if (synonyms.indexOf(this.wordToGuess[i]) > -1) {
                this.revealedLetters[i] = this.wordToGuess[i];
            }
        }
    }

    // Hangman.generateRevealedLetters
    // Initialise an empty array equal to the length of the word
    this.generateRevealedLetters = function() {
        this.revealedLetters = [];
        for (var i = this.wordToGuess.length; i > 0; i--) {
            this.revealedLetters.push("");
        }
    }

    // Hangman.isRevealed
    // Returns true if all the letters have been revealed i.e. won the game
    this.isRevealed = function() {
        return !this.revealedLetters.some(function(letter) {
            return letter === '';
        });
    }

    // Hangman.isOver
    // Either a win or a lose results in the game ending
    this.isOver = function(hangman, wordToGuess) {
        return this.isRevealed();
    }

    // Hangman.finish
    // Finish the game and show highscore table
    this.finish = function () {
        clearInterval(this.timerInterval);
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
                time: this.timer
            })
            scores.sort(function (a, b) {
                return a.time - b.time;
            });
            scores = scores.splice(0, numberToDisplay);
            $('.title h1').html('לוח תוצאות');
            $('.hangman-game').after('<div class="scores"></div>');
            $('.hangman-game').hide();
            for (i=0; i<scores.length; i++) {
                if (scores[i].name == "...") {
                    $('.scores').append('<div class="row s"><div class="name"><input type="text" class="highscore-name" placeholder="הכנס את שמך" id="'+i+'" /></div><div class="number">'+this.secondsToString(scores[i].time)+'</div></div>');
                }
                else {
                    $('.scores').append('<div class="row"><div class="name">'+scores[i].name+'</div><div class="number">'+this.secondsToString(scores[i].time)+'</div></div>');
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

    // Hangman.reset
    // Re-start the game
    this.reset = function () {
        location.href='../index.html';
    }

    this.initialise(e, w);

}
