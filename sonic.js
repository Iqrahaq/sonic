//Snake

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
var checkered = document.getElementsByClassName("gridBox");
for(var n=0;n<225;n++){
   checkered[n].style.backgroundColor = "black";
   n++;
}

for(var i=0;i<225;i++){
    var grid = document.getElementsByClassName("grid-box");
    if(i == 121){
        var start = document.createElement("img");
        start.src = "img/start.gif";
        start.setAttribute("alt", "Sonic Start");
        start.setAttribute("id", "sonicStart");
        grid[i].appendChild(start);
    }
}



