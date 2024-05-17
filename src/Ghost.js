class Ghost {
  constructor({ position, velocity, color = 'red' }) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 15;
    this.color = color;
    this.prevCollisions = [];
  }

  draw(c) {
    c.beginPath();
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update(c, player, boundaries) {
    this.draw(c);

    // Calculate direction towards the player
    const dx = player.position.x - this.position.x;
    const dy = player.position.y - this.position.y;
    const angle = Math.atan2(dy, dx);

    // Set velocity based on the calculated direction
    const ghostSpeed = 2; // Adjust as needed
    const vx = Math.cos(angle) * ghostSpeed;
    const vy = Math.sin(angle) * ghostSpeed;

    // Check for collisions with boundaries (walls)
    const nextX = this.position.x + vx;
    const nextY = this.position.y + vy;
    const nextPosition = { x: nextX, y: nextY };
    const isCollision = this.checkCollision(nextPosition, boundaries);

    // If there's no collision, update ghost position
    if (!isCollision) {
      this.position.x = nextX;
      this.position.y = nextY;
    }
  }

  // Check for collision with boundaries (walls)
  checkCollision(nextPosition, boundaries) {
    for (const boundary of boundaries) {
      const dx = nextPosition.x - boundary.position.x;
      const dy = nextPosition.y - boundary.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.radius + boundary.width / 2) {
        // Collision detected
        return true;
      }
    }
    // No collision detected
    return false;
  }
}


export default Ghost;