//Sonic JavaScript

//Global variables
var box = document.getElementsByClassName("gridBox");
var sonicAvatar = document.createElement("img");
var ringAvatar = document.createElement("img");
var ringScore = document.getElementById('ringScore');
//Initial positions.
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

function scoreIncrement(){

    //if sonicAvatar is in the same div as ring, increase score by 1, random generator begins.
    if(sonicPosition == (ringPosition+1)){
        var score = ringScore.innerHTML;
        score++;
        ringScore.innerHTML = score;

        //if sonic collects the first ring, generate random ring positions after.
        ringPosition = generateRandom(1, 225);
        box[ringPosition].appendChild(ringAvatar);
        box[ringPosition].style.position = "relative";
    }
}

function topScoreIncrement(){ //Check if this works !!!

    //Increment topScore if the current score is larger.
    if(currentScore > topScore){
        var currentScore = document.getElementById('ringScore');
        var topScore = document.getElementById('topScore');

        topScore.innerHTML = ringScore.innerHTML;
    }
}

function worldRings(){
    
    //Blue World Ring
    if (ringScore.innerHTML == 1){
        var blueRing = document.getElementById('blueWorldRing');
        blueRing.src = "img/blue.gif";
        break; //Figure out how to stop gif image from constantly loading.
    }

    //Purple World Ring
    if (ringScore.innerHTML == 2){
        var purpleRing = document.getElementById('purpleWorldRing');
        purpleRing.src = "img/purple.gif";
    }

    //Red World Ring
    if (ringScore.innerHTML == 3){
        var redRing = document.getElementById('redWorldRing');
        redRing.src = "img/red.gif";
    }

    //Green World Ring
    if (ringScore.innerHTML == 40){
        var greenRing = document.getElementById('greenWorldRing');
        greenRing.src = "img/green.gif";
    }

    //Yellow World Ring
    if (ringScore.innerHTML == 50){
        var yellowRing = document.getElementById('yellowWorldRing');
        yellowRing.src = "img/yellow.gif";
    }

    //Aqua World Ring
    if (ringScore.innerHTML == 60){
        var aquaRing = document.getElementById('aquaWorldRing');
        aquaRing.src = "img/aqua.gif";
    }

    //White World Ring
    if (ringScore.innerHTML == 70){
        var whiteRing = document.getElementById('whiteWorldRing');
        whiteRing.src = "img/white.gif";
    }
}


window.onload = function(){

    //Sonic and Ring Starting Position.
    ringAvatar.src = "img/ring.gif";
    ringAvatar.setAttribute("alt", "Ring Avatar");
    ringAvatar.setAttribute("id", "ringAvatar");
    box[ringPosition].appendChild(ringAvatar);
    box[ringPosition].style.position = "relative";

    sonicAvatar.src = "img/start.gif";
    sonicAvatar.setAttribute("alt", "Sonic Avatar");
    sonicAvatar.setAttribute("id", "sonicAvatar");
    box[sonicPosition].appendChild(sonicAvatar);
    box[sonicPosition].style.position = "relative";
    
};

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
        moveRight();
    } else if (evt.keyCode == 40) {
        sonicAvatar.src = 'img/sonic.gif';
        sonicAvatar.style.webkitTransform = 'rotate(90deg)';
        //sonicAvatar.style.maxHeight = '34px';
        moveDown();
    } else if (evt.keyCode == 78) {
        restart();
    }
    //checkEnd();
    if(sonicPosition == 225){ //Check if this works !!!
        topScoreIncrement();
    }
};

//Move Left 1 Box at a time. -- FIX THIS (Movement is incorrect.)
function moveLeft(){
    for(var i=sonicPosition;i>=225;i--){
        (function(i) {
            setTimeout(function () {
                box[i].appendChild(sonicAvatar);
                box[i].style.position = "relative";
                sonicPosition--;
                scoreIncrement();
            }, 250*i); // Smooth transition may require change of timer or an alternative approach *!
        })(i);
    }
}

/* Move Right 1 Box at a time. -- FIX THIS (Remove initial delay.) */
function moveRight(){
    for(var i=sonicPosition;i<=225;i++){
        (function(i) {
            setTimeout(function () {
                box[i].appendChild(sonicAvatar);
                box[i].style.position = "relative";
                sonicPosition++;
                scoreIncrement();
                worldRings();
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

//If Sonic enters the side boxes, after a certain delay there will be a hit.
//Facing up = 0 - 14
//Facing Down = 225 - 239
//Facing Left = 0,15,30,45 ... 225
//Facing Right = 14,29,44,... - 239

// -----> Change sonic avatar
// -----> Reset score
// -----> Update top score if applicable

//Sound effects

//Leaderboard