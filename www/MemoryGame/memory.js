var Memory = function (){
    
    this.initialise = function(tiles) {
        this.canFlip = true;
        this.tiles = this.shuffle(tiles);
        for (var i = 0; i < this.tiles.length; i++) {
            $(".wrapper").append("\
            <div class='flipContainer' key='"+i+"'>\
                <div class='tile' >\
                    <div class='face'>\
                        <img src='"+this.tiles[i].img+"'>\
                    </div>\
                    <div class='back'>\
                        <img src='back.jpg'>\
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
        if (this.canFlip) {
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
			name: "pair1",
			img: "tempFlower.jpg",
			id: 1,
		},
		{
			name: "pair1",
			img: "tempFlower.jpg",
			id: 1
		},
		{
			name: "pair2",
			img:"tempFlower.jpg",
			id: 2
		},
		{
			name: "pair2",
			img: "tempFlower.jpg",
			id: 2
		}
	];

$(function () {
    game = new Memory();
    game.initialise(tiles); 
});

