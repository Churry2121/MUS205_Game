let player;
let platforms;
let jumpKey = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player();
  platforms = new Platforms(200, 200, 100, 50);
}

function draw() {
  background(150);

  //updating player class.
  player.display();
  player.checkEdges();
  player.playerMovement();
  player.jump();  // Add this - needs to run every frame

  //updating platform class.
  platforms.display();

  platforms.update();
  player.update();
}

function windowResize(){
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){
  if ((key === 'w' || key === 'W') && !jumpKey){
    jumpKey = true;
    player.jump();
  }
}

function keyReleased(){
  if (key === 'w' || key === 'W'){
    jumpKey = false;
  }
}

class Player{
  constructor(){
    this.x = 100;
    this.y = height - 15;
    this.color = color('#a83275');
    this.size = 80;
    this.ground_level = height - 40;

    this.velocityX = 15;
    this.velocityY = 0;
    this.gravity = 0.6;
  
    this.is_jumping = false;
    this.jump_power = -15;
    this.isGrounded = false;
  }

  display(){
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }

  update(newProperties){ //method to update properties (outside of class)
    Object.assign(this, newProperties);
    this.velocityY += this.gravity;
    this.y += this.velocityY;
  }

  checkEdges(){
    if (this.x > width - 50){
      this.x = width - 50;
    } else if (this.x < 50){
      this.x = 50;
    }

    if (this.y > this.ground_level){
      this.y = this.ground_level;
      this.isGrounded = true;
      this.velocityY = 0;
    } else if (this.y < 50){
      this.y = 50;
    }
  }

  playerMovement(){
    if (keyIsDown(65) === true){ //key A
      this.x -= this.velocityX;
    }
    if (keyIsDown(68) === true){ //key D
      this.x += this.velocityX;
    }
    if (keyIsDown(83) === true){ //key S
      this.y += this.velocityX;
    }
  }

  jump(){
    if (this.y === this.ground_level){
      this.isGrounded = true;
    }

    if (jumpKey && !this.is_jumping && this.isGrounded){
      this.is_jumping = true;  // Set to true when jump starts
      this.velocity = this.jump_power;
      jumpKey = false; //only jump once per press
    }

    if (this.is_jumping){
      this.y += this.velocity;
      this.velocity += this.gravity;  // Gravity pulls velocity back down
      
      if (this.y >= this.ground_level){
        this.y = this.ground_level;
        this.isGrounded = true;
        this.is_jumping = false;
        this.velocity = 0;
      }
    }
  }
}

