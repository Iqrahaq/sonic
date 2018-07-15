//Snake

//Global variables
var box = document.getElementsByClassName("gridBox");
var sonicAvatar = document.createElement("img");

//Duplication of div tags to create 15x15 grid.
function addDiv(){
    var parent = document.getElementById("gridContainer");
    var newDiv = document.createElement("div");
    parent.appendChild(newDiv);
    newDiv.setAttribute("class", "gridBox");
}

for(var i=0;i<225;i++){
    addDiv();
}

//Checkered grid
for(var n=0;n<225;n++){
   box[n].style.backgroundColor = "black";
   n++;
}


for(var i=0;i<225;i++){
    if(i == 108){
        sonicAvatar.src = "img/start.gif";
        sonicAvatar.setAttribute("alt", "Sonic Avatar");
        sonicAvatar.setAttribute("id", "sonicAvatar");
        box[i].appendChild(sonicAvatar);
        box[i].style.position = "relative";
    }
}

function generateRandom(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return (num === 108) ? generateRandom(min, max) : num;
}

//On window loadup make r = 116, and then randomly generate ring position.

var r = generateRandom(1, 225);
var collectRing = document.createElement("img");
collectRing.src = "img/ring.gif";
collectRing.setAttribute("alt", "Collect Ring");
collectRing.setAttribute("id", "collectRing");
box[r].appendChild(collectRing);
box[r].style.position = "relative";

//Arrow keys - Figure out rotations based on movement
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 37) {
        sonicAvatar.src = 'img/sonic.gif';
        moveLeft();
    } else if (evt.keyCode == 38) {
        sonicAvatar.src = 'img/sonic.gif';
        sonicAvatar.style.transform = "rotate(-90deg)";
        sonicAvatar.style.transform = "scaleX(-1)";
        moveUp();
    } else if (evt.keyCode == 39) {
        sonicAvatar.src = 'img/sonic.gif';
        sonicAvatar.style.transform = "rotate(180deg)";
        sonicAvatar.style.transform = "scaleX(-1)";
        moveRight();
    } else if (evt.keyCode == 40) {
        sonicAvatar.src = 'img/sonic.gif';
        sonicAvatar.style.transform = "rotate(90deg)";
        sonicAvatar.style.transform = "scaleY(-1)";
        moveDown();
    } else if (evt.keyCode == 78) {
        restart();
    }
    checkEnd();
};

