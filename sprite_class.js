class Player {
  constructor(framesRight, framesLeft, jumpRight, jumpLeft, runRight, runLeft, x, y, scl, platform) {
    this.framesRight = framesRight;
    this.framesLeft = framesLeft;
    this.jumpRight = jumpRight;
    this.jumpLeft = jumpLeft;
    this.runRight = runRight;
    this.runLeft = runLeft;

    this.x = x;
    this.y = y;
    this.scl = scl;

    this.frame = 0;
    this.total_frames_idle = framesRight.length;
    this.total_frames_jump = jumpRight.length;
    this.total_frames_run = runRight.length;
    this.direction = 1; // 1 = right, -1 = left

    this.velocityX = 12;
    this.velocityY = 0;
    this.gravity = 2;

    this.platforms = platform; //platforms = []

    this.is_jumping = false;
    this.jump_power = -28.5;
    this.isGrounded = false;
    this.ground_level = height - 200; // Match platform height
    this.lastAnimationState = null; // Track animation state
  }

  update() {
    this.velocityY += this.gravity;
    this.y += this.velocityY;

    this.checkEdges();
    this.playerMovement();
    this.jump();
    this.draw();
  }

  draw() {
    let currentState;

    if (this.is_jumping) {
      currentState = 'jump';
    } else if (this.is_running) {
      currentState = 'run';
    } else {
      currentState = 'idle';
    }

    //reset frame when animation state changes BEFORE drawing
    if (currentState !== this.lastAnimationState) {
      this.frame = 0;
      this.lastAnimationState = currentState;
    }

    if (currentState === 'jump') {
      this.jumpAnimation();
    } else if (currentState === 'run') {
      this.runAnimation();
    } else {
      this.idleAnimation();
    }
  }

  idleAnimation() {
    let frames = this.direction === 1 ? this.framesRight : this.framesLeft;
    let img = frames[floor(this.frame)];
    let displaySize = img.height * this.scl;

    //draw image with pivot at bottom: subtract height from y position
    image(img, this.x, this.y, displaySize * 1.5, displaySize);

    this.frame += 0.15;
    if (this.frame >= this.total_frames_idle) {
      this.frame = 0;
    }
  }

  jumpAnimation(){
    let frames = this.direction === 1 ? this.jumpRight : this.jumpLeft;
    let img = frames[floor(this.frame)];
    let displaySize = img.height * this.scl;
    image(img, this.x, this.y, displaySize * 1.5, displaySize);

    this.frame += 0.15;
    if(this.frame >= this.total_frames_jump){
      this.frame = 0;
    }
  }

  runAnimation(){
    let frames = this.direction === 1 ? this.runRight : this.runLeft; //if this.direction is 1, then face right, else face left
    let img = frames[floor(this.frame)];
    let displaySize = img.height * this.scl;
    image(img, this.x, this.y, displaySize * 1.5, displaySize);

    this.frame += 0.2;
    if(this.frame >= this.total_frames_run){
      this.frame = 0;
    }
  }

  checkEdges() {
    // Horizontal bounds
    if (this.x > 1800) {
      this.x = 1800;
    } else if (this.x < -80) {
      this.x = -80;
    }
    
    // Check platform collision
    this.isGrounded = false;
    for (let platform of this.platforms) {
      if (platform.checkCollision(this)) {
        let playerHeight = this.framesRight[0].height * this.scl;
        this.y = platform.y - playerHeight;
        this.isGrounded = true;
        this.velocityY = 0;
        this.is_jumping = false;
        break; // Stop checking once we find a platform
      }
    }
    
    //upper bound
    if (this.y < 50) {
      this.y = 50;
      this.velocityY = 0;
    }
  }

  playerMovement() {
    this.is_running = false;
    // Check for left movement
    if (keyIsDown(65) || keyIsDown(97)) { // A or a
      this.x -= this.velocityX;
      this.direction = -1; // face left
      this.is_running = true;
    }
    // Check for right movement
    if (keyIsDown(68) || keyIsDown(100)) { // D or d
      this.x += this.velocityX;
      this.direction = 1; // face right
      this.is_running = true;
    }
  }

  jump() {
    if (this.y >= this.ground_level) {
      this.y = this.ground_level;
      this.isGrounded = true;
      this.is_jumping = false;
      this.velocityY = 0;
    }

    if (jumpKey && this.isGrounded) {
      this.is_jumping = true;
      this.isGrounded = false;
      this.velocityY = this.jump_power;
      jumpKey = false;
    }
  }
}

/******************************************************************************************************** */
class Platforms {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  display() {
    fill(0);
    rect(this.x, this.y, this.w, this.h);
  }

  update() {
    //platform logic here
  }

  checkCollision(player){
    let playerWidth = player.framesRight[0].width * player.scl * 1.5;
    let playerHeight = player.framesRight[0].length * player.scl;
    
    let playerLeft = player.x;
    let playerRight = player.x + playerWidth;
    let playerTop = player.y;
    let playerBottom = player.y + playerHeight;

    let horizontalOverlap = playerRight > this.x && playerLeft < this.x + this.w; //check horizontal overlap
    
    //check if player is falling and near the platform top
    let verticalOverlap = playerBottom >= this.y && 
                         playerTop <= this.y + this.h && 
                         player.velocityY >= 0;
    
    return horizontalOverlap && verticalOverlap;
  }
}

/******************************************************************************************************** */
class Coin {
  constructor(sheet, x, y, scl) {
    this.sheet = sheet;
    this.scl = scl;
    this.x = x;
    this.y = y;
    this.h = sheet.height;
    this.frame = 0;
    this.total_frames = sheet.width / sheet.height;
  }

  draw() {
    image(this.sheet, this.x, this.y, this.h * this.scl, this.h * this.scl, 
          this.h * floor(this.frame), 0, this.h, this.h);
    this.frame += 0.15;
    if (this.frame > this.total_frames) {
      this.frame = 0;
    }
  }
}
