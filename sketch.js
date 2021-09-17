const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world;
var bg_img, ground, ground2;
var player, gun, bottle, angle;
var bullets = []
var bottles = []

function preload() {
  bg_img = loadImage("assets/bg.png")
}

function setup() {
  createCanvas(1200, 600);

  engine = Engine.create();
  world = engine.world;

  angle = -PI / 4;

  ground = new Ground(600, 590, 1200, 20)
  ground2 = new Ground(100, 480, 200, 200)

  player = new Player(100, ground2.body.position.y - 250, 50, 180);
  gun = new Gun(player.body.position.x + 90, ground2.body.position.y - 200, 120, 120)
  bottle = new Bottle(Math.round(random(500, 1100)), 200, 200, 0)

}

function draw() {
  background("black");
  image(bg_img, 0, 0, width, height)
  fill("red")
  text(mouseX + "," + mouseY, mouseX, mouseY)

  Engine.update(engine);

  player.display()
  gun.display()
  ground.display()
  ground2.display()
  bottle.display()

  for (var i = 0; i < bullets.length; i++) {
    showBullets(bullets[i], i);
    for (var j = 0; j < bottles.length; j++) {
      if (bottles[j] !== undefined && bullets[i] !== undefined) {
        var collision = Matter.SAT.collides(bullets[i].body, bottles[j].body)
        console.log(collision)
        if (collision.collided) {
          bottles[j].remove(j)
          World.remove(world, bullets[i].body)
          bullets.splice(i, 1)
          i--
        }
      }
    }
  }

  showBottles();

}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var bullet = new Bullet(gun.x, gun.y, 50, 50);
    Matter.Body.setAngle(bullet.body, gun.angle);
    bullets.push(bullet);
  }
}

function showBullets(bullet, index) {
  bullet.display();
  if (bullet.body.position.x >= width || bullet.body.position.y >= height - 50) {
    Matter.World.remove(world, bullet.body);
    bullets.splice(index, 1);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    bullets[bullets.length - 1].shoot();
  }
}

function showBottles() {
  if (bottles.length > 0) {
    if (bottles.length < 4 && bottles[bottles.length - 1].body.position.x < width - 300) {
      bottle = new Bottle(Math.round(random(500, 1100)), 50, 50, pos)
    }
  }
}
