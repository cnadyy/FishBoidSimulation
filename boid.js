// Myla!!
// Boid system, copying off tutorial
// 2.12.23

class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(1, 4));
        this.acceleration = createVector();
        this.maxForce = 0.4;
        this.maxSpeed = 20
    }

    edges() {
        if (this.position.x > width) {
          this.position.x = 0;
        } else if (this.position.x < 0) {
          this.position.x = width;
        }
        if (this.position.y > height) {
          this.position.y = 0;
        } else if (this.position.y < 0) {
          this.position.y = height;
        }
      }

    align(boids) {
        let perceptionRadius = 150;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
          let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
          if (other != this && d < perceptionRadius) {
            steering.add(other.velocity);
            total++;
          }
        }
        if (total > 0) {
          steering.div(total);
        //  if (total <= 20) {
        //   steering.setMag(10);
        //  }
        //  else; {
        //    steering.setMag(total * 2);
        //  }
          //steering.setMag(this.maxSpeed);   
          steering.setMag(total * 0.25);
          steering.sub(this.velocity);
          steering.limit(this.maxForce);
        }
        return steering;
      }

      cohesion(boids) {
        let perceptionRadius = 400;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
          let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
          if (other != this && d < perceptionRadius) {
            steering.add(other.position);
            total++;
          }
        }
        if (total > 0) {
          steering.div(total);
          steering.sub(this.position);
        //  if (total <= 20) {
        //   steering.setMag(10);
        //  }
        //  else; {
        //    steering.setMag(total * 2);
        //  }
          // steering.setMag(this.maxSpeed);
          steering.setMag(total * 0.25);
          steering.sub(this.velocity);
          steering.limit(this.maxForce);
        }
        return steering;
      }

      seperation(boids) {
        let perceptionRadius = 200;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
          let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
          if (other != this && d < perceptionRadius) {
            let diff = p5.Vector.sub(this.position, other.position);
            diff.div(d * d);
            steering.add(diff);
            total++;
          }
        }
        if (total > 0) {
          steering.div(total);
        //  if (total <= 20) {
        //   steering.setMag(10);
        //  }
        //  else; {
        //    steering.setMag(total * 2);
        //  }
          // steering.setMag(this.maxSpeed);
          steering.setMag(total * 0.25);
          steering.sub(this.velocity);
          steering.limit(this.maxForce);
        }
        return steering;
      }




    flock(boids) {
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        this.velocity.limit(this.maxSpeed);
        let seperation =this.seperation(boids);
        
        //if (this.velocity > this.maxSpeed) {
        //    let i = this.velocity - this.maxSpeed;
        //    this.velocity -= i;
        //}

        this.acceleration.add(seperation);
        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
    }

    update() {
        this.position.add(this.velocity)
        this.velocity.add(this.acceleration)
        this.acceleration.mult(0)
    }


    show() {
        strokeWeight(8);
        stroke(255, 180);
        point(this.position.x, this.position.y);
    }
}