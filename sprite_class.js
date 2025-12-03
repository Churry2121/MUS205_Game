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
  constructor(sheet, x, y, scl){
    this.sheet = sheet;
    this.scl = scl;
    this.x = x;
    this.y = y;
    this.h = sheet.height;

    //the sprite sheet has a dimension of 96x24 with 4 frames
    this.frameW = 22; //width of one frame (86 / 4 = 21.5)
    this.frameH = 20; //height of the sprite (36 / 2 = 18)
    this.cols = 4; //number of cols on the sprite sheet
    this.rows = 2; //number of rows on the sprite sheet
    this.total_frames = 8;

    this.w = this.frameW * this.scl;
    this.h = this.frameH * this.scl;

    this.direction = 1;
    this.frame = 0;
  }

  update(){
    this.draw();
  }

  draw() {
    let currentFrame = floor(this.frame);
    let col = currentFrame % this.cols; //column index (0-3)
    let row = floor(currentFrame / this.cols); //row index (0-1)

    //calculate source x and y positions in the sprite sheet
    let sx = col * this.frameW;
    let sy = row * this.frameH;

    image(this.sheet, this.x, this.y, this.w, this.h, 
          sx, sy, this.frameH, this.frameH);

    this.frame += 0.08;
    if (this.frame > this.total_frames) {
      this.frame = 0;
    }
  }
}
