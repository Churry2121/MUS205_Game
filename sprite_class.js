class Platforms {
  constructor(x, y, w, h) {
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

    this.velocityX = 1.5;
    this.velocityY = 0;
    this.gravity = 2;

    // Fixed: Assign the parameter to the property
    this.initialX = x;
    this.walkRange = walkRange; // This was the bug!
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

    this.direction = 1; // 1 for right, -1 for left 
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

    pop();

    this.frame += 0.15;
    if (this.frame >= this.total_frames) {
      this.frame = 0;
    }
  }
}
