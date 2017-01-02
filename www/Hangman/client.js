$(function() {

    // Initialise the game object on the HTML element with class 'hangman-game'
	// Below is a list of all the words that could be asked
    hang = new Hangman($('.hangman-game'), [
        "חוכמת הטבע",
        "חדשנות מהטבע",
        "חדשנות סביבתית",
        "עקרונות פעולה בעולם החי",
        "חיקוי ולמידה מהטבע",
        "ביומימיקרי",
        "ביומימטיקה",
        "ננוביומימיקרי",
        "עיצוב מקיים",
    ]);

});