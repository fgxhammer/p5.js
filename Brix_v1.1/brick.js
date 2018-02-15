//brick
//Franz Gollhammer
//23.11.2017

function Brick() {
    this.r = random(20, 80);
    this.pos = createVector(random(100, width - 100), random(100, height * 0.5));
    this.total = 6;
    this.col = {
        r: random(255),
        g: random(255),
        b: random(255),
        alpha: 160
    }

    this.display = function() {
        
        push();
        stroke(this.col.r, this.col.g, this.col.b);
        fill(this.col.r, this.col.g, this.col.b, this.col.alpha);
        strokeWeight(3);
        translate(this.pos.x, this.pos.y);
        beginShape();
        for (let i = 0; i < this.total; i++) {
            let angle = map(i, 0, this.total, 0, 2*PI);
            var x = this.r * cos(angle);
            var y = this.r * sin(angle);
            vertex(x, y); 
        }
        endShape(CLOSE);
        noFill();
        pop();
    }
}