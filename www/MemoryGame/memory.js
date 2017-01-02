var Memory = function (){
    
    this.initialise = function(tiles) {
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
            a = this;
            $('.flipContainer').click(function (obj) {
                a.clicked($(this));
            });
        }            
    }
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
    
    this.checkMatch = function() {
        if ($(".clicked").size() == 2) {
            this.canFlip = false;
            var idx1 = $(".clicked").eq(0).attr("key");
            var idx2 = $(".clicked").eq(1).attr("key");
            tile1 = this.tiles[idx1];
            tile2 = this.tiles[idx2];
            setTimeout(function () {
                if (tile1.id == tile2.id) {
                    $(".clicked").addClass("matched"); 
                }
                else {
                    $(".clicked").removeClass("flip");
                }
                $(".clicked").removeClass("clicked");
                this.canFlip = true;
            }.bind(this), 500);
        }
    }
}
    



var tiles = [
		{
			name: "abalone",
			img: "media/abalone.jpg",
			id: 1,
		},
		{
			name: "abaloneMatch",
			img: "media/abaloneMatch.jpg",
			id: 1
		},
		{
			name: "bees",
			img:"media/bees.jpg",
			id: 2
		},
		{
			name: "beesMatch",
			img: "media/beesMatch.jpg",
			id: 2
		},{
			name: "bird",
			img: "media/bird.jpg",
			id: 3
		},
		{
			name: "birdMatch",
			img: "media/birdMatch.jpg",
			id: 3
		},
		{
			name: "elephant",
			img:"media/elephant.jpg",
			id: 4
		},
		{
			name: "elephantMatch",
			img: "media/elephantMatch.jpg",
			id: 4
		},{
			name: "fish",
			img: "media/fish.jpg",
			id: 5
		},
		{
			name: "fishMatch",
			img: "media/fishMatch.jpg",
			id: 5
		},
		{
			name: "owl",
			img:"media/owl.jpg",
			id: 6
		},
		{
			name: "owlMatch",
			img: "media/owlMatch.jpg",
			id: 6
		},{
			name: "termites",
			img: "media/termites.jpg",
			id: 7
		},
		{
			name: "termitesMatch",
			img: "media/termitesMatch.jpg",
			id: 7
		},
		{
			name: "velcro",
			img:"media/velcro.jpg",
			id: 8
		},
		{
			name: "velcroMatch",
			img: "media/velcroMatch.jpg",
			id: 8
		},{
			name: "whale",
			img: "media/whale.jpg",
			id: 9
		},
		{
			name: "whaleMatch",
			img: "media/whaleMatch.jpg",
			id: 9
		},{
			name: "termites",
			img: "media/termites.jpg",
			id: 10
		},
		{
			name: "termitesMatch",
			img: "media/termitesMatch.jpg",
			id: 10
		},
		{
			name: "velcro",
			img:"media/velcro.jpg",
			id: 11
		},
		{
			name: "velcroMatch",
			img: "media/velcroMatch.jpg",
			id: 11
		},{
			name: "whale",
			img: "media/whale.jpg",
			id: 12
		},
		{
			name: "whaleMatch",
			img: "media/whaleMatch.jpg",
			id: 12
		}			
	];

var info = [
		{
			id: "1",
			text: "",
			
		},
		{
			id: "2",
			text: "",
			
		},{
			id: "3",
			text: "",
			
		},{
			id: "4",
			text: "",
			
		},{
			id: "5",
			text: "",
			
		},{
			id: "6",
			text: "",
			
		},{
			id: "7",
			text: "",
			
		},{
			id: "8",
			text: "",
			
		},{
			id: "9",
			text: "",
			
		},{
			id: "10",
			text: "",
			
		},{
			id: "11",
			text: "",
			
		},{
			id: "12",
			text: "",
			
		}
    ];

$(function () {
    game = new Memory();
    game.initialise(tiles); 
});

