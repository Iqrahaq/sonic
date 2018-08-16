//Sonic JavaScript

//Global variables
var box = document.getElementsByClassName("gridBox");
var sonicAvatar = document.createElement("img");
var ringAvatar = document.createElement("img");
var ringScore = document.getElementById('ringScore');
var topScore = document.getElementById('topScore');
//Initial positions.
var sonicPosition = 108;
var ringPosition = 116;


/* Open */
function openNav() {
    document.getElementById("navigation").style.display = "block";
    document.getElementById("leaderBoard").style.display = "none";
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        var x = evt.keyCode;
        if (x === 38 || x === 40) {
            return false;
        }
    };
}

/* Close */
function closeNav() {
    document.getElementById("navigation").style.display = "none";
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        var x = evt.keyCode;
        if (x === 38 || x === 40) {
            return true;
        }
    };
}

/* Open */
function openBoard() {
    document.getElementById("leaderBoard").style.display = "block";
    document.getElementById("navigation").style.display = "none";
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        var x = evt.keyCode;
        if (x === 38 || x === 40) {
            return false;
        }
    };
}


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

function scoreIncrement(){  //Vigorous test required jic.

    //if sonicAvatar is in the same div as ring, increase score by 1, random generator begins.
    if(sonicPosition == (ringPosition)){
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
    if(ringScore.innerHTML > topScore.innerHTML){
        topScore.innerHTML = ringScore.innerHTML;
        var topScoreText = topScore.innerHTML // store top score
        localStorage.setItem("topScore", topScoreText);
    }
    ringScore.innerHTML = "0";
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
    if ((ringScore.innerHTML == 9) && (blueRing.getAttribute("alt") != "Blue World Ring")){
        ringAvatar.src = "img/blue.gif";
        blueRing.src = "img/blue.gif";
        blueRing.setAttribute("alt", "Blue World Ring");
    }
    
    //Purple World Ring
    else if ((ringScore.innerHTML == 19) && (purpleRing.getAttribute("alt") != "Purple World Ring")){
        ringAvatar.src = "img/purple.gif";
        purpleRing.src = "img/purple.gif";
        purpleRing.setAttribute("alt", "Purple World Ring");
    }

    //Red World Ring
    else if ((ringScore.innerHTML == 29) && (redRing.getAttribute("alt") != "Red World Ring")){
        ringAvatar.src = "img/red.gif";
        redRing.src = "img/red.gif";
        redRing.setAttribute("alt", "Red World Ring");
    }

    //Green World Ring
    else if ((ringScore.innerHTML == 39) && (greenRing.getAttribute("alt") != "Green World Ring")){
        ringAvatar.src = "img/green.gif";
        greenRing.src = "img/green.gif";
        greenRing.setAttribute("alt", "Green World Ring");
    }

    //Yellow World Ring
    else if ((ringScore.innerHTML == 49) && (yellowRing.getAttribute("alt") != "Yellow World Ring")){
        ringAvatar.src = "img/yellow.gif";
        yellowRing.src = "img/yellow.gif";
        yellowRing.setAttribute("alt", "Yellow World Ring");
    }

    //Aqua World Ring
    else if ((ringScore.innerHTML == 59) && (aquaRing.getAttribute("alt") != "Aqua World Ring")){
        ringAvatar.src = "img/aqua.gif";
        aquaRing.src = "img/aqua.gif";
        aquaRing.setAttribute("alt", "Aqua World Ring");
    }

    //White World Ring
    else if ((ringScore.innerHTML == 69) && (whiteRing.getAttribute("alt") != "White World Ring")){
        ringAvatar.src = "img/white.gif";
        whiteRing.src = "img/white.gif";
        whiteRing.setAttribute("alt", "White World Ring");
    }
}

// Move Left 1 Box at a time.
function moveLeft(){
    var i = 0;
    while(i < 240){
        (function(i) {
            setTimeout(function(){
                if (sonicAvatar.style.webkitTransform == 'scaleX(-1)'){
                    box[sonicPosition].appendChild(sonicAvatar);
                    box[sonicPosition].style.position = "relative";
                    scoreIncrement();
                    worldRings();
                    sonicHit();
                    sonicPosition--; 
                }
            }, 250 * i)
        })(i++)
    }
}

// Move Right 1 Box at a time.
function moveRight(){
    var i = 0;
    while(i < 240){
        (function(i) {
            setTimeout(function(){
                if (sonicAvatar.style.webkitTransform == 'rotate(0deg)'){
                    box[sonicPosition].appendChild(sonicAvatar);
                    box[sonicPosition].style.position = "relative";
                    scoreIncrement();
                    worldRings();
                    sonicHit();
                    sonicPosition++;
                }
            }, 250 * i)
        })(i++)
    }
}

// Move Up 1 Box at a time.
function moveUp(){
    var i = 0;
    while(i < 240){
        (function(i) {
            setTimeout(function(){
                if (sonicAvatar.style.webkitTransform == 'rotate(-90deg)' && sonicPosition >= 0){ 
                    box[sonicPosition].appendChild(sonicAvatar);
                    box[sonicPosition].style.position = "relative";
                    scoreIncrement();
                    worldRings();
                    sonicHit();
                    sonicPosition=sonicPosition-15;
                }
            }, 250 * i)
        })(i++)
    }
}

// Move Down 1 Box at a time.
function moveDown(){
    var i = 0;
    while(i < 240){
        (function (i){
            setTimeout(function () {
                if (sonicAvatar.style.webkitTransform == 'rotate(90deg)' && sonicPosition <= 239){
                    box[sonicPosition].appendChild(sonicAvatar);
                    box[sonicPosition].style.position = "relative";
                    scoreIncrement();
                    worldRings();
                    sonicHit();
                    sonicPosition=sonicPosition+15;
                    console.log(sonicPosition);
                }
            }, 250 * i)
        })(i++)
    }
}

//If Sonic enters the side boxes, after a certain delay there will be a hit.
function sonicHit(){ //FIX ALL OF THIS
    //If Sonic is in certain top boxes
    if((sonicPosition >= 0 && sonicPosition <= 14) && (sonicAvatar.style.webkitTransform == 'rotate(-90deg)')){
        //If Sonic is facing a certain way (Up)
        sonicAvatar.src = 'img/hit.gif';
        box[sonicPosition].style.position = "relative";
        topScoreIncrement();
    }

    //If Sonic is in certain bottom boxes
    if((sonicPosition >= 225 && sonicPosition <= 239) && (sonicAvatar.style.webkitTransform == 'rotate(90deg)')){ 
        //If Sonic is facing a certain way (Down)
        sonicAvatar.src = 'img/hit.gif';
        box[sonicPosition].style.position = "relative";
        topScoreIncrement();
    }

    //If Sonic is in certain left boxes
    for(var i=0; i<226; i=i+15){
        if(sonicPosition == i){
            //If Sonic is facing a certain way (Left)
            if(sonicAvatar.style.webkitTransform == 'scaleX(-1)'){
                sonicAvatar.src = 'img/hit.gif';
                box[sonicPosition].style.position = "relative";
                topScoreIncrement();
            }
        }
    }

    //If Sonic is in certain right boxes
    for(var i=14; i<240; i=i+15){
        if(sonicPosition == i){
            //If Sonic is facing a certain way (Right)
            if(sonicAvatar.style.webkitTransform == 'rotate(0deg)'){
                sonicAvatar.src = 'img/hit.gif';
                box[sonicPosition].style.position = "relative";
                topScoreIncrement();
            }
        }
    }
    
}

//Sound effects ???

//Leaderboard


window.onload = function(){

    openNav();

    var topScoreText = localStorage.getItem("topScore");
    topScore.innerHTML = topScoreText;

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
    var x = evt.keyCode;
    if (x == 37) {
        sonicAvatar.src = 'img/sonic.gif';
        sonicAvatar.style.webkitTransform = 'scaleX(-1)';
        moveLeft();
    } else if (x == 38) {
        sonicAvatar.src = 'img/sonic.gif';
        sonicAvatar.style.webkitTransform = 'rotate(-90deg)';
        moveUp();
    } else if (x == 39) {
        sonicAvatar.src = 'img/sonic.gif';
        sonicAvatar.style.webkitTransform = 'rotate(0deg)';
        moveRight();
    } else if (x == 40) {
        sonicAvatar.src = 'img/sonic.gif';
        sonicAvatar.style.webkitTransform = 'rotate(90deg)';
        moveDown();
    } else if (x == 78) {
        restart(); //Function to be created and tested
    }
    //Function to be created and tested
    //checkEnd();
    if(sonicPosition == 225){ //Check if this works !!!
        topScoreIncrement();
    }
};

// Get the input field
var input = document.getElementById("startGame");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("startGame").click();
  }
});