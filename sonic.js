//Sonic

//Global variables
var box = document.getElementsByClassName("gridBox");
var sonicAvatar = document.createElement("img");
var ringScore = document.getElementById('ringScore').innerText;
var sonicPosition = 108;
var ringPosition = 116;

/* Game Layout - Checkered Grid */

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

for(var n=0;n<225;n++){
   box[n].style.backgroundColor = "black";
   n++;
}

//Random number generator for ring position
function generateRandom(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return (num === 108) ? generateRandom(min, max) : num;
}

//On window loadup make initial ring position = 116.
window.onload = function(sonicPosition, sonicAvatar){

    //Sonic and Ring Starting Position.
    var collectRing = document.createElement("img");
    collectRing.src = "img/ring.gif";
    collectRing.setAttribute("alt", "Collect Ring");
    collectRing.setAttribute("id", "collectRing");
    box[ringPosition].appendChild(collectRing);
    box[ringPosition].style.position = "relative";

    if(sonicPosition == 108){
        sonicAvatar.src = "img/start.gif";
        sonicAvatar.setAttribute("alt", "Sonic Avatar");
        sonicAvatar.setAttribute("id", "sonicAvatar");
        box[sonicPosition].appendChild(sonicAvatar);
        box[sonicPosition].style.position = "relative";
    }
};

    console.log(sonicPosition);

    //UNCOMMENTING THIS CODE PREVENTS ROTATION + MOVEMENT >> CHECK
    //if sonicAvatar is in the same div as ring, increase score by 1, random generator begins.
    if(sonicPosition == ringPosition){
        //if sonic collects the first ring, generate random ring positions after.
        // var r = generateRandom(1, 225);
        // var collectRing = document.createElement("img");
        // collectRing.src = "img/ring.gif";
        // collectRing.setAttribute("alt", "Collect Ring");
        // collectRing.setAttribute("id", "collectRing");
        // box[r].appendChild(collectRing);
        // box[r].style.position = "relative";


        //increment score, via for loop
        ringScore++;
    }

//Arrow keys - Rotation and Movement of Avatar - Figure out rotations based on movement
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 37) {
        sonicAvatar.src = 'img/sonic.gif';
        sonicAvatar.style.webkitTransform = 'scaleX(-1)';
        moveLeft();
    } else if (evt.keyCode == 38) {
        sonicAvatar.src = 'img/sonic.gif';
        sonicAvatar.style.webkitTransform = 'rotate(-90deg)';
        moveUp();
    } else if (evt.keyCode == 39) {
        sonicAvatar.src = 'img/sonic.gif';
        sonicAvatar.style.webkitTransform = 'rotate(0deg)';
        //sonicAvatar.style.maxWidth = '34px';
        moveRight(sonicPosition);
    } else if (evt.keyCode == 40) {
        sonicAvatar.src = 'img/sonic.gif';
        sonicAvatar.style.webkitTransform = 'rotate(90deg)';
        //sonicAvatar.style.maxHeight = '34px';
        moveDown();
    } else if (evt.keyCode == 78) {
        restart();
    }
    //checkEnd();
};

//Move Left 1 Box at a time.
// function moveLeft(){
//     for(var i=0;i<225;i++){
//         (function(i) {
//             setTimeout(function () {
//                 box[i].appendChild(sonicAvatar);
//                 box[i].style.position = "relative";
//             }, 230*i); // Smooth transition may require change of timer or an alternative approach *!
//         })(i);
//     }
// }

//Move Right 1 Box at a time. Figure out Sonic's current position (var sonicPosition) and pass it into the function.
function moveRight(sonicPosition){ //Move successful - need smooth transition and final hit
    for(var i=sonicPosition;i<225;i++){
        (function(i) {
            setTimeout(function () {
                box[i].appendChild(sonicAvatar);
                box[i].style.position = "relative";
            }, 250*i); // Smooth transition may require change of timer or an alternative approach *!
        })(i);
    }
}

//Move Up 1 Box at a time.
// function moveUp(){
//     for(var i=0;i<225;i++){
//         (function(i) {
//             setTimeout(function () {
//                 box[i].appendChild(sonicAvatar);
//                 box[i].style.position = "relative";
//             }, 230*i); // Smooth transition may require change of timer or an alternative approach *!
//         })(i);
//     }
// }

//Move Down 1 Box at a time.
// function moveDown(){
//     for(var i=0;i<225;i++){
//         (function(i) {
//             setTimeout(function () {
//                 box[i].appendChild(sonicAvatar);
//                 box[i].style.position = "relative";
//             }, 230*i); // Smooth transition may require change of timer or an alternative approach *!
//         })(i);
//     }
// }