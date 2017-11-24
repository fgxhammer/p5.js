//pad
//Franz Gollhammer
//23.11.2017

function Pad() {
    this.w = 180;
    this.h = 20;
    this.pos = createVector(width /2 - 60 , height - 40);

    this.col = {
        r: 0,
        g: 0,
        b: 0,
        alpha: 80
    }

    this.isMovingRight = false;
    this.isMovingLeft = false;

    this.display = function() {
        fill(this.col.r, this.col.g, this.col.b, this.col.alpha);
        rect(this.pos.x, this.pos.y, this.w, this.h);
        noFill();
    }
    
    this.move = function(step) {
        this.pos.x += step;
    }

    this.update = function() {
        if (this.isMovingLeft) {
            this.move(-20);
        }
        else if (this.isMovingRight) {
            this.move(20);
        }
    }

    this.checkEdges = function() {
        if (this.pos.x < 0) {
            this.pos.x = 0;
        }
        else if (this.pos.x > width - this.w) {
            this.pos.x = width - this.w;
        }
    }
}