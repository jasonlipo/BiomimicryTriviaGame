var Hangman = function (e, w) {
    
    this.initialise = function (el, words) {
        
        this.el = el;
        this.listOfLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

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
            var guessedLetter = $(this).text();
            
            if (game.hasBeenGuessed(guessedLetter)) {
                alert("That letter has already been guessed. Please select another letter.");
            }
            else {
                
                game.makeGuess(guessedLetter);

                $('.word-container').empty();
                for (i=0; i<game.revealedLetters.length; i++) {
                    game.el.find('.word-container').append("<p class='letter'>" + game.revealedLetters[i] + "</p>");
                }

                game.el.find('div.hangman-sprite').removeClass().addClass('hangman-sprite hangman-sprite' + game.wrong);

                game.el.find('.incorrect-guesses h3').empty().append("Incorrect Guesses: ");
                for (i=0; i<game.incorrectGuessedLetters.length; i++) {
                    game.el.find('.incorrect-guesses h3').append(game.incorrectGuessedLetters[i] + " ");
                }

                if (game.isOver()) {
                    game.finish();
                }

            }
        }); 

    }

    this.makeGuess = function (letter) {
        this.guessedLetters.push(letter);
        if (this.wordHasLetter(letter)) {
            this.revealLetters(letter);
        } else {
            this.markLetterAsIncorrectGuess(letter);
            this.wrong++;
        }
    }

    this.wordHasLetter = function(guessedLetter) {
        return this.wordToGuess.indexOf(guessedLetter) > -1;
    }

    this.revealLetters = function(guessedLetter) {
        for (i=0; i<this.revealedLetters.length; i++) {
            if (guessedLetter == this.wordToGuess[i]) {
                this.revealedLetters[i] = guessedLetter;
            }
        }
    }

    this.generateRevealedLetters = function() {
        this.revealedLetters = [];
        for (var i = this.key.length; i > 0; i--) {
            this.revealedLetters.push("");
        }
    }

    this.isRevealed = function() {
        return !this.revealedLetters.some(function(letter) {
            return letter === '';
        });
    }

    this.hasBeenGuessed = function(letter) {
        return this.guessedLetters.indexOf(letter) > -1;
    }

    this.markLetterAsIncorrectGuess = function(letter) {
        this.incorrectGuessedLetters.push(letter);
    }

    this.isOver = function(hangman, wordToGuess) {
        return this.hangmanDead() || this.isRevealed();
    }

    this.hangmanDead = function () {
        return this.wrong >= 7;
    }

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
