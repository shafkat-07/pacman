import './App.css';
import { useEffect, useRef } from 'react';
import Boundary from './Boundary';
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
import Pellet from './Pellet';
import Ghost from './Ghost';
import Map from './Map';


function App() {
  
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const c = canvas.getContext('2d');

    canvas.width = window.innerHeight;
    canvas.height = window.innerHeight;

    const map = [
      ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
      ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
      ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
      ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
      ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
      ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
      ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
      ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
      ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
      ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
      ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
      ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
      ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
    ]
    let score = 0;

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

    const gameMap = new Map({ map: map, player: player })

    gameMap.createMap();
    
    const pellets = [];
    const ghosts = [
      new Ghost({
        position: {
          x: 40 + Boundary.width * 11 / 2,
          y: 40 + Boundary.height / 2
        },
        velocity: {
          x: 5,
          y: 0
        }
      })
    ];

    

    // HitTest function
    // player: Player
    // Rectangle: Boundary
    function HitTest({ circle, rectangle }) {
      const padding = Boundary.width / 2;
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

      // for (let i = pellets.length - 1; i >= 0; i--) {
      //   const pellet = pellets[i];
      //   pellet.draw(c);
      //   if (Math.hypot(player.position.x - pellet.position.x, player.position.y - pellet.position.y) < player.radius + pellet.radius) {
      //     pellets.splice(i, 1);
      //     score += 10;
      //     document.getElementById('score').innerText = score;
      //   }
      // }
      score = gameMap.updateScore(score);

      document.getElementById('score').innerText = score;
      
      gameMap.draw(c);
      gameMap.HitTest();
      // Ghost AI
      // ghosts.forEach((ghost) => {
      //   ghost.update(c);
      //   const collisions = [];
      //   boundaries.forEach((boundary) => {
      //     if (!collisions.includes('right') && HitTest({
      //       circle: {
      //         ...ghost,
      //         velocity: {
      //           x: 5,
      //           y: 0
      //         }

      //       }, rectangle: boundary
      //     })) {
      //       collisions.push('right');
      //     }
      //     if (!collisions.includes('left') && HitTest({
      //       circle: {
      //         ...ghost,
      //         velocity: {
      //           x: -5,
      //           y: 0
      //         }

      //       }, rectangle: boundary
      //     })) {
      //       collisions.push('left');
      //     }
      //     if (!collisions.includes('down') && HitTest({
      //       circle: {
      //         ...ghost,
      //         velocity: {
      //           x: 0,
      //           y: 5
      //         }

      //       }, rectangle: boundary
      //     })) {
      //       collisions.push('down');
      //     }

      //     if (!collisions.includes('up') && HitTest({
      //       circle: {
      //         ...ghost,
      //         velocity: {
      //           x: 0,
      //           y: -5
      //         }

      //       }, rectangle: boundary
      //     })) {
      //       collisions.push('up');
      //     }
      //   })

      //   if (collisions.length > ghost.prevCollisions.length) ghost.prevCollisions = collisions;


      //   if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {


      //     if (ghost.velocity.x > 0) ghost.prevCollisions.push('right');
      //     else if (ghost.velocity.x < 0) ghost.prevCollisions.push('left');
      //     else if (ghost.velocity.y > 0) ghost.prevCollisions.push('down');
      //     else if (ghost.velocity.y < 0) ghost.prevCollisions.push('up');

      //     // console.log(ghost.prevCollisions)
      //     // console.log(collisions)

      //     const pathways = ghost.prevCollisions.filter((collision) => {
      //       return !collisions.includes(collision)
      //     });
      //     console.log(pathways);
      //     const direction = pathways[Math.floor(Math.random() * ghost.prevCollisions.length)];
      //     console.log(direction);
      //     switch (direction) {
      //       case 'right':
      //         ghost.velocity.x = 5;
      //         ghost.velocity.y = 0;
      //         break;
      //       case 'left':
      //         ghost.velocity.x = -5;
      //         ghost.velocity.y = 0;
      //         break;
      //       case 'down':
      //         ghost.velocity.x = 0;
      //         ghost.velocity.y = 5;
      //         break;
      //       case 'up':
      //         ghost.velocity.x = 0;
      //         ghost.velocity.y = -5;
      //         break;
      //     }
      //     ghost.prevCollisions = [];
      //   }
      //   //  console.log(collisions);
      // })
    }

    animate();


    window.addEventListener('keydown', ({ key }) => {
      // console.log(key);
      gameMap.update(key);
    })
  }, []);

  return (
    <body>
      <p>
        <span>Score: </span><span id='score'>0</span>
      </p>
      <canvas ref={canvasRef} id='canvas'>

      </canvas>
    </body>
  );
}

export default App;
