interface Position {
  x?: number,
  y?: number
}
const canvas = <HTMLCanvasElement> document.querySelector("#game");
const game = canvas.getContext("2d");
const fixPosition:number = 7;
let canvasSize:number;
let elementsSize:number;
let level:number = 0;
let lives:number = 3;
let isEnemiesFilled:boolean = false;
const keysFunction:any = {
  ArrowUp: moveUp,
  ArrowDown: moveDown,
  ArrowLeft: moveLeft,
  ArrowRight: moveRight
}

const playerPosition:Position = {
  x: undefined,
  y: undefined
}
const finishPosition:Position = {
  x: undefined,
  y: undefined
}
let enemyPositions:Position[] = []

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);
window.addEventListener("keydown", moveByKey)


function startGame():void {
  game!.clearRect(0, 0, canvasSize, canvasSize);
  game!.font = `${elementsSize}px Verdana`
  game!.textAlign = "end"
  try {
    let map: any = maps[level].match(/[IXO\-]+/g)!.map(i => i.split(""))
    game!.clearRect(0,0,canvasSize, canvasSize);
    map.forEach((row: [string], rowIndex: number) => {
      row.forEach((col: string, colIndex: number) => {
        const emoji: string = emojis[col]
        const posX: number = (elementsSize * (colIndex + 1)) + fixPosition
        const posY: number = (elementsSize * (rowIndex + 1)) - fixPosition
        if (col === "O" && playerPosition.x === undefined) {
          playerPosition.x = posX;
          playerPosition.y = posY;
        } else if (col === "I") {
          finishPosition.x = posX;
          finishPosition.y = posY;
        } else if (col === "X" && !isEnemiesFilled) {
          enemyPositions.push({
            x: posX,
            y: posY
          })
        }
        game!.fillText(
          emoji,
          posX,
          posY
        )
      });
    });
    isEnemiesFilled = true;
    movePlayer()
  } catch (error) {
    gameWin();
  }
}


function setCanvasSize():void {
  canvasSize =  window.innerHeight > window.innerWidth ? window.innerWidth * 0.8 : window.innerHeight * 0.8;
  elementsSize = canvasSize * 0.1;

  canvas.setAttribute("width", canvasSize.toString())
  canvas.setAttribute("height", canvasSize.toString())

  startGame()
}


function moveUp():void {

  if ((playerPosition.y! - elementsSize) > (elementsSize - fixPosition)) {
    playerPosition.y! -= elementsSize
  }
  startGame();
}


function moveDown():void {
  if ((playerPosition.y! + elementsSize) < canvasSize) {
    playerPosition.y! += elementsSize
  }
  startGame();
}


function moveLeft():void {
  if ((playerPosition.x! - elementsSize) > elementsSize) {
    playerPosition.x! -= elementsSize
  }
  startGame();
}


function moveRight():void {
  if ((playerPosition.x! + elementsSize) < (canvasSize + fixPosition)) {
    playerPosition.x! += elementsSize
  }
  startGame();
}


function moveByKey(event: KeyboardEvent):void {
  let tecla:string = event.key;
  if (tecla in keysFunction){
    keysFunction[tecla]()
  }
}


function movePlayer():void {
  game!.fillText(
    emojis["PLAYER"],
    playerPosition.x!,
    playerPosition.y!
  );
  const collisionX:boolean = playerPosition.x!.toFixed(3) === finishPosition.x!.toFixed(3)
  const collisionY:boolean = playerPosition.y!.toFixed(3) === finishPosition.y!.toFixed(3)
  const collision:boolean = collisionX && collisionY
  if (collision) nextLevel();
  const enemyCollision = enemyPositions.find(enemy => {
    const enemyCollisionX:boolean = enemy.x!.toFixed(3) === playerPosition.x!.toFixed(3);
    const enemyCollisionY:boolean = enemy.y!.toFixed(3) === playerPosition.y!.toFixed(3);
    return (enemyCollisionX && enemyCollisionY);
  });

  if (enemyCollision) {
    levelFail();
  }
}

function nextLevel():void {
  level += 1;
  enemyPositions = [];
  isEnemiesFilled = false;
  startGame();
}

function gameWin():void {
  console.log("ganaste");
}

function levelFail():void {
  lives--;
  if (lives <= 0) {
    level = 0;
    lives = 3;
    isEnemiesFilled = false
    enemyPositions = []
  }
  playerPosition.x = undefined
  playerPosition.y = undefined
  startGame()
}

