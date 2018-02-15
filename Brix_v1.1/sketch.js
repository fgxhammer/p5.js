//sketch
//Franz Gollhammer
//23.11.2017

// Global Variables
var pad;

//game
var playing = false;
var win = false;
var level = 1;
var hit_counter = 0;

// balls
var balls = [];
var balls_count = 1;
var ballup_appears = 5;

// bricks
var bricks = [];
var bricks_count = 20;

// stars
var star = [];
var star_appears = 10;
var starpower = false;
var starpower_count = 0;



// Setup
function setup() {
    createCanvas(windowWidth, windowHeight)
    pad = new Pad();

    for (let i = 0; i < balls_count; i++){
        balls.push(new Ball());
    }
    
    //star = new Star();

    for (let i = 0; i < bricks_count; i++) {
        bricks.push(new Brick());
    }
}

// Draw

function draw() {
    background(255);
    //translate(-width / 2, -height / 2);
    strokeWeight(2);
    
    // Displays

    pad.display();

    if (playing == true) { // Pad Movement if playing
    pad.update();
    pad.checkEdges();
    }

    for (let i = 0; i < balls.length; i++) { // Balls Display
        balls[i].display();
    }
    
    if (playing == true) { // Balls Movement if playing
        for (let i = 0; i < balls.length; i++) {
            balls[i].update();
            balls[i].checkEdges();
        }
    }

    // Hit Logic for balls on Pad
    for ( let i = 0; i < balls.length; i++) {
        if (balls[i].hitpad(pad) && balls[i].dir.y > 0) {
            balls[i].dir.y *= -1;
        }
    }

    // Hit Logic for balls on bricks

    for (let k = bricks.length - 1; k >= 0; k--) {
        for (let i = 0; i < balls.length; i++) {
            if (balls[i].hit(bricks[k])) {
                if (starpower && starpower_count > 0) { // If Starpower
                    bricks.splice(k, 1);
                    starpower_count--;
                }
                else if (bricks[k].r > 40 && !starpower) {
                    bricks[k].r *= 0.5;
                    balls[i].dir.y *= -1;
                }
                else {
                    bricks.splice(k, 1);
                    balls[i].dir.y *= -1;
                }
                hit_counter++;
            }
        }    
    }

    // Bricks Display

    for (let j = 0; j < bricks.length; j++) {
        bricks[j].display();
    }

    // Star Display

    for (let i = 0; i < star.length; i++) {
        star[i].display();
        star[i].update();
    }

    // Star Appears
    if (star_appears == hit_counter) {
        star.push(new Star());
        star_appears = floor(random(0, 40));
        hit_counter = 0;
    }

    // Star Hit Logic

    if (star.length > 0){
        for (let i = 0; i < star.length; i++) {
            if (star[i].hit(pad)){
                star.splice(i, 1);
                starpower = true;
                starpower_count = 20;
            }
            else if (starpower_count == 0) {
                starpower = false;
            }
            else if (star[i].pos.y > height + 2 * star[i].r) {
                star.splice(i, 1);
            }
        }
    }

    // ball appears

    if (ballup_appears == hit_counter) {
        balls.push(new Ball());
        ballup_appears = floor(random(30, 70));
        hit_counter = 0;
    }
    
    for (let i = balls.length - 1; i >= 0; i--) { // If Ball is out delete ball
        if (balls[i].pos.y > height + 2 * balls[i].r) {
            balls.splice(i, 1);
        }
    }

    // win & loose logic

    if (balls.length == 0) {  // Check if Loose
        playing = false;
    }

    if (bricks.length == 0) { // Check if Win
        win = true;
        playing = false;
    }
}

// Navigation, Controls

function keyPressed() {

    // Pad Movement

    if (key === 'a' || key === 'A') {
        pad.isMovingLeft = true;
    }
    else if (key === 'd' || key === 'D') {
        pad.isMovingRight = true;
    }

    // Reset / Next Level

    else if (key === 's' || key === 'S') {
        
        if (win == true) {
            win = false;
            level += 1;
            bricks_count += 10;
            hit_counter = 0;
            starpower = false;
            balls_count = 1;
        }
        else {
            level = 1;
            win = false;
            bricks_count = 20;
            hit_counter = 0;
            starpower = false;
            balls_count = 1;
        }
        
        for (let i = balls.length - 1; i >= 0; i--) {
            balls.splice(i, 1);
        }
        for (let i = 0; i < balls_count; i++){
            balls.push(new Ball());
        }

        playing = true;
        for(let i = 0; i < balls.length; i++) {
            balls[i].pos = createVector(width / 2 , height / 2);
        }

        pad.pos = createVector(width /2 - 60 , height - 40);

        for (let i = bricks.length - 1; i >= 0; i--) {
            bricks.splice(i, 1);
        }
        for (let i = 0; i < bricks_count; i++) {
                bricks.push(new Brick());
        }
    }
}


function keyReleased() {
    pad.isMovingLeft = false;
    pad.isMovingRight = false;
}

