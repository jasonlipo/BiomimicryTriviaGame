var Memory = function (){
    
    this.initialise = function(tiles) {
        this.info = info;
        this.modalWrapper = $(".modalWrapper");
        this.modal = $(".modal");
        this.hideModal();
        this.count = 0;
        this.canFlip = true;
        this.tiles = this.shuffle(tiles);
        for (var i = 0; i < this.tiles.length; i++) {
            $(".wrapper").append("\
            <div class='flipContainer' key='"+i+"'>\
                <div class='tile' >\
                    <div class='face'>\
                        <img src='media/logo_hamanchil.jpg'>\
                    </div>\
                    <div class='back'>\
                        <img src='"+this.tiles[i].img+"'>\
                    </div>\
                </div>\
            </div>");
            if ((i + 1) % 6 == 0) {
                $(".wrapper").append("<br />");
            }        
            a = this;
            $('.flipContainer').click(function (obj) {
                a.clicked($(this));
            });
        }            
    }
    //shuffles the tiles
    this.shuffle = function(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
    }
    this.clicked = function(x) {
        if (this.canFlip && !x.hasClass("matched")) {
            $(x).addClass("clicked").addClass("flip");
            this.checkMatch();
        }
    }
    this.showInfo = function(text) {
        $("#infoText").append(text);
        $(".infoWrapper").css("z-index", 10);
        $(".closeInfo").on("click", this.buttonClick);
    }
    this.buttonClick = function() {
        a.canFlip = true;
        $("#infoText").eq(0).empty();
        $(".infoWrapper").css("z-index", -1);
    }
    this.checkMatch = function() {
        if ($(".clicked").size() == 2) {
            this.canFlip = false;
            this.count++;
            var idx1 = $(".clicked").eq(0).attr("key");
            var idx2 = $(".clicked").eq(1).attr("key");
            tile1 = this.tiles[idx1];
            tile2 = this.tiles[idx2];
            setTimeout(function () {
                if (tile1.id == tile2.id) {
                    $(".clicked").addClass("matched");
                    this.showInfo(this.info[tile1.id].text);
                    if ($(".matched").size() == this.tiles.length) {
                        this.win();
        }
                }
                else {
                    $(".clicked").removeClass("flip");
                    this.canFlip = true;
                }
                $(".clicked").removeClass("clicked");
            }.bind(this), 500);
        }
    }
    this.showModal = function() {
        this.modalWrapper.show();
		this.modal.fadeIn();
    }
    this.hideModal = function() {
        this.modalWrapper.hide();
        this.modal.hide();
    }
    this.win = function() {
        this.canFlip = false;
        $(".count").append(this.count);
        setTimeout(function(){
			this.$(".flipContainer").fadeOut();
			}, 300);	
        setTimeout(function() {
            this.game.showModal();
            },1000);
    }
}
    



var tiles = [
		{
			name: "abalone",
			img: "media/abalone.jpg",
			id: 0,
		},
		{
			name: "abaloneMatch",
			img: "media/abaloneMatch.jpg",
			id: 0
		},
		{
			name: "bees",
			img:"media/bees.jpg",
			id: 1
		},
		{
			name: "beesMatch",
			img: "media/beesMatch.jpg",
			id: 1
		},{
			name: "bird",
			img: "media/bird.jpg",
			id: 2
		},
		{
			name: "birdMatch",
			img: "media/birdMatch.jpg",
			id: 2
		},
		{
			name: "elephant",
			img:"media/elephant.jpg",
			id: 3
		},
		{
			name: "elephantMatch",
			img: "media/elephantMatch.jpg",
			id: 3
		},{
			name: "fish",
			img: "media/fish.jpg",
			id: 4
		},
		{
			name: "fishMatch",
			img: "media/fishMatch.jpg",
			id: 4
		},
		{
			name: "owl",
			img:"media/owl.jpg",
			id: 5
		},
		{
			name: "owlMatch",
			img: "media/owlMatch.jpg",
			id: 5
		},{
			name: "termites",
			img: "media/termites.jpg",
			id: 6
		},
		{
			name: "termitesMatch",
			img: "media/termitesMatch.jpg",
			id: 6
		},
		{
			name: "velcro",
			img:"media/velcro.jpg",
			id: 7
		},
		{
			name: "velcroMatch",
			img: "media/velcroMatch.jpg",
			id: 7
		},{
			name: "whale",
			img: "media/whale.jpg",
			id: 8
		},
		{
			name: "whaleMatch",
			img: "media/whaleMatch.jpg",
			id: 8
		},{
			name: "termites",
			img: "media/termites.jpg",
			id: 9
		},
		{
			name: "termitesMatch",
			img: "media/termitesMatch.jpg",
			id: 9
		},
		{
			name: "velcro",
			img:"media/velcro.jpg",
			id: 10
		},
		{
			name: "velcroMatch",
			img: "media/velcroMatch.jpg",
			id: 10
		},{
			name: "whale",
			img: "media/whale.jpg",
			id: 11
		},
		{
			name: "whaleMatch",
			img: "media/whaleMatch.jpg",
			id: 11
		}			
	];

