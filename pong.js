var ship;
var aliens = [];
var aliens2 = []
var rockets = [];
var c = 0;
var t = 0;


function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.style('display', 'block');
    cnv.position(x, y);
    colorMode(HSB);
    ship = new Ship();
    //rocket = new Rocket();
    for (var i = 0; i < 10; i++) {
        aliens[i] = new Alien(i*80+80, 60);
    }
    for (var i = 0; i < 6; i++) {
        aliens2[i] = new Alien2(i*80+80, 60);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw(){
    background(0);
    ship.show();
    ship.move();
    for(var i = 0; i < rockets.length; i++) {
        rockets[i].show();
        rockets[i].move();
        for(var j = 0; j < aliens.length; j++) {
            if (rockets[i].hits(aliens[j])) {
                aliens[j].explode();
                rockets[i].explode();
            }
        }
    }
    

    var edge = false;

    for(var i = 0; i < aliens.length; i++) {
        aliens[i].show();
        aliens[i].move();

        if (aliens[i].x + aliens[i].r > width || aliens[i].x - aliens[i].r < 0) {
            edge = true;
        }
    }

    if (edge) {
        for(var i = 0; i < aliens.length; i++) {
            aliens[i].Down();
        }
    }

    for(var i = rockets.length-1; i >= 0; i--) {
        if(rockets[i].toDelete) {
            rockets.splice(i, 1);
        }
    }

    for(var i = aliens.length-1; i >= 0; i--) {
        if(aliens[i].toDelete) {
            aliens.splice(i, 1);
        }
    }
}

function keyReleased() {
    if (key != " ") {
        ship.setDir(0);
    }
}

function keyPressed() {
    if (key === " ") {
        var rocket = new Rocket(ship.x, height-60);
        rockets.push(rocket);
    }
    if (keyCode === RIGHT_ARROW) {
        ship.setDir(1);
    } else if (keyCode === LEFT_ARROW) {
        ship.setDir(-1);
    }
}

function Ship() {
    this.x = width/2;
    this.xdir = 0;

    this.show = function() {
        if (c >= 255) c=0; else c++;
        noStroke();
        rectMode(CENTER);
        //mounts
        fill(c,255,255);
        rect(this.x-42,height-35,6,27);
        rect(this.x-36,height-25,6,12);
        rect(this.x-30,height-25,6,12);
        rect(this.x-24,height-28,6,27);
        rect(this.x-18,height-21,6,24);
        rect(this.x-12,height-23,6,27);
        rect(this.x-6,height-40,6,42);
        rect(this.x,height-40,6,60);
        rect(this.x+6,height-40,6,42);
        rect(this.x+42,height-35,6,27);
        rect(this.x+36,height-25,6,12);
        rect(this.x+30,height-25,6,12);
        rect(this.x+24,height-28,6,27);
        rect(this.x+18,height-21,6,24);
        rect(this.x+12,height-23,6,27);
    }

    this.setDir = function(dir) {
        this.xdir = dir;
    }

    this.move = function(dir) {
        this.x += this.xdir*5;
    }
}
function Alien(x, y) {
    this.x = x;
    this.y = 0;
    this.r = 60;
    this.toDelete = false;

    this.xdir = 1;
    this.ydir = 0;

    this.explode = function() {
        this.toDelete = true;
    }

    this.Down = function() {
        this.xdir *= -1;
        this.y += this.r
    }

    this.move = function() {
        this.x = this.x + this.xdir;
        this.y = this.y + this.ydir;
    }

    this.show = function() {
        //skin green
        noStroke();
        fill(70,183,88);
        
        rectMode(CORNER);
        rect(this.x,this.y+10,20,10);
        rect(this.x-10,this.y+20,10,40);
        rect(this.x-20,this.y+30,10,10);
        rect(this.x,this.y+60,20,10);
        rect(this.x+10,this.y+70,20,40);
        rect(this.x+30,this.y+80,10,30);
        rect(this.x+10,this.y+110,40,20);
        rect(this.x-10,this.y+110,20,10);
        rect(this.x-10,this.y+80,20,10);
        rect(this.x+20,this.y+130,20,20);
        rect(this.x+40,this.y+140,10,30);
        
        //shadow green
        noStroke();
        fill(57,137,69);
        rect(this.x+10,this.y,20,10);
        rect(this.x+20,this.y+10,20,10);
        rect(this.x+40,this.y+20,10,40);
        rect(this.x+50,this.y+30,10,10);
        rect(this.x+20,this.y+60,20,10);
        rect(this.x+40,this.y+70,10,40);
        rect(this.x+30,this.y+70,10,10);
        rect(this.x+50,this.y+80,20,10);
        rect(this.x+50,this.y+110,20,10);
        
        fill(103,250,219);
        rect(this.x+30,this.y+160,10,10);
        rect(this.x+50,this.y+160,10,10);
        rect(this.x+40,this.y+170,10,10);
        
        //orange
        fill(245,137,30);
        rect(this.x+60,this.y+70,10,10);
        rect(this.x-10,this.y+120,10,10);
        rect(this.x+60,this.y+120,10,10);
        rect(this.x-10,this.y+90,10,10);
        
        
        //black
        fill(0,0,0);
        rect(this.x,this.y+20,40,40);
        
        //red
        fill(247,15,42);
        rect(this.x+10,this.y+30,20,20);
        
        noStroke();
        fill(255,255,255);
        rect(this.x+11,this.y+31,10,10);
    }

}

function Alien2(x, y) {
    this.x = x;
    this.y = y;
    this.r = 30;
    this.toDelete = false;

    this.xdir = 1;
    this.ydir = 0;

    this.explode = function() {
        this.toDelete = true;
    }

    this.Down = function() {
        this.xdir *= -1;
        this.y += this.r
    }

    this.move = function() {
        this.x = this.x + this.xdir;
        this.y = this.y + this.ydir;
    }

    this.show = function() {
        noStroke();
        fill(255, 0, 100);
        ellipse(this.x, this.y + 75 ,this.r*2, this.r*2);
    }

}

function Rocket(x, y) {
    this.x = x;
    this.y = y;
    this.r = 4;
    this.toDelete = false;

    this.show = function() {
        if (t>=100) t=0; else t++;
        noStroke();
        fill(0, t, 100);
        ellipse(this.x, this.y, this.r*2, this.r*2)
    }

    this.explode = function() {
        this.toDelete = true;
    }

    this.hits = function(aliens) {
        var d = dist(this.x, this.y, aliens.x, 150);
        if (d < this.r + aliens.r)  {
            return true;
        } else {
            return false;
        }

    }

    this.move = function() {
        this.y = this.y - 5;
    }
}