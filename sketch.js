let r = 15;
let points = 0;
let timer = 5;
let player;
let ball;
let bomb;
let bombTime = 0;
let bgColor = '#CCCCCC';

function setup() {
  createCanvas(600, 400);
  ball = createVector(random(r, width - r), random(r, height - r));
}

function draw() {
  background(bgColor);
  
  player = createVector(mouseX, mouseY);
  
  let d = dist(player.x, player.y, ball.x, ball.y);
  
  if (d < r) {
    fill('#FF0000');
    noStroke();
    ellipse(ball.x, ball.y, r * 2.5);
  } else {
    fill('#000000');
    noStroke();
    ellipse(ball.x, ball.y, r * 2);
  }

  if (bomb) {
    fill('#000000');
    noStroke();
    ellipse(bomb.x, bomb.y, r * 1.5, r * 1.5);
    
  }

  textSize(40);
  fill('#00000');
  stroke('#000000');
  text(points, 20, 50);

  if (timer > 0 && points > 0) {
    timer -= 1 / 60;
  }
  let len = map(timer, 0, 10, 0, 200);
  fill('#FF0000');
  noStroke();
  rect(15, 50, 20, len);

  if (timer < 0) {
    noLoop();
    textAlign(CENTER);
    textSize(50);
    fill('#000000');
    text('FINISH', width / 2, height / 2);
  }

  if (mouseIsPressed && d < r) {
    ball.x = random(r, width - r);
    ball.y = random(r, height - r);
    points++;
    if (points > 1) {
      timer += 0.5;
    }
    if (points % 5 == 0) {
      bomb = createVector(random(r, width - r), random(r, height - r));
    }
    bgColor = color(random(255), random(255), random(255));
  }


if (bomb) {
  let d2 = dist(player.x, player.y, bomb.x, bomb.y);
  if (d2 < r) {
    bomb = null;
    timer -= 1;
    bombTime = millis(); // Set the bomb time when the bomb is clicked
    text('BOMBED!', width / 2, height / 2);
  }
}

// Display the text for 2 seconds
if (millis() - bombTime < 1000 && bombTime > 0) {
  textAlign(CENTER);
  textSize(50);
  text('BOMBED!', width / 2, height / 2);
}
}
