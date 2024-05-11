import './App.css';
import { useEffect, useRef } from 'react';
import Boundary from './Boundary';
import Player from './Player';

function App() {
  const pacmanSpeed = 5;
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const c = canvas.getContext('2d');

    canvas.width = window.innerHeight;
    canvas.height = window.innerHeight; 

    const map = [
      ['-', '-', '-', '-', '-', '-', '-'],
      ['-', ' ', ' ', ' ', ' ', ' ', '-'],
      ['-', ' ', '-', ' ', '-', ' ', '-'],
      ['-', ' ', ' ', ' ', ' ', ' ', '-'],
      ['-', '-', '-', '-', '-', '-', '-']
    ];

    const boundaries = [];

    map.forEach((row, i) => {
      row.forEach((symbol, j) => {
        switch (symbol) {
          default:
            break;
          case '-':
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i
                }
              })
            )
            break;
        }
      })
    })

    let keys = {
      w: false,
      a: false,
      s: false,
      d: false
    }

    let lastKey = '';

    const player = new Player({
      position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
      },
      velocity: {
        x: 0,
        y: 0
      }
    });

    // HitTest function
    // player: Player
    // Rectangle: Boundary
    function HitTest({ circle, rectangle}) {
      return (
        circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&
        circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x &&
        circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
        circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width
      )
    }

    function animate() {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, canvas.width, canvas.height);
      // Conditions to check if an input causes a hittest.
      // If hit, do not update the velocity and keep moving in the direction of the last key pressed
      // Only the condition to check for 'w' is implemented so far
      if (keys.w && lastKey === 'w') {
        for (let i = 0; i < boundaries.length; i++) {
          if (HitTest({ circle: {
            ...player, velocity: {
              x: 0,
              y: -pacmanSpeed
            }
          }, rectangle: boundaries[i] })) {
            player.velocity.y = 0;
            console.log('set to zero')
            break;
          }
          else {
            player.velocity.y = -pacmanSpeed;
          }
        }
      }
      else if (keys.a && lastKey === 'a') {
        player.velocity.x = -pacmanSpeed;
      }
      else if (keys.s && lastKey === 's') {
        player.velocity.y = pacmanSpeed;
      }
      else if (keys.d && lastKey === 'd') {
        player.velocity.x = pacmanSpeed;
      }

      boundaries.forEach((boundary) => {
        boundary.draw(c);

        // HitTest to see if pacman has reached the end of a wall
        if (HitTest({ circle: player, rectangle: boundary })) {
          player.velocity.x = 0;
          player.velocity.y = 0;
          console.log('hit a wall')
        }
      })
      
      player.update(c)

      // Adjust speed according to the last key pressed
      if (keys.w && lastKey === 'w') {
        player.velocity.y = -pacmanSpeed;
      }
      else if (keys.a && lastKey === 'a') {
        player.velocity.x = -pacmanSpeed;
      }
      else if (keys.s && lastKey === 's') {
        player.velocity.y = pacmanSpeed;
      }
      else if (keys.d && lastKey === 'd') {
        player.velocity.x = pacmanSpeed;
      }
    }

    animate();
    
    window.addEventListener('keydown', ( {key} ) => {
      switch (key) {
        case 'w':
          keys.w = true;
          lastKey = 'w';
          break;
        case 'a':
          keys.a = true;
          lastKey = 'a';
          break;
        case 's':
          keys.s = true;
          lastKey = 's';
          break;
        case 'd':
          keys.d = true;
          lastKey = 'd';
          break;  
      }
    })

    window.addEventListener('keyup', ( {key} ) => {
      switch (key) {
        case 'w':
          keys.w = false;
          break;
        case 'a':
          keys.a = false;
          break;
        case 's':
          keys.s = false;
          break;
        case 'd':
          keys.d = false;
          break;  
      }
    })

    console.log(player.velocity);
  }, []);

  return (
    <canvas ref={canvasRef} id='canvas'>

    </canvas>
  );
}

export default App;
