class Player {
  constructor(gifPath, x, y, scl) {
    this.gifPath = gifPath;
    this.x = x;
    this.y = y;
    this.color = color('#a83275');
    this.size = 80;
    this.ground_level = height - 40;
    this.scl = scl;
    this.h = 80; // Adjust based on your sprite

    this.frame = 0;
    this.total_frames = 4; // Adjust based on your sprite sheet

    this.velocityX = 15;
    this.velocityY = 0;
    this.gravity = 0.6;

    this.is_jumping = false;
    this.jump_power = -15;
    this.isGrounded = false;
  }

  display() {
    image(this.gifPath, this.x, this.y, this.h * this.scl, this.h * this.scl);
  }

  update() {
    this.velocityY += this.gravity;
    this.y += this.velocityY;
  }

  checkEdges() {
    if (this.x > width - 50) {
      this.x = width - 50;
    } else if (this.x < 50) {
      this.x = 50;
    }

    if (this.y > this.ground_level) {
      this.y = this.ground_level;
      this.isGrounded = true;
      this.velocityY = 0;
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
    if (this.y === this.ground_level) {
      this.isGrounded = true;
    }

    if (jumpKey && !this.is_jumping && this.isGrounded) {
      this.is_jumping = true;
      this.velocityY = this.jump_power; // Use velocityY, not velocity
      jumpKey = false;
    }

    if (this.is_jumping) {
      this.y += this.velocityY;
      this.velocityY += this.gravity;

      if (this.y >= this.ground_level) {
        this.y = this.ground_level;
        this.isGrounded = true;
        this.is_jumping = false;
        this.velocityY = 0;
      }
    }
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
