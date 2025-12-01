let player, totalFrames = 0;
let playerFramesIdle1 = [], playerFramesIdle2 = [];
let playerFramesJump1 = [], playerFramesJump2 = [];
let platforms;
let jumpKey = false;
let coin, coinImg;
let platformGroup;

function preload() {
  for (let i = 0; i < 8; i++){
    playerFramesIdle1[i] = loadImage(`asset/Idle/HeroKnight_Idle_${i}.png`);
  }

  for (let i = 0; i < 8; i++){
    playerFramesIdle2[i] = loadImage(`asset/Idle_2/HeroKnight_Idle_left_${i}.png`);
  }

  playerFramesJump1 = [];
  for (let i = 0; i < 3; i++){
    playerFramesJump1[i] = loadImage(`asset/Jump/HeroKnight_Jump_${i}.png`);
  }

  playerFramesJump2 = [];
  for (let i = 0; i < 3; i++){
    playerFramesJump2[i] = loadImage(`asset/Jump_2/HeroKnight_Jump_left_${i}.png`);
  }

  coin = loadImage('asset/coin.png');
}

function setup() {
  createCanvas(1880, windowHeight);
  player = new Player(playerFramesIdle1, playerFramesIdle2, playerFramesJump1, playerFramesJump2, 250, 250, 3, 'dynamic');
  //KINEMATIC COLLIDER - moves programmatically, ignores physics; allows the player sprite to step on top of the platform w/o falling through
  platforms = new Platforms(0, height - 50, width, 50, 'kinematic'); 
  coinImg = new Coin(coin, 75, 100, 2.15, 'static');
}

function draw() {
  background(150);

  // Display everything
  platforms.display();
  coinImg.draw();
  player.update();
}

function windowResize() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key === 'w' || key === 'W') {
    jumpKey = true;
  }
}

function keyReleased() {
  if (key === 'w' || key === 'W') {
    jumpKey = false;
  }
}
