class Player {
  constructor(framesRight, framesLeft, jumpRight, jumpLeft, x, y, scl) {
    this.framesRight = framesRight;
    this.framesLeft = framesLeft;
    this.jumpRight = jumpRight;
    this.jumpLeft = jumpLeft;

    this.x = x;
    this.y = y;
    this.scl = scl;

    this.frame = 0;
    this.total_frames_idle = framesRight.length;
    this.total_frames_jump = jumpRight.length;
    this.direction = 1; // 1 = right, -1 = left

    this.velocityX = 12;
    this.velocityY = 0;
    this.gravity = 2;

    this.is_jumping = false;
    this.jump_power = -28.5;
    this.isGrounded = false;
    this.ground_level = height - 45; // Match platform height
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
    let currentState = this.is_jumping ? 'jump' : 'idle';
    
    // Reset frame when animation state changes
    if (currentState != this.lastAnimationState) {
      this.frame = 0;
      this.lastAnimationState = currentState;
    }

    if (this.is_jumping) {
      this.jumpAnimation();
    }
    else {
      this.idleAnimation();
    }
  }

  idleAnimation() {
    let frames = this.direction === 1 ? this.framesRight : this.framesLeft;
    let img = frames[floor(this.frame)];
    let displaySize = img.height * this.scl;

    //draw image with pivot at bottom: subtract height from y position
    image(img, this.x, this.y - displaySize, displaySize * 1.5, displaySize);

    this.frame += 0.15;
    if (this.frame >= this.total_frames_idle) {
      this.frame = 0;
    }
  }

  jumpAnimation(){
    let frames = this.direction === 1 ? this.jumpRight : this.jumpLeft;
    let img = frames[floor(this.frame)];
    let displaySize = img.height * this.scl;
    image(img, this.x, this.y - displaySize, displaySize * 1.5, displaySize);

    this.frame += 0.15;
    if(this.frame >= this.total_frames_jump){
      this.frame = 0;
    }
  }

  checkEdges() {
    if (this.x > 1800){
      this.x = 1800;
    } else if (this.x < -80) {
      this.x = -80;
    }
    // if (this.y > this.ground_level) {
    //   this.y = this.ground_level;
    //   this.isGrounded = true;
    //   this.velocityY = 0;
    //   this.is_jumping = false;
    // } else if (this.y < 50) {
    //   this.y = 50;
    // }
  }

  playerMovement() {
    // Check for left movement
    if (keyIsDown(65) || keyIsDown(97)) { // A or a
      this.x -= this.velocityX;
      this.direction = -1; // face left
    }
    // Check for right movement
    if (keyIsDown(68) || keyIsDown(100)) { // D or d
      this.x += this.velocityX;
      this.direction = 1; // face right
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
    this.x = x || 0;
    this.y = y || h - 50;
    this.length = length || w;
    this.width = w || 20;
  }

  display() {
    fill(0);
    rect(this.x, this.y, this.length, this.width);
  }

  update() {
    // Platform logic here
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
