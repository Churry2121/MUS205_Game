class Platforms{
    constructor(x, y, length, width){
        this.x = x;
        this.y = y;
        this.length = length;
        this.width = width;
    }

    display(){
        fill(0);
        rect(this.x, this.y, this.length, this.width);
    }

    update(){
        null;
    }
}

class Coin {
  constructor(sheet, x, y, scl) {
    this.sheet = sheet;
    this.scl = scl;
    this.x = x;
    this.y = y;
    this.h = sheet.height;
    this.frame = 0;
    this.total_frames = sheet.width / sheet.height;
    
    this.draw = () => {
      image(this.sheet, this.x, this.y, this.h * this.scl, this.h * this.scl, this.h * floor(this.frame), 0, this.h, this.h);
      this.frame += 0.15;
      if (this.frame > this.total_frames) {
        this.frame = 0;
      }
    };
  }
}
