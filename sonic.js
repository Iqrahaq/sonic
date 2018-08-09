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
    var blueRing = document.getElementById('blueWorldRing');
    var purpleRing = document.getElementById('purpleWorldRing');
    var redRing = document.getElementById('redWorldRing');
    var greenRing = document.getElementById('greenWorldRing');
    var yellowRing = document.getElementById('yellowWorldRing');
    var aquaRing = document.getElementById('aquaWorldRing');
    var whiteRing = document.getElementById('whiteWorldRing');

    //Blue World Ring
    if ((ringScore.innerHTML == 10) && (blueRing.getAttribute("alt") != "Blue World Ring")){
        blueRing.src = "img/blue.gif";
        blueRing.setAttribute("alt", "Blue World Ring");
    }
    
    //Purple World Ring
    if ((ringScore.innerHTML == 20) && (purpleRing.getAttribute("alt") != "Purple World Ring")){
        purpleRing.src = "img/purple.gif";
        purpleRing.setAttribute("alt", "Purple World Ring");
    }

    //Red World Ring
    if ((ringScore.innerHTML == 30) && (redRing.getAttribute("alt") != "Red World Ring")){
        redRing.src = "img/red.gif";
        redRing.setAttribute("alt", "Red World Ring");
    }

    //Green World Ring
    if ((ringScore.innerHTML == 40) && (greenRing.getAttribute("alt") != "Green World Ring")){
        greenRing.src = "img/green.gif";
        greenRing.setAttribute("alt", "Green World Ring");
    }

    //Yellow World Ring
    if ((ringScore.innerHTML == 50) && (yellowRing.getAttribute("alt") != "Yellow World Ring")){
        yellowRing.src = "img/yellow.gif";
        yellowRing.setAttribute("alt", "Yellow World Ring");
    }

    //Aqua World Ring
    if ((ringScore.innerHTML == 60) && (aquaRing.getAttribute("alt") != "Aqua World Ring")){
        aquaRing.src = "img/aqua.gif";
        aquaRing.setAttribute("alt", "Aqua World Ring");
    }

    //White World Ring
    if ((ringScore.innerHTML == 70) && (whiteRing.getAttribute("alt") != "White World Ring")){
        whiteRing.src = "img/white.gif";
        whiteRing.setAttribute("alt", "White World Ring");
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
        moveLeft(sonicPosition);
    } else if (evt.keyCode == 38) {
        sonicAvatar.src = 'img/sonic.gif';
        sonicAvatar.style.webkitTransform = 'rotate(-90deg)';
        moveUp(sonicPosition);
    } else if (evt.keyCode == 39) {
        sonicAvatar.src = 'img/sonic.gif';
        sonicAvatar.style.webkitTransform = 'rotate(0deg)';
        //sonicAvatar.style.maxWidth = '34px';
        moveRight(sonicPosition);
    } else if (evt.keyCode == 40) {
        sonicAvatar.src = 'img/sonic.gif';
        sonicAvatar.style.webkitTransform = 'rotate(90deg)';
        //sonicAvatar.style.maxHeight = '34px';
        moveDown(sonicPosition);
    } else if (evt.keyCode == 78) {
        restart();
    }
    //checkEnd();
    if(sonicPosition == 225){ //Check if this works !!!
        topScoreIncrement();
    }
};

//Move Left 1 Box at a time. -- FIX THIS (Movement is incorrect.)
function moveLeft(sonicPosition){
    var i = 0;
    while(i < 240){
        (function(i) {
            setTimeout(function(){
                if (sonicPosition >= 0){
                    sonicPosition--; 
                    box[sonicPosition].appendChild(sonicAvatar);
                    box[sonicPosition].style.position = "relative";
                    scoreIncrement();
                    worldRings();
                    sonicHit(sonicPosition);
                }
            }, 250 * i)
        })(i++)
    }
}

/* Move Right 1 Box at a time. -- FIX THIS (Remove initial delay.) */
function moveRight(sonicPosition){
    var i = 0;
    while(i < 240){
        (function(i) {
            setTimeout(function(){
                if (sonicPosition >= 0){
                    sonicPosition++; 
                    box[sonicPosition].appendChild(sonicAvatar);
                    box[sonicPosition].style.position = "relative";
                    scoreIncrement();
                    worldRings();
                    sonicHit(sonicPosition);
                }
            }, 250 * i)
        })(i++)
    }
}

//Move Up 1 Box at a time.
function moveUp(sonicPosition){
    var i = 0;
    while(i < 240){
        (function(i) {
            setTimeout(function(){
                if (sonicPosition >= 0){
                    sonicPosition=sonicPosition-15; 
                    box[sonicPosition].appendChild(sonicAvatar);
                    box[sonicPosition].style.position = "relative";
                    scoreIncrement();
                    worldRings();
                    console.log(sonicPosition);
                    sonicHit(sonicPosition);
                }
            }, 250 * i)
        })(i++)
    }
}

//Move Down 1 Box at a time.
function moveDown(sonicPosition){
    var i = 0;
    while(i < 240){
        (function (i){
            setTimeout(function () {
                if (sonicPosition <= 239){
                    sonicPosition=sonicPosition+15;
                    box[sonicPosition].appendChild(sonicAvatar);
                    box[sonicPosition].style.position = "relative";
                    scoreIncrement();
                    worldRings();
                    sonicHit(sonicPosition);
                }
            }, 250 * i)
        })(i++)
    }
}

//If Sonic enters the side boxes, after a certain delay there will be a hit.
function sonicHit(sonicPosition){
    //If Sonic is in certain top boxes
    if((0<= sonicPosition <= 14) && (sonicAvatar.style.webkitTransform == 'rotate(-90deg)')){
        //If Sonic is facing a certain way (Up)
        sonicAvatar.src = 'img/hit.gif';
        box[sonicPosition].style.position = "relative";
    }

    //If Sonic is in certain bottom boxes
    if(225 <= sonicPosition <= 239){ //Look into this...?
        //If Sonic is facing a certain way (Down)
        if(sonicAvatar.style.webkitTransform == 'rotate(90deg)'){
            sonicAvatar.src = 'img/hit.gif';
            box[sonicPosition].style.position = "relative";
        }
    }

    //If Sonic is in certain left boxes
    if(sonicPosition == (0 && 225)){ //Look into this...? Incorrect Range
        //If Sonic is facing a certain way (Down)
        if(sonicAvatar.style.webkitTransform == 'scaleX(-1)'){
            sonicAvatar.src = 'img/hit.gif';
            box[sonicPosition].style.position = "relative";
        }
    }

    //If Sonic is in right bottom boxes
    if(sonicPosition == (14 && 239)){ //Look into this...? Incorrect Range
        //If Sonic is facing a certain way (Down)
        if(sonicAvatar.style.webkitTransform == 'rotate(0deg)'){
            sonicAvatar.src = 'img/hit.gif';
            box[sonicPosition].style.position = "relative";
        }
    }
}
//Facing up = 0 - 14
//Facing Down = 225 - 239
//Facing Left = 0,15,30,45 ... 225
//Facing Right = 14,29,44,... - 239

// -----> Change sonic avatar
// -----> Reset score
// -----> Update top score if applicable

//Sound effects

//Leaderboard