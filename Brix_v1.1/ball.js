//ball
//Franz Gollhammer
//23.11.2017

function Ball() {
    this.pos = createVector(width / 2, height / 2);
    this.r = 30;
    this.dir = createVector(1, 1);
    this.vel = createVector(1, 1).mult(8);
    this.col = {
        r: 0,
        g: 0,
        b: 0,
        alpha: 80
    }

    this.display = function() {
        fill(this.col.r, this.col.g, this.col.b, this.col.alpha);
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
        noFill();
    }

    this.update = function() {
        this.pos.x += this.vel.x * this.dir.x;
        this.pos.y += this.vel.y * this.dir.y;
    }

    this.checkEdges = function() {
        if (this.pos.x < 0 + this.r && this.dir.x < 0) {
            this.dir.x *= -1;
        }
        else if (this.pos.x > width - this.r && this.dir.x > 0) {
            this.dir.x *= -1;
        }
        else if (this.pos.y < 0 + this.r && this.dir.y < 0) {
            this.dir.y *= -1;
        }
    }

    this.hitpad = function(pad) {
        if (this.pos.y < pad.pos.y &&
            this.pos.y > pad.pos.y - this.r &&
            this.pos.x > pad.pos.x - this.r &&
            this.pos.x < pad.pos.x + pad.w + this.r) {
                return true;
        }else {
            return false;
        }
    }

    this.hit = function(brick) {
        var distance = dist(this.pos.x, this.pos.y, brick.pos.x, brick.pos.y);
        if (distance < this.r + brick.r) {
            return true;
        }
        else {
            return false;
        }
    }
}