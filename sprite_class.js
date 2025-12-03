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
    this.frame += 0.15;
    if (this.frame > this.total_frames) {
      this.frame = 0;
    }
  }
}
