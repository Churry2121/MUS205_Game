class Player {
  constructor(framesRight, framesLeft, jumpRight, jumpLeft, runRight, runLeft, attackRight1, attackLeft1, x, y, scl) {
    this.framesRight = framesRight;
    this.framesLeft = framesLeft;
    this.jumpRight = jumpRight;
    this.jumpLeft = jumpLeft;
    this.runRight = runRight;
    this.runLeft = runLeft;
    this.attackRight1 = attackRight1;
    this.attackLeft1 = attackLeft1;

    this.x = x;
    this.y = y;
    this.scl = scl;

    let baseHeight = framesLeft[0].height * this.scl;
    this.w = baseHeight * 1.5;
    this.h = baseHeight;

    // Add collision box offsets (adjust these values to fit your sprite)
    this.collisionOffsetX = this.w * 0.3;  // Offset from left edge
    this.collisionOffsetY = this.h * 0.1;  // Offset from top edge
    this.collisionWidth = this.w * 0.4;    // Actual collision box width
    this.collisionHeight = this.h * 0.8;   // Actual collision box height

    this.frame = 0;
    this.total_frames_idle = framesRight.length;
    this.total_frames_jump = jumpRight.length;
    this.total_frames_run = runRight.length;
    this.total_frames_attack = attackLeft1.length;
    this.direction = 1; // 1 = right, -1 = left

    this.velocityX = 13;
    this.velocityY = 0;
    this.gravity = 2;

    this.is_jumping = false;
    this.is_attacking = false;
    this.jump_power = -28.5;
    this.isGrounded = false;
    this.ground_level = height - 200; // Match platform height
    this.lastAnimationState = null; // Track animation state
  }

  update(platforms) {
    this.velocityY += this.gravity;
    this.y += this.velocityY;

    this.isGrounded = false;

    for (let p of platforms){ //check collision with all platforms in the array
      this.checkPlatformCollision(p);
    }

    if (this.y >= height + 200){ //falling through gaps
      this.x = 50;
      this.y = height - 400;
      this.isGrounded = true;
      this.is_jumping = false;
      this.velocityY = 0;
    }
     
    this.checkEdges();
    this.playerMovement();
    this.jump();
    this.draw();
  }

  checkPlatformCollision(platform) {
    // Calculate actual collision box position
    let collisionX = this.x + this.collisionOffsetX;
    let collisionY = this.y + this.collisionOffsetY;
    let collisionRight = collisionX + this.collisionWidth;
    let collisionBottom = collisionY + this.collisionHeight;
    
    // AABB collision detection with adjusted collision box
    if (collisionX < platform.x + platform.w &&
        collisionRight > platform.x &&
        collisionY < platform.y + platform.h &&
        collisionBottom > platform.y) {

      // Calculate overlaps using collision box - distance of penetration
      let overlapLeft = collisionRight - platform.x;  // How far we've penetrated from the left
      let overlapRight = (platform.x + platform.w) - collisionX;  // How far we've penetrated from the right
      let overlapTop = collisionBottom - platform.y;  // How far we've penetrated from the top
      let overlapBottom = (platform.y + platform.h) - collisionY;  // How far we've penetrated from the bottom

      let minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);
      
      if (minOverlap === overlapTop && this.velocityY > 0) {
        // Landing on top - adjust main position, not collision box position
        this.y = platform.y - this.collisionOffsetY - this.collisionHeight;
        this.velocityY = 0;
        this.isGrounded = true;
        this.is_jumping = false;
      } else if (minOverlap === overlapBottom && this.velocityY < 0) {
        // Hitting from below
        this.y = platform.y + platform.h - this.collisionOffsetY;
        this.velocityY = 0;
      } else if (minOverlap === overlapLeft) {
        // Hitting the left side of platform (player moving right)
        this.x = platform.x - this.collisionOffsetX - this.collisionWidth;
      } else if (minOverlap === overlapRight) {
        // Hitting the right side of platform (player moving left)
        this.x = platform.x + platform.w - this.collisionOffsetX;
      }    
    }
  }

  draw() {
    let currentState;

    if (this.is_jumping) {
      currentState = 'jump';
    } else if (this.is_running) {
      currentState = 'run';
    } else if (this.is_attacking){
      currentState = 'attack';
    }
    else {
      currentState = 'idle';
    }

    //reset frame when animation state changes before drawing
    if (currentState !== this.lastAnimationState) {
      this.frame = 0;
      this.lastAnimationState = currentState;
    }

    if (currentState === 'jump') {
      this.jumpAnimation();
    } else if (currentState === 'run') {
      this.runAnimation();
    } else if (currentState === 'attack'){
      this.attackAnimation();
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

  attackAnimation(){
    let frames = this.direction === 1 ? this.attackRight1 : this.attackLeft1; //if this.direction is 1, then face right, else face left
    let img = frames[floor(this.frame)];
    let displaySize = img.height * this.scl;
    image(img, this.x, this.y, displaySize * 1.5, displaySize);

    this.frame += 0.3;
    if (this.frame >= this.total_frames_attack){
      this.frame = 0;
    }
  }

  checkEdges() {
    // Horizontal bounds
    if (this.x > 2600) {
      this.x = 2600;
    } else if (this.x < 0) {
      this.x = 0;
    }

    //upper bound
    if (this.y < -50) {
      this.y = -50;
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
    if (jumpKey && this.isGrounded) {
      this.is_jumping = true;
      this.isGrounded = false;
      this.velocityY = this.jump_power;
      jumpKey = false;
    }
  }
}
