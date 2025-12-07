class Platforms {
  constructor(x, y, w, PLATFORM_HEIGHT) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = PLATFORM_HEIGHT; //platform height is fixed to the tile height
    this.numTiles = ceil(this.w / TILE_SIZE_W_DEST); //how many tiles wide the platform is 
  }

  display() {
    //loop for the length of the current platform
    for (let i = 0; i < this.numTiles; i++){
      //calculate the where on the canvas it is being drawn
      let destX = this.x + i * TILE_SIZE_W_DEST;
      let destY = this.y;

      image(
        tileset, destX, destY, TILE_SIZE_W_DEST, PLATFORM_HEIGHT,
        platformTileX, platformTileY, TILE_SIZE_W_SOURCE, TILE_SIZE_H_SOURCE
      )
    }
  }

  update() {
    //platform logic here
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
    this.frame += 0.12;
    if (this.frame > this.total_frames) {
      this.frame = 0;
    }
  }
}

/******************************************************************************************** */
class Enemy {
  constructor(sheet, x, y, scl, walkRange=325){
    this.sheet = sheet;
    this.scl = scl;
    this.x = x;
    this.y = y;

    this.velocityX = 1.75;
    this.velocityY = 0;
    this.gravity = 2;

    this.initialX = x;
    this.walkRange = walkRange;
    this.minX = this.initialX;
    this.maxX = this.initialX + this.walkRange;

    // Sprite sheet properties
    this.frameW = 22;
    this.frameH = 20;
    this.cols = 4;
    this.rows = 2;
    this.total_frames = 8;

    this.w = this.frameW * this.scl;
    this.h = this.frameH * this.scl;

    // Collision box
    this.collisionOffsetX = this.w * 0.2;
    this.collisionOffsetY = this.h * 0.1;
    this.collisionWidth = this.w * 0.6;
    this.collisionHeight = this.h * 0.8;

    // TIGHTER COLLISION BOX - Adjust these values
    this.collisionOffsetX = this.w * 0.3;  
    this.collisionOffsetY = this.h * 0.2;  
    this.collisionWidth = this.w * 0.55;   
    this.collisionHeight = this.h * 0.75; 


    // Health system
    this.health = 2; // Takes 2 hits to kill
    this.maxHealth = 2;
    this.isHurt = false; // For visual feedback

    this.direction = 1;
    this.frame = 0;
  }

  update(){
    this.x += this.velocityX;

    // Check boundaries and reverse direction
    if (this.x >= this.maxX){
      this.velocityX = -abs(this.velocityX);
      this.direction = -1;
    }
    else if (this.x <= this.minX){
      this.velocityX = abs(this.velocityX);
      this.direction = 1; 
    }

    this.draw();
  }

  draw() {
    push();
    
    // Flash red when hurt
    if (this.isHurt) {
      tint(255, 100, 100);
    }
    
    // Flip sprite based on direction
    if (this.direction === -1) {
      translate(this.x + this.w, this.y);
      scale(-1, 1);
      translate(-this.x, -this.y);
    }
    
    let currentFrame = floor(this.frame);
    let col = currentFrame % this.cols;
    let row = floor(currentFrame / this.cols);

    let sx = col * this.frameW;
    let sy = row * this.frameH;

    image(this.sheet, this.x, this.y, this.w, this.h, 
          sx, sy, this.frameW, this.frameH);

    noTint();
    pop();

    // Draw health bar above enemy
    this.drawHealthBar();

    this.frame += 0.15;
    if (this.frame >= this.total_frames) {
      this.frame = 0;
    }
  }

  drawHealthBar() {
    let barWidth = this.w;
    let barHeight = 5;
    let barX = this.x;
    let barY = this.y - 10; // Above enemy

    // Background (empty health)
    fill(50);
    noStroke();
    rect(barX, barY, barWidth, barHeight);

    // Current health
    let healthWidth = (this.health / this.maxHealth) * barWidth;
    fill(255, 0, 0); // Red
    rect(barX, barY, healthWidth, barHeight);
  }

  takeDamage(amount) {
    this.health -= amount;
    this.isHurt = true;
    
    // Reset hurt flash after 200ms
    setTimeout(() => {
      this.isHurt = false;
    }, 200);
    
    return this.health <= 0; // Return true if dead
  }
}