var info = [
		{
			id: "1",
			text: "קרמיקות הן לרוב שבירות ובעלות חוזק נמוך. יצור הקרמיקה כרוך בכבישה בלחצים של 4,000-400 טונות ושריפה בתנורים בטמפרטורה של 1,000°C לפחות, תהליך הצורך אנרגיה רבה ומזהם את הסביבה. אחד השראה לייצור קרמיקה משופרת וידידותית יותר לסביבה נעשה באמצעות האבלון (Abalone) . האבלון היא רכיכה ימית שצדפתה עשויה מסידן פחמני במבנה מתוחכם שמגביר את חוזקה פי 3,000 יחסית למבנים אחרים מאותו החומה.",
			
		},
		{
			id: "2",
			text: "test2",
			
		},{
			id: "3",
			text: "רכבת הקליע היפנית היא אחת הרכבות המהירות בעולם. במהירות הגבוהה נוצר גל רעש חזק המפריע לתושבים ברדיוס של 80 ק\"מ! ההשראה לפיתוח הקטר שהפחית רעשים נמצא בדמות השלדג הצולל לתוך המים מהאוויר תוך איבוד אנרגיה מינימלי. באמצעות המבנה האווירודינמי של מקור השלדג, הוא מצליח להתגבר על השינוי הפתאומי בהתנגדות, וכמעט שאינו מתיז מים בחדירתו למים.",
			
		},{
			id: "4",
			text: "זרוע רובוטית שפותחה בהשראת החדק של הפיל. החדק מורכב ממערכת של שרירים (ללא עצמות) ומסוגל להניע הן חפצים גדולים כגון גזעי עצים שלמים והן חפצים קטנים ועדינים כמו פירות ואפילו עלים. התכונות המאפיינות את חדק הפיל – טווח תנועה רחב, עדינות, גמישות, דיוק ומהירות תנועה.",
			
		},{
			id: "5",
			text: "מערכת נשימה תת מימית, המשתמשת באוויר המומס במים לצרכי נשימה תת מימית בצוללות, במגורים תת ימיים או בצלילה אישית פותחה בהשראת מנגנון הנשימה של הדגים. אך מכיוון שהריאות שלנו זקוקות לחמצן במצב צבירה של גז, הרי שבנוסף להפרדה מהמים המנגנון הופך את האוויר המומס ממצב צבירה נוזלי לגז על פי 'חוק הנרי'.",
			
		},{
			id: "6",
			text: "test6",
			
		},{
			id: "7",
			text: "test7",
			
		},{
			id: "8",
			text: "test8",
			
		},{
			id: "9",
			text: "test9",
			
		},{
			id: "10",
			text: "test10",
			
		},{
			id: "11",
			text: "זרע מצופה קוצים דמויי אנקול אשר נתפסים בפרווה של בעלי חיים לשם הסעת הזרע למרחק גדול מהצמח ההורה. מנגנון זה היווה השראה לפיתוח וולקרו (Velcro בעברית נקרא גם סקוץ' או צמדן) - מנגנון הצמדה שפותח בשנות ה-50, ומשמש כיום לשם רכיסת בדים, נעליים, תיקים ועוד.",
			
		},{
			id: "12",
			text: "test12",
			
		}
    ];

$(function () {
    game = new Memory();
    game.initialise(tiles); 
});

