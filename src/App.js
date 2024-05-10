import './App.css';
import { useEffect, useRef } from 'react';
import Boundary from './Boundary';
import Player from './Player';

function App() {
  const pacmanSpeed = 5;
  const canvasRef = useRef();
  const root = document.getElementById('root');
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

    const player = new Player({
      position: {
        x: 40 + Boundary.width / 2,
        y: 40 + Boundary.height / 2
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
        circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.width &&
        circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x &&
        circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
        circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width
      )
    }

    function animate() {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, canvas.width, canvas.height);
      boundaries.forEach((boundary) => {
        boundary.draw(c);

        if (HitTest({ circle: player, rectangle: boundary })) {
          console.log('hit');
          player.velocity.x = 0;
          player.velocity.y = 0;
        }
      })
      player.update(c);
    }

    animate();
    

    window.addEventListener('keydown', ( {key} ) => {
      //console.log(key);
      switch (key) {
        case 'w':
          for (let i = 0; i < boundaries.length; i++) {
            if (HitTest({ circle: {...player, velocity: {
              x: 0,
              y: -pacmanSpeed
            }}, rectangle: boundaries[i] })) {
              return;
            }
          }
          player.velocity.y = -pacmanSpeed;
          player.velocity.x = 0;
          console.log(player.velocity);
          break;
        case 'a':
          for (let i = 0; i < boundaries.length; i++) {
            if (HitTest({ circle: {...player, velocity: {
              x: -pacmanSpeed,
              y: 0
            }}, rectangle: boundaries[i] })) {
              return;
            }
          }
          player.velocity.x = -pacmanSpeed;
          player.velocity.y = 0;
          console.log(player.velocity);
          break;
        case 's':
          for (let i = 0; i < boundaries.length; i++) {
            if (HitTest({ circle: {...player, velocity: {
              x: 0,
              y: pacmanSpeed
            }}, rectangle: boundaries[i] })) {
              return;
            }
          }
          player.velocity.y = pacmanSpeed;
          player.velocity.x = 0;
          console.log(player.velocity);
          break;
        case 'd':
          for (let i = 0; i < boundaries.length; i++) {
            if (HitTest({ circle: {...player, velocity: {
              x: pacmanSpeed,
              y: 0
            }}, rectangle: boundaries[i] })) {
              return;
            }
          }
          player.velocity.x = pacmanSpeed;
          player.velocity.y = 0;
          console.log(player.velocity);
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
