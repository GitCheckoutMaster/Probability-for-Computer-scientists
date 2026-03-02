let tree, roots;

function setup() {
  createCanvas(600, 400);
  background(220);
  tree = new Tree(width/2, height-50);
}

function draw() {
  let r = randomGaussian(0.5, 0.2);
  r = constrain(r, 0, 1);
  
  if (r > 0.95) {
    tree.generate_tree();  
  }
  tree.cleanup();
  tree.draw_tree();
  
  if (!tree.isAlive) {
    noLoop();
    console.log("tree has been killed!!")
  }
}