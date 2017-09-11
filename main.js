
var memory_array = ['heart.svg','heart.svg','sword.svg','sword.svg','shield.svg','shield.svg','bow-and-arrow.svg','bow-and-arrow.svg','red_apple.svg','red_apple.svg','frog.svg','frog.svg','princess.png','princess.png','prince.png','prince.png','castle.png','castle.png','mirror.png','mirror.png','knight.svg','knight.svg','dragon.svg','dragon.svg'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var score_counter = 0;

//shuffle function
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

//counting matched cards
function addScore() {
    score_counter += 1;
    document.getElementById('score').innerHTML = score_counter;
}

function displayButton() {
    // 1. Displays the buttons
    document.getElementById('button1').style.visibility = "visible";
    document.getElementById('button2').style.visibility = "visible";
    // 2. Adds board & score reset to the first button
    button1.addEventListener ("click", function() {
        document.getElementById('memory_board').innerHTML = "";
        newBoard();
        document.getElementById('button1').style.visibility = "hidden";
        document.getElementById('button2').style.visibility = "hidden";
        score_counter = 0;
        document.getElementById('score').innerHTML = score_counter;
    });
    button2.addEventListener("click", function () {
        document.getElementById('goodbye').innerHTML = '<h1>' + 'Goodbye!' + '</h1>';
        document.body.style.backgroundColor = "orange";
    });

}

//sets a new board
function newBoard(){
	tiles_flipped = 0;
	var output = '';
    memory_array.memory_tile_shuffle();
	for(var i = 0; i < memory_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
	}
	document.getElementById('memory_board').innerHTML = output;
}


function memoryFlipTile(tile,val){
	if(tile.innerHTML === "" && memory_values.length < 2){
		tile.style.background = '#FFF';
		tile.innerHTML = "<img src='images/" + val + "\'" + ">";
		if(memory_values.length === 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		} else if(memory_values.length === 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
            // The two cards match
			if(memory_values[0] === memory_values[1]){
				tiles_flipped += 2;
                addScore();
				// Clear both arrays
				memory_values = [];
            	memory_tile_ids = [];
				// Check to see if the whole board is cleared
				if(tiles_flipped === memory_array.length){
                    displayButton();
				}
			} else {
				function flip2Back(){
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(memory_tile_ids[0]);
				    var tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.style.background = 'url(images/card_background.jpg) no-repeat';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'url(images/card_background.jpg) no-repeat';
            	    tile_2.innerHTML = "";
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}

newBoard();
