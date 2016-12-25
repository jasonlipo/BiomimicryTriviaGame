$(function() {

    // Initialise the game object on the HTML element with class 'hangman-game'
	// Below is a list of all the words that could be asked
    hang = new Hangman($('.hangman-game'), [
        "computer",
        "array",
        "epicodus",
        "string",
        "boolean",
        "function",
        "object",
        "method",
        "callback",
        "property",
        "prototype",
        "javascript",
        "jquery",
        "language",
        "programming",
        "primatives",
        "syntax"
    ]);

});