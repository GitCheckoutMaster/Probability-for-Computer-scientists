class Tree {
  constructor(x=width/2, y=height/2) {
    this.start_pos = createVector(x, y);
    this.branches = [];
    this.current_branches_level = [1];
    this.isAlive = true;
  }
  
  generate_tree() {
    let new_branches = random(this.current_branches_level);
    
    let new_branches_list = [];
    for (let i = 1; i <= new_branches; i++) {
      let b;
      if (this.branches.length == 0) {
        b = new Branch(this.start_pos.x, this.start_pos.y, 30);        
      } else {
        let prev_b = random(this.branches);
        b = new Branch(prev_b.get_x(), prev_b.get_y(), prev_b.branch_width, prev_b.get_angle() + (random([-0.2, 0.2])));
      }
      new_branches_list.push(b);
    }
    this.branches.push(...new_branches_list);

    this.update_current_branches_list()
    this.cleanup();
  }
  
  cleanup() {
    let check = false;
    for (let i = 0; i < this.branches.length; i++) {
      if (!this.branches[i].isAlive) {
        this.branches.splice(i, 1);
        i--;
      }
      check = true;
    }
    if (this.branches.length == 0 && check) {
      this.isAlive = false;
    }
  }
  
  draw_tree() {
    for (let i = 0; i < this.branches.length; i++) {
      this.branches[i].draw_branch();
    }
  }
  
  update_current_branches_list() {
    // TODO: generate next branches numbers for selection 
    // ex. prev_list -> [1]  new_list -> [2, 3]
    this.current_branches_level = [2, 3, 4];
  }
}