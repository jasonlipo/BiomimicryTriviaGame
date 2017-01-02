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
        this.wordToGuess = this.listOfWords[Math.floor(Math.random() * this.listOfWords.length)];
        this.revealedLetters = [];

        // Set up the DOM
        this.el.find('.incorrect-guesses h3').empty().append("Incorrect Guesses: ");
        this.el.find('.word-container').empty();
        for (i=0; i<this.wordToGuess.length; i++) {
            this.revealedLetters.push("");
            this.el.find('.word-container').append("<p class='letter'></p>");
        }

        this.el.find('.unguessed-letters').empty();
        for (i=0; i<this.listOfLetters.length; i++) {
            this.el.find(".unguessed-letters").append("<span class='letter-choice'>" + this.listOfLetters[i] + "</span>");
        }

        // Guess a letter
        game = this;
        this.el.find(".letter-choice").click(function() {
            $(this).addClass("muted");
            guessedLetter = $(this).text();
            game.makeGuess(guessedLetter);
        }); 

        $(document).keyup(function (e) {
            keyCode = e.which;
            if (keyCode >= 65 && keyCode <= 90) {
                $(this).addClass("muted");
                guessedLetter = String.fromCharCode(keyCode).toLowerCase();
                game.el.find('.letter-choice').each(function () {
                    if ($(this).html() == guessedLetter) {
                        $(this).addClass('muted');
                    }
                });
                game.makeGuess(guessedLetter);
            }
        });

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
                this.wrong++;
            }

            $('.word-container').empty();
            for (i=0; i<this.revealedLetters.length; i++) {
                this.el.find('.word-container').append("<p class='letter'>" + this.revealedLetters[i] + "</p>");
            }

            this.el.find('div.hangman-sprite').removeClass().addClass('hangman-sprite hangman-sprite' + this.wrong);

            this.el.find('.incorrect-guesses h3').empty().append("Incorrect Guesses: ");
            for (i=0; i<this.incorrectGuessedLetters.length; i++) {
                this.el.find('.incorrect-guesses h3').append(this.incorrectGuessedLetters[i] + " ");
            }

            if (this.isOver()) {
                this.finish();
            }

        }

    }

    // Hangman.wordHasLetter
    // Returns true if the word contains the queried letter
    this.wordHasLetter = function(guessedLetter) {
        return this.wordToGuess.indexOf(guessedLetter) > -1;
    }

    // Hangman.revealLetters
    // Add the guessedLetter into the revealedLetters array at the right index
    this.revealLetters = function(guessedLetter) {
        for (i=0; i<this.revealedLetters.length; i++) {
            if (guessedLetter == this.wordToGuess[i]) {
                this.revealedLetters[i] = guessedLetter;
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
        return this.hangmanDead() || this.isRevealed();
    }

    // Hangman.hangmanDead
    // The game ends when the user guesses 7 incorrect letters
    this.hangmanDead = function () {
        return this.wrong >= 7;
    }

    // Hangman.finish
    // Notify the user if they have won or lost the gmae
    this.finish = function () {
        if (this.hangmanDead()) {
            alert("You lose");
        }
        else if (this.isRevealed()) {
            alert("You win!");
        }
    }

    this.initialise(e, w);

}
