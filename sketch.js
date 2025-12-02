let player;
let playerFramesIdle1 = [], playerFramesIdle2 = [];
let playerFramesJump1 = [], playerFramesJump2 = [];
let playerFramesRun = [], playerFramesRun2 = []
let platforms = [];
let jumpKey = false;
let coin, coinImg;

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

  coin = loadImage('asset/coin.png');
}

function setup() {
  createCanvas(1880, windowHeight);

  player = new Player(playerFramesIdle1, playerFramesIdle2, 
    playerFramesJump1, playerFramesJump2, 
    playerFramesRun, playerFramesRun2, 50, 250, 3);

  platforms.push(new Platforms(0, height - 50, width, 50));
  platforms.push(new Platforms(350, height - 150, 300, 30));
  platforms.push(new Platforms(750, 800, 550, 30));

  coinImg = new Coin(coin, 75, 100, 2.15);
}

function draw() {
  background(150);

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
}

function keyReleased() {
  if (key === 'w' || key === 'W') {
    jumpKey = false;
  }
}
