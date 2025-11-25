let player, playerImg;
let platforms;
let jumpKey = false;
let coin, coinImg;

function preload() {
  playerImg = loadImage('asset/knight_3_idle.png');
  coin = loadImage('asset/coin.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player(playerImg, 100, 250, 2);
  platforms = new Platforms(0, height - 50, width, 50);
  coinImg = new Coin(coin, 75, 100, 2);
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
  if ((key === 'w' || key === 'W') && !jumpKey) {
    jumpKey = true;
  }
}

function keyReleased() {
  if (key === 'w' || key === 'W') {
    jumpKey = false;
  }
}
