let player;
let playerFramesIdle1 = [], playerFramesIdle2 = [];
let playerFramesJump1 = [], playerFramesJump2 = [];
let playerFramesRun = [], playerFramesRun2 = [];
let playerFramesAttack = [], playerFramesAttack2 = [];
let platforms = [];
let jumpKey = false;
let coin, coinImg;
let bg, gameFont, camX;
let tileset, enemyImg, enemy;

const TILE_SIZE_W_SOURCE = 32; //The dimensions of a single block
const TILE_SIZE_H_SOURCE = 16;

// Destination Size (The size you want it to appear on the canvas)
const TILE_SCALE = 2; // Scale factor (e.g., 2 for double size)
const TILE_SIZE_W_DEST = TILE_SIZE_W_SOURCE * TILE_SCALE * 1.5; // 32 * 2 = 64
const PLATFORM_HEIGHT = TILE_SIZE_H_SOURCE * TILE_SCALE * 1.5;   // 16 * 2 = 32

let platformTileX = 16; //X:~64 (where the single blocks start)
let platformTileY = 48; //Y: ~16 (the start of the second block)


function preload() {
  for (let i = 0; i < 8; i++){
    playerFramesIdle1[i] = loadImage(`asset/Idle/HeroKnight_Idle_${i}.png`);
  }
  for (let i = 0; i < 8; i++){
    playerFramesIdle2[i] = loadImage(`asset/Idle_2/HeroKnight_Idle_left_${i}.png`);
  }

  for (let i = 0; i < 3; i++){
    playerFramesJump1[i] = loadImage(`asset/Jump/HeroKnight_Jump_${i}.png`);
  }
  for (let i = 0; i < 3; i++){
    playerFramesJump2[i] = loadImage(`asset/Jump_2/HeroKnight_Jump_left_${i}.png`);
  }

  for (let i = 0; i < 3; i++){
    playerFramesRun[i] = loadImage(`asset/Run/HeroKnight_Run_${i}.png`);
  }
  for (let i = 0; i < 3; i++){
    playerFramesRun2[i] = loadImage(`asset/Run_2/HeroKnight_Run_${i}.png`);
  }

  for (let i = 0; i < 11; i++){
    playerFramesAttack[i] = loadImage(`asset/Attack1/HeroKnight_Attack_${i}.png`);
  }
  for (let i = 0; i < 11; i++){
    playerFramesAttack2[i] = loadImage(`asset/Attack1_2/HeroKnight_Attack1_${i}.png`);
  }

  tileset = loadImage('asset/tileset2.png');
  enemyImg = loadImage('asset/slime/slime_idlev2.png');
  bg = loadImage('asset/bg/castle_ruins.jpg');
  coin = loadImage('asset/coin.png');
  gameFont = loadFont('asset/ByteBounce.ttf');
}

function setup() {
  createCanvas(1880, windowHeight);

  player = new Player(playerFramesIdle1, playerFramesIdle2, 
    playerFramesJump1, playerFramesJump2, 
    playerFramesRun, playerFramesRun2, 
    playerFramesAttack, playerFramesAttack2,
    50, height - 400, 3);

  enemy = new Enemy(enemyImg, 400, 400, 2.5);

  platforms.push(new Platforms(0, height - PLATFORM_HEIGHT, width * 21, PLATFORM_HEIGHT));
  platforms.push(new Platforms(350, height - 100, 285, PLATFORM_HEIGHT));
  platforms.push(new Platforms(800, 800, 300, PLATFORM_HEIGHT));
  platforms.push(new Platforms(360, height - 450, 185, PLATFORM_HEIGHT));
  platforms.push(new Platforms(700, 430, 200, PLATFORM_HEIGHT));
  platforms.push(new Platforms(935, 430 - PLATFORM_HEIGHT, 300, PLATFORM_HEIGHT));
  platforms.push(new Platforms(200, 250, 250, PLATFORM_HEIGHT));
  platforms.push(new Platforms(1500, 600, 240, PLATFORM_HEIGHT));
  platforms.push(new Platforms(2000, 430, 300, PLATFORM_HEIGHT));
  platforms.push(new Platforms(2500, 600, 200, PLATFORM_HEIGHT));
  platforms.push(new Platforms(1750, 350, 100, PLATFORM_HEIGHT));
  platforms.push(new Platforms(1500, 225, 240, PLATFORM_HEIGHT));

  coinImg = new Coin(coin, 75, 100, 2.75);
  textFont(gameFont);
}

function draw() {
  background(bg);
  fill(255);
  textSize(18);
  text(`x: ${mouseX} y: ${mouseY}`, 10, 25);

  camX = width / 2 - player.x; //calculating the required camera shift. This offsets the world so the player remains visually centered or fixed.

  //apply camX using translate()
  push();
  translate(camX, 0);
  
  player.update(platforms);
  enemy.update();

  for (let p of platforms){ //show platforms
    p.display();
  }
  
  coinImg.draw();
  pop();
}

function windowResize() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key === 'w' || key === 'W') {
    jumpKey = true;
  }

  if (key === 'j' || key === 'J'){
    player.is_attacking = true; //attacking
  }
}

function keyReleased() {
  if (key === 'w' || key === 'W') {
    jumpKey = false;
  }

  if(key === 'j' || key === 'J'){
    player.is_attacking = false; //stops animation when the key is released
  }
}
