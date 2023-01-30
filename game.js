var foodx;
var up = 0;
var down = 0;
var right = 0;
var left = 0;
var foody;
var r = 10;
var s;
var canvas;
var counter;
var score = 0;
var gameover = false;
function setup() {
  canvas = createCanvas(400, 400);
  var x = (windowWidth - 400) / 2;
  var y = (windowHeight - 400) / 2;
  canvas.position(x, y);
  s = new snake();
  counter = select("#counter");
  console.log(counter);
}
function draw() {
  background(255);
  s.change();
  s.show();
  counter.html(score);
  if (!gameover) {
    fill("#ff0000");
    rect(foodx, foody, r, r);
  } else {
    fill(0);
    textSize(50);
    text("Gameover", 90, 160);
    textSize(40);
    text("Your Score : " + score, 80, 240);
  }
  fill(255);
  /*noStroke();
	rect(130,60,10,60);//vertical
	rect(130,60,160,10);//horizontal
	rect(40,170,10,40);//vertical
	rect(40,200,150,10);//horizontal
	rect(190,200,10,40);//vertical
	rect(250,160,40,10);//horizontal
	rect(290,160,10,150);//vertical
	rect(90,300,10,60);//vertical
	rect(90,360,130,10);//horizontal*/
  frameRate(10);
}

function keyPressed() {
  if (keyCode == UP_ARROW && down != 1) {
    up = 1;
    left = 0;
    right = 0;
    s.direction(0, -1);
  }
  if (keyCode == DOWN_ARROW && up != 1) {
    down = 1;
    left = 0;
    right = 0;
    s.direction(0, 1);
  }
  if (keyCode == RIGHT_ARROW && left != 1) {
    right = 1;
    up = 0;
    down = 0;
    s.direction(1, 0);
  }
  if (keyCode == LEFT_ARROW && right != 1) {
    left = 1;
    up = 0;
    down = 0;
    s.direction(-1, 0);
  }
}
setInterval(food, 5000);
function food() {
  foodx = random(400);
  foodx = foodx - (foodx % 10);
  foody = random(400);
  foody = foody - (foody % 10);
  /*foodx = constrain(foodx,-1,width - r);
	foody = constrain(foody,-1,height - r);*/
}
function snake() {
  this.x = width / 2;
  this.y = height / 2;
  this.i = 1;
  this.j = 0;
  this.total = 0;
  this.tail = [];

  this.direction = function (x, y) {
    this.i = x;
    this.j = y;
  };

  this.change = function () {
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }

    this.tail[this.total - 1] = createVector(this.x, this.y);

    if (this.x == -1) {
      this.x = 400;
    }
    if (this.y == -1) {
      this.y = 400;
    }
    this.x = (this.x + this.i * r) % 400;
    this.y = (this.y + this.j * r) % 400;

    this.x = constrain(this.x, -1, width - r);
    this.y = constrain(this.y, -1, height - r);
  };

  this.show = function () {
    for (var i = 0; i < this.tail.length; i++) {
      if (this.x == this.tail[i].x && this.y == this.tail[i].y) {
        gameover = true;
      }
    }

    if (!gameover) {
      for (var i = 0; i < this.tail.length; i++) {
        fill(random(0, 255));
        rect(this.tail[i].x, this.tail[i].y, r, r);
      }
      if (this.x == foodx && this.y == foody) {
        score = score + 8;
        this.total++;
        foodx = random(400);
        foodx = foodx - (foodx % 10);
        foody = random(400);
        foody = foody - (foody % 10);
      }
      fill("yellow");
      rect(this.x, this.y, r, r);
    }
  };
}
