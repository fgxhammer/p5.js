//specials
//Franz Gollhammer
//24.11.2017
Star = function() {
    this.pos = createVector(random(100, width - 100), 100);
    this.r = 20;
    this.r2 = this.r * 2;
    this.total = 5;
    this.blink = false;
    this.col = {
          r: 220,
          g: 255,
          b: 10,
         alpha:240
    }

    this.display = function() {
        push();
        stroke(this.col.r, this.col.g, this.col.b);
        if (this.blink == false) {
            fill(this.col.r, this.col.g, this.col.b, this.col.alpha);
            this.blink = true;
        }
        else {
            noFill();
            this.blink = false;
        }
        
        translate(this.pos.x, this.pos.y);
        rotate(5);
        beginShape();
        for (let i = 0; i < this.total * 2; i++) {
            let anglepart = (2 * PI) / (this.total * 2);
            let angle = anglepart * i;
            var x = this.r * cos(angle);
            var y = this.r * sin(angle);
            var x2 = this.r2 * cos(angle);
            var y2 = this.r2 * sin(angle);
            if (i % 2 == 0){
                vertex(x, y);
            }
            else if (i % 2 == 1){
                vertex(x2, y2);
            }
        }
        endShape(CLOSE);
        pop();
    }

    this.update = function() {
        this.pos.y += 5;
    }

    this.hit = function(pad) {
        if (this.pos.y < pad.pos.y &&
            this.pos.y > pad.pos.y - this.r &&
            this.pos.x > pad.pos.x - this.r &&
            this.pos.x < pad.pos.x + pad.w + this.r) {
                return true;
        }else {
            return false;
        }
    }
}
