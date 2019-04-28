screen = 0;

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.style('display', 'block');
    cnv.position(x, y);
    colorMode(RGB);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function draw() {
    if (screen==0){
        Screen1();
    } else if (screen==1) {
        Screen2();
    } else if (screen==2){
        Screen3();
    } else if (screen==3) {
        Rain();
    }

    console.log(screen);
}

function Screen1() {
    background(0);
    textSize(23);
    fill(28,255,41);
    text("Wake up, ", 10, 30);
    text(myName, 110, 30);
    text("...", 160, 30);
}

function Screen2() {
    background(0);
    textSize(23);
    fill(28,255,41);
    text("The Matrix Has You...", 10, 30);
}

function Screen3() {
    background(0);
    textSize(23);
    fill(28,255,41);
    text("Follow The White Rabbit.", 10, 30);
}



var myHeading = document.querySelector('h1');
var myName = prompt('Please enter your name.');
localStorage.setItem('name', myName);
myHeading = 'Wake up, ' + myName;


if(!localStorage.getItem('name')) {
  setUserName();
} else {
  var storedName = localStorage.getItem('name');
  myHeading = 'Wake up, ' + storedName;
}

function keyPressed() {
    if (key === " " && screen==0) {
        screen = 1;
    } 
    if (keyCode ===UP_ARROW && screen==1) {
        screen = 2;
    } 
    if (keyCode===DOWN_ARROW && screen==2) {
        screen=3;
    }
}

