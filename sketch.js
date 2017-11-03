var particles = [];
function setup() {
  width = 800;
	height = 800;
  createCanvas(width, height);
  amt = 100;

  for (var i=0; i<amt; i++){
    particles[i] = new Particle(createVector(width/2, height/2), 2*PI*i/amt);
  }
}

function draw() {
  background(51);


  for (var i=0; i<amt; i++){
    particles[i].update();
    particles[i].render();
  }


  for (var i=1; i<amt; i++){
    stroke(255);
    line(particles[i-1].pos.x, particles[i-1].pos.y, particles[i].pos.x, particles[i].pos.y);
  }
  line(particles[0].pos.x, particles[0].pos.y, particles[amt-1].pos.x, particles[amt-1].pos.y);

}

function Particle(pos, dir){
  this.vel = convertDir(dir); //Transforms directional angle into cartesian velocity
  this.pos = pos; //Vector

  this.update = function(){
    if (this.pos.x<0){
      this.vel.rotate(2*this.vel.angleBetween(createVector(0,-1)));
    };
    if (this.pos.x>width){
      this.vel.rotate(2*this.vel.angleBetween(createVector(0,1)));
    };
    if (this.pos.y<0){
      this.vel.rotate(2*this.vel.angleBetween(createVector(1,0)));
    };
    if (this.pos.y>height){
      this.vel.rotate(2*this.vel.angleBetween(createVector(-1,0)));
    };

    this.pos.add(this.vel);
  }

  this.render = function(){
    fill(255);
    ellipse(this.pos.x, this.pos.y, 5); //Creates particle of size two at this new position
  }


}

function convertDir(dir){ //Given an angle, converts it into a standardised vector representing that same direction
  ang = dir;
  return createVector(2.5*cos(dir), 2.5*sin(dir));
}
