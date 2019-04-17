
let x7, y7;
let currentangle = 0;
let step = 20;
let angle = 90;


let thestring = 'A';
let numloops = 5;
let therules = [];
therules[0] = ['A', '-BF+AFA+FB-'];
therules[1] = ['B', '+AF-BFB-FA+'];

let whereinstring = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(0, 0, 0, 255);
  let x5 = (windowWidth - width) / 2;
  let y5 = (windowHeight - height) / 2;
  cnv.position(x5, y5);
  x7 = 0;
  y7 = height-1;

  for (let i = 0; i < numloops; i++) {
    thestring = lindenmayer(thestring);
  }
}

function draw() {

  drawIt(thestring[whereinstring]);

  whereinstring++;
  if (whereinstring > thestring.length-1) whereinstring = 0;

}

function lindenmayer(s) {
  let outputstring = '';


  for (let i = 0; i < s.length; i++) {
    let ismatch = 0;
    for (let j = 0; j < therules.length; j++) {
      if (s[i] == therules[j][0])  {
        outputstring += therules[j][1];
        ismatch = 1;
        break;
      }
    }
    if (ismatch == 0) outputstring+= s[i];
  }

  return outputstring;
}


function drawIt(k) {

  if (k=='F') { 
    let x1 = x7 + step*cos(radians(currentangle));
    let y1 = y7 + step*sin(radians(currentangle));
    line(x7, y7, x1, y1);

    x7 = x1;
    y7 = y1;
  } else if (k == '+') {
    currentangle += angle;
  } else if (k == '-') {
    currentangle -= angle;
  }


  let r = random(128, 255);
  let g = random(0, 192);
  let b = random(0, 50);
  let a = random(50, 100);

  let radius = 0;
  radius += random(0, 15);
  radius += random(0, 15);
  radius += random(0, 15);
  radius = radius / 3;


  fill(0);
  ellipse(x7, y7, radius, radius);
}