class Bottle {
    constructor(x, y, width, height) {
        var options = {
            restitution: 0.8,
            friction: 1.0,
            density: 1.0,
        };

        this.body = Bodies.rectangle(x, y, width, height, options);
        this.width = width;
        this.height = height;

        this.image = loadImage("assets/bottle.png");
        World.add(world, this.body);
    }

    display() {
        var pos = this.body.position;

        push();
        imageMode(CENTER);
        image(this.image,this.body.x, this.body.x,this.width, this.height);
        noTint();
        pop();
    }

    remove(index) {
        Matter.World.remove(world, bottle[index].body)
        bottles.splice(index, 1)
    }
}
