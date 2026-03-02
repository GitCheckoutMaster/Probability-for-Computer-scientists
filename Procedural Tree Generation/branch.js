class Branch {
  constructor(x, y, branch_width=0.4, angle=-HALF_PI) {
    this.smoothing = 0.8;
    this.start_pos = createVector(x, y);
    this.pos = createVector(x, y);
    this.angle = angle;
    this.prev_angle = 0;
    this.length = 0.5;
    this.isAlive = true;
    this.branch_width = branch_width;
  }
  
  draw_branch() {
    strokeWeight(this.branch_width);
  
    let random_sample = randomGaussian() * 0.05;
    let delta = lerp(this.prev_angle, random_sample, this.smoothing);
    this.prev_angle = delta;
    this.angle += delta;
    
    let newpos = p5.Vector.fromAngle(this.angle).mult(this.length);
    newpos.add(this.pos);
    line(this.pos.x, this.pos.y, newpos.x, newpos.y);
    this.pos = newpos;

    this.branch_width -= 0.06;
    
    this.check_limit();
  }
  
  check_limit() {
    let distance = this.start_pos.dist(this.pos);
    if (distance > 500) {
      this.length = 0;
      this.isAlive = false;
    }
    if (this.branch_width <= 0) {
      this.isAlive = false;
    }
  }
  
  get_angle() {
    return this.angle;
  }
  
  get_x() {
    return this.pos.x;
  }
  
  get_y() {
    return this.pos.y;
  }
}