import Boundary from './Boundary.js';

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
    
    HitTest({ rectangle }) {
      const padding = Boundary.width / 2;
      return (
        this.position.y - this.radius + this.velocity.y <= rectangle.position.y + rectangle.width &&
        this.position.x + this.radius + this.velocity.x >= rectangle.position.x &&
        this.position.y + this.radius + this.velocity.y >= rectangle.position.y &&
        this.position.x - this.radius + this.velocity.x <= rectangle.position.x + rectangle.width
      )
    }
  }

export default Player;