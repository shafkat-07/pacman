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
import pipeConnectorDownwards from './images/pipeConnectorDownwards.png';


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

    const boundaries = [];
    
    function createImage(src) {
      const image = new Image();
      image.src = src;
      
      image.onload = () => {
        console.log('Image loaded!');
        return image;
      }

      return image;
    }
    

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
                },
                image: createImage(pipeHorizontal)
              })
            )
            break;
            
          case 'b':
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i
                },
                image: createImage(block)
              })
            )
            break;

          case '|':
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i
                },
                image: createImage(pipeVertical)
              })
            )
            break;
          case '1':
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i
                },
                image: createImage(pipeCorner1)
              })
            )
            break;

          case '2':
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i
                },
                image: createImage(pipeCorner2)
              })
            )
            break;

          case '3':
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i
                },
                image: createImage(pipeCorner3)
              })
            )
            break;
          
          case '4':
            boundaries.push(
              new Boundary({
                position: {
                  x: Boundary.width * j,
                  y: Boundary.height * i
                },
                image: createImage(pipeCorner4)
              })
            )
            break;

            case '[':
              boundaries.push(
                new Boundary({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  },
                  image: createImage(capLeft)
                })
              )
              break
            case ']':
              boundaries.push(
                new Boundary({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  },
                  image: createImage(capRight)
                })
              )
              break
            case '_':
              boundaries.push(
                new Boundary({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  },
                  image: createImage(capBottom)
                })
              )
              break
            case '^':
              boundaries.push(
                new Boundary({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  },
                  image: createImage(capTop)
                })
              )
              break
            case '+':
              boundaries.push(
                new Boundary({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  },
                  image: createImage(pipeCross)
                })
              )
              break
            case '5':
              boundaries.push(
                new Boundary({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  },
                  color: 'blue',
                  image: createImage(pipeConnectorTop)
                })
              )
              break
            case '6':
              boundaries.push(
                new Boundary({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  },
                  color: 'blue',
                  image: createImage(pipeConnectorRight)
                })
              )
              break
            case '7':
              boundaries.push(
                new Boundary({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  },
                  color: 'blue',
                  image: createImage(pipeConnectorBottom)
                })
              )
              break
            case '8':
              boundaries.push(
                new Boundary({
                  position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                  },
                  image: createImage(pipeConnectorLeft)
                })
              )
              break
            
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
