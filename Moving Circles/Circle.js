class Circle {
  constructor(radious, color) {
    this.r = radious
    this.x = random(this.r, width - this.r)
    this.y = random(this.r, height - this.r)
    this.area = 3.14 * (this.r * this.r);
    this.mass = map(this.area, 113, 1000, 1, 3.5);
    this.red = color[0]
    this.green = color[1]
    this.blue = color[2]
  }
  
  paint(circles) {
    fill(this.red, this.green, this.blue)
    strokeWeight(0.5)
    this.bounce(this.collition(circles));
    circle(this.x, this.y, this.r * 2)
  }
  
  update(circles) {
    let moveX = random(-this.mass - 1, 1 + this.mass);
    let moveY = random(-this.mass - 1, 1 + this.mass);
    
    moveX = map(moveX, -this.mass - 1, 1 + this.mass, -0.2, 0.2);
    moveY = map(moveY, -this.mass - 1, 1 + this.mass, -0.2, 0.2);
    
    this.x += moveX;
    this.y += moveY;
  }
  
  bounce(collided) {
    for (let i = 0; i < collided.length; i++) {
      if (this.mass > collided[i].mass) {
        let dir = this.getDirection(collided[i]);
        collided[i].x += dir[0];
        collided[i].y += dir[1];
      } else {
        let dir = this.getDirection(collided[i], false);
        this.x += dir[0];
        this.y += dir[1];
      }
    }
  }
  
  getDirection(object, aTob=true) {
    let dx = object.x - this.x;
    let dy = object.y - this.y;
    
    if (!aTob) {
      dx = this.x - object.x;
      dy = this.y - object.y;
    }
    
    let length = Math.sqrt(dx * dx + dy * dy);
    // normalize
    let dirX = dx / length;
    let dirY = dy / length;
    
    // map it to the mass of the object
    dirX *= map(this.mass, 1, 3.5, 0.2, 1.1);
    dirY *= map(this.mass, 1, 3.5, 0.2, 1.1);
    
    
    return [dirX, dirY];
  }
  
  collition(circles) {
    let collided = []
    for (let i = 0; i < circles.length; i++) {
      if (this.x == circles[i].x || this.y == circles[i].y) {
        continue;
      }
      let c = circles[i];
      let distance = sqrt(((this.x - c.x) * (this.x - c.x)) + ((this.y - c.y) * (this.y - c.y)));
      
      if (distance <= (this.r + circles[i].r) + this.mass) {
        collided.push(circles[i]);
      }
      else if (distance <= (this.r + c.r) + c.mass) {
        collided.push(circles[i]);
      }
    }
    
    return collided;
  }
  
  checkForCollision(circles) {
    let tries = 0, maxTries = 1200;
    
    while (tries < maxTries) {
      let collition = false;
      
      for (let i = 0; i < circles.length; i++) {
        let c = circles[i];

        // calculate the distance
        let distance = sqrt(((this.x - c.x) * (this.x - c.x)) + ((this.y - c.y) * (this.y - c.y)));

        if (distance <= (this.r + c.r) + this.mass) {
          collition = true;
          break;
        }
        if (distance <= (this.r + c.r) + c.mass) {
          collition = true;
          break;
        }
      }
      
      if (!collition) {
        return true;
      }
      
      this.x = random(this.r, width - this.r);
      this.y = random(this.r, height - this.r);
      tries++;
    }
    return false;
  }
}