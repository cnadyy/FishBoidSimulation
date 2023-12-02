const flock = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    for(let i = 0; i < 450; i++) {
        flock.push(new Boid());
    }
}

function draw() {
    background(20);

    for(let boid of flock) {
        boid.edges();
        boid.flock(flock);
        boid.update();
        boid.show();
    }
}