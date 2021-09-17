class Player {
    constructor(x, y, width, height) {
        this.width = width
        this.height = height
        this.body = Bodies.rectangle(x, y, this.width, this.height, { isStatic: true })
        this.image = loadImage("assets/player.png")

        World.add(world, this.body)
    }

    display() {
        var pos = this.body.position
        push();
        translate(pos.x, pos.y);
        rotate(this.angle);
        image(this.image, 0, 0, this.width, this.height)
        pop();
        arc(this.x - 30, this.y + 90, 140, 200, PI, TWO_PI);
        noFill();
    }
}