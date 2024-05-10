class Player {
    constructor({ position, velocity }) {
      this.position = position;
      this.velocity = velocity;
      this.radius = 15;
    }

    draw(c) {
      c.beginPath();
      c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = 'yellow';
      c.fill();
      c.closePath();
    }

    update(c) {
        this.draw(c)
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
  }

export default Player;