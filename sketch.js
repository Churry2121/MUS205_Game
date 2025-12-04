let player;
let playerFramesIdle1 = [], playerFramesIdle2 = [];
let playerFramesJump1 = [], playerFramesJump2 = [];
let playerFramesRun = [], playerFramesRun2 = [];
let playerFramesAttack = [], playerFramesAttack2 = [];
let platforms = [];
let jumpKey = false;
let coin, coin1, coin2, coin3, coinImg;
let bg, gameFont, camX;
let tileset, enemyImg;
let enemies = [];
let points = 0;


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
  coinImg = loadImage('asset/coin.png');
  gameFont = loadFont('asset/ByteBounce.ttf');
}

function setup() {
  createCanvas(1880, windowHeight);

  player = new Player(playerFramesIdle1, playerFramesIdle2, 
    playerFramesJump1, playerFramesJump2, 
    playerFramesRun, playerFramesRun2, 
    playerFramesAttack, playerFramesAttack2,
    50, height - 400, 3);

  enemies.push(new Enemy(enemyImg, 800, 765, 2.75, 325)); // Ground enemy
  enemies.push(new Enemy(enemyImg, 700, 400, 2.75, 225)); // Platform enemy
  enemies.push(new Enemy(enemyImg, 1500, 565, 2.75, 200));
  enemies.push(new Enemy(enemyImg, 2500, 565, 2.75, 250));


  platforms.push(new Platforms(0, height - PLATFORM_HEIGHT, width * 21, PLATFORM_HEIGHT));
  platforms.push(new Platforms(350, height - 100, 275, PLATFORM_HEIGHT));
  platforms.push(new Platforms(800, 800, 300, PLATFORM_HEIGHT));
  platforms.push(new Platforms(360, height - 450, 185, PLATFORM_HEIGHT));
  platforms.push(new Platforms(700, 430, 200, PLATFORM_HEIGHT));
  platforms.push(new Platforms(970, 430 - PLATFORM_HEIGHT, 300, PLATFORM_HEIGHT));
  platforms.push(new Platforms(200, 250, 250, PLATFORM_HEIGHT));
  platforms.push(new Platforms(1500, 600, 240, PLATFORM_HEIGHT));
  platforms.push(new Platforms(2000, 430, 300, PLATFORM_HEIGHT));
  platforms.push(new Platforms(2500, 600, 200, PLATFORM_HEIGHT));
  platforms.push(new Platforms(1750, 350, 100, PLATFORM_HEIGHT));
  platforms.push(new Platforms(1500, 225, 240, PLATFORM_HEIGHT));

  coin = new Coin(coinImg, 325, 200, 2.75);
  coin1 = new Coin(coinImg, 1250, 325, 2.75);
  coin2 = new Coin(coinImg, 1675, 165, 2.75);
  coin3 = new Coin(coinImg, 2100, 375, 2.75);
  textFont(gameFont);
}

function draw() {
  background(bg);

  fill('#964B00');
  textSize(28);
  text(`Points: ${points}`, 65, 75);
  text(`WASD; Hold J to Attack`, 65, 100);

  camX = width / 2 - player.x; //calculating the required camera shift. This offsets the world so the player remains visually centered or fixed.

  //apply camX using translate()
  push();
  translate(camX, 0);
  
  player.update(platforms);

  for (let e of enemies){
    e.update();
  }

  for (let p of platforms){ //show platforms
    p.display();
  }

  let isEnemyColliding = checkEnemyCollision(player, enemies);

  if (isEnemyColliding){
    points--;
    console.log('collision');
  } else {
    console.log('phew!');
  }
  
  coin.draw();
  coin1.draw();
  coin2.draw(); 
  coin3.draw();
  pop();
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

function checkEnemyCollision(player, enemies){
  for (let enemy of enemies){
    //check if player collides with enemy
    if (player.x < enemy.x + enemy.w &&
      player.x + player.w > enemy.x &&
      player.y < enemy.y + enemy.h &&
      player.y + player.h > enemy.y
    ) {
      return true; //collision detected
    }
  }
  return false; //no collision
}
