class Player {
  constructor(sheet, x, y, scl) {
    this.sheet = sheet;
    this.x = x;
    this.y = y;
    this.color = color('#a83275');
    this.size = 80;
    this.ground_level = height - 100;
    this.scl = scl;

    this.h = sheet.height; // Frame width and height
    this.frame = 0;
    this.total_frames = sheet.width / sheet.height; // Number of frames in your sprite sheet

    this.velocityX = 12;
    this.velocityY = 0;
    this.gravity = 2;

    this.is_jumping = false;
    this.jump_power = -28;
    this.isGrounded = false;
  }

  idleAnimation(){
    image(this.sheet, this.x, this.y, this.h * this.scl, this.h * this.scl, 
      this.h * floor(this.frame), 0, this.h, this.h);

    this.frame += 0.15; //changing frames
    if (this.frame >= this.total_frames) {
      this.frame = 0;
    }
  }

  draw() {
    this.idleAnimation();
  }

  update() {
    //applying gravity
    this.velocityY += this.gravity;
    this.y += this.velocityY;

    this.checkEdges();
    this.playerMovement();
    this.jump();
    this.draw();
  }

  checkEdges() {
    if (this.x > width - 25) {
      this.x = width - 25;
    } else if (this.x < 25) {
      this.x = 25;
    }

    if (this.y > this.ground_level) {
      this.y = this.ground_level;
      this.isGrounded = true;
      this.velocityY = 0;
      this.is_jumping = false;
    } else if (this.y < 50) {
      this.y = 50;
    }
  }

  playerMovement() {
    if (keyIsDown(65) === true) { // key A
      this.x -= this.velocityX;
    }
    if (keyIsDown(68) === true) { // key D
      this.x += this.velocityX;
    }
    if (keyIsDown(83) === true) { // key S
      this.y += this.velocityX;
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

    // if (this.is_jumping) {
    //   this.velocityY += this.gravity;

    //   if (this.y >= this.ground_level) {
    //     this.y = this.ground_level;
    //     this.isGrounded = true;
    //     this.is_jumping = false;
    //     this.velocityY = 0;
    //   }
    // }
  }
}

/******************************************************************************************************** */
class Platforms {
  constructor(x, y, length, width) {
    this.x = x || 0;
    this.y = y || height - 50;
    this.length = length || width;
    this.width = width || 20;
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
