import Boundary from './Boundary';
import Pellet from './Pellet';
import Player from './Player';
import pipeHorizontal from './images/pipeHorizontal.png';
import pipeVertical from './images/pipeVertical.png';
import pipeCorner1 from './images/pipeCorner1.png';
import pipeCorner2 from './images/pipeCorner2.png';
import pipeCorner3 from './images/pipeCorner3.png';
import pipeCorner4 from './images/pipeCorner4.png';
import block from './images/block.png';
import capLeft from './images/capLeft.png';
import capRight from './images/capRight.png';
import capBottom from './images/capBottom.png';
import capTop from './images/capTop.png';
import pipeCross from './images/pipeCross.png';
import pipeConnectorTop from './images/pipeConnectorTop.png';
import pipeConnectorRight from './images/pipeConnectorRight.png';
import pipeConnectorBottom from './images/pipeConnectorBottom.png';
import pipeConnectorLeft from './images/pipeConnectorLeft.png';

const pacmanSpeed = 5;

class Map {
  constructor({ map, player }) {
    this.boundaries = [];
    this.player = player;
    this.map = map;
    this.pellets = [];
    this.ghosts = [];
  }

  createImage(src) {
    const image = new Image();
    image.src = src;

    image.onload = () => {
      return image;
    }

    return image;
  }

  createMap() {
    this.map.forEach((row, i) => {
      row.forEach((cell, j) => {
        switch (cell) {
          case '-':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i
                },
                image: this.createImage(pipeHorizontal)
              })
            )
            break;

          case 'b':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i
                },
                image: this.createImage(block)
              })
            )
            break;

          case '|':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i
                },
                image: this.createImage(pipeVertical)
              })
            )
            break;
          case '1':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i
                },
                image: this.createImage(pipeCorner1)
              })
            )
            break;

          case '2':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i
                },
                image: this.createImage(pipeCorner2)
              })
            )
            break;

          case '3':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i
                },
                image: this.createImage(pipeCorner3)
              })
            )
            break;

          case '4':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i
                },
                image: this.createImage(pipeCorner4)
              })
            )
            break;

          case '[':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                },
                image: this.createImage(capLeft)
              })
            )
            break
          case ']':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                },
                image: this.createImage(capRight)
              })
            )
            break
          case '_':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                },
                image: this.createImage(capBottom)
              })
            )
            break
          case '^':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                },
                image: this.createImage(capTop)
              })
            )
            break
          case '+':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                },
                image: this.createImage(pipeCross)
              })
            )
            break
          case '5':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                },
                color: 'blue',
                image: this.createImage(pipeConnectorTop)
              })
            )
            break
          case '6':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                },
                color: 'blue',
                image: this.createImage(pipeConnectorRight)
              })
            )
            break
          case '7':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                },
                color: 'blue',
                image: this.createImage(pipeConnectorBottom)
              })
            )
            break
          case '8':
            this.boundaries.push(
              new Boundary({
                position: {
                  x: j * Boundary.width,
                  y: i * Boundary.height
                },
                image: this.createImage(pipeConnectorLeft)
              })
            )
            break
          case '.':
              this.pellets.push(
                  new Pellet({
                      position: {
                          x: j * Boundary.width + Boundary.width / 2,
                          y: i * Boundary.height + Boundary.height / 2
                      }
                  })
              )
        }
      });
    });
  }

  HitTest(circle = this.player) {
    this.boundaries.forEach(boundary => {
      if (circle.HitTest({ rectangle: boundary })) {
        // console.log('hit');
        this.player.velocity.x = 0;
        this.player.velocity.y = 0;
      }
    })
  }

  draw(c) {
    this.boundaries.forEach(boundary => {
      boundary.draw(c);
    });

    this.pellets.forEach(pellet => {
      pellet.draw(c);
    });

    this.player.update(c);
  }

  update(key) {
    let newVelocity = { x: 0, y: 0 };
  
    switch (key) {
      case 'w':
        newVelocity = { x: 0, y: -pacmanSpeed };
        break;
      case 'a':
        newVelocity = { x: -pacmanSpeed, y: 0 };
        break;
      case 's':
        newVelocity = { x: 0, y: pacmanSpeed };
        break;
      case 'd':
        newVelocity = { x: pacmanSpeed, y: 0 };
        break;
    }
  
    // Simulate the move by updating the player's position
    const newPosition = {
      x: this.player.position.x + newVelocity.x,
      y: this.player.position.y + newVelocity.y
    };
  
    // Check for collisions at the new position
    const isMoveValid = this.checkMoveValidity(newPosition);
  
    // If the move is valid, update the player's velocity
    if (isMoveValid) {
      this.player.velocity = newVelocity;
    }
  }
  
  checkMoveValidity(newPosition) {
    // Iterate over boundaries and check for collisions at the new position
    const padding = Boundary.width / 2;
    for (const boundary of this.boundaries) {
      if (newPosition.x + this.player.radius >= boundary.position.x &&
          newPosition.x - this.player.radius <= boundary.position.x + Boundary.width &&
          newPosition.y + this.player.radius >= boundary.position.y &&
          newPosition.y - this.player.radius <= boundary.position.y + Boundary.height) {
        // Collision detected, move is invalid
        return false;
      }
    }
    // No collision detected, move is valid
    return true;
  }

  updateScore(score) {
    for(let i = this.pellets.length - 1; i >= 0; i--) {
      if (Math.hypot(this.player.position.x - this.pellets[i].position.x, this.player.position.y - this.pellets[i].position.y) < this.player.radius + this.pellets[i].radius) {
        this.pellets.splice(i, 1);
        score += 10;
      }
    }

    return score;
  }
}

export default Map;