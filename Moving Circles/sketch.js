let circles = [];
let colors = [[255, 111, 97], [35, 206, 235], [150, 123, 182], [152, 255, 152]]

function setup() {
  createCanvas(800, 600);
  
  for (let i = 0; i < 1200; i++) {
    let c = new Circle(paretoDistributionSample(6, 1), random(colors));
    if (c.checkForCollision(circles)) {
      circles.push(c);
    }
  }
}

function draw() {
  background(220);
  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    c.paint(circles);
    //c.update(circles);
  }
}

function paretoDistributionSample(minValue, alpha) {
  let u = random();
  return minValue * Math.pow(1 - u, -1 / alpha);
}