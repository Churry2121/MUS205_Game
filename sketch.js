let player;
let playerFramesIdle1 = [], playerFramesIdle2 = [];
let playerFramesJump1 = [], playerFramesJump2 = [];
let playerFramesRun = [], playerFramesRun2 = [];
let playerFramesAttack = [], playerFramesAttack2 = [];
let platforms = [];
let jumpKey = false;
let coin, coinImg;
let bg, gameFont;


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
    50, 10, 3);

  platforms.push(new Platforms(0, 200, 350, 30));
  platforms.push(new Platforms(350, height - 150, 300, 30));
  platforms.push(new Platforms(800, 800, 300, 30));
  platforms.push(new Platforms(350, height - 450, 300, 30));

  coinImg = new Coin(coin, 75, 100, 2.15);

  textFont(gameFont);
}

function draw() {
  background(bg);
  fill(255);
  textSize(18);
  text(`x: ${mouseX} y: ${mouseY}`, 10, 25);

  for (let p of platforms){ //show platforms
    p.display();
  }
  
  coinImg.draw();
  player.update(platforms);
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
