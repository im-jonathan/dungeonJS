interface PlayerPosition {
  x?: number,
  y?: number
}
const canvas = <HTMLCanvasElement> document.querySelector("#game");
const game = canvas.getContext("2d");
const fixPosition: number = 6;
let canvasSize: number;
let elementsSize: number;
let level: number = 1;

const keysFunction:any = {
  ArrowUp: moveUp,
  ArrowDown: moveDown,
  ArrowLeft: moveLeft,
  ArrowRight: moveRight
}

const playerPosition:PlayerPosition = {
  x: undefined,
  y: undefined
}


window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);
window.addEventListener("keydown", moveByKey)


function startGame():void {
  game!.clearRect(0, 0, canvasSize, canvasSize);
  game!.font = `${elementsSize}px Verdana`
  game!.textAlign = "end"
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

      }
      game!.fillText(
        emoji,
        posX,
        posY
      )
    });
  });
  movePlayer()
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
    console.log("aqui");
    keysFunction[tecla]()
  }
}


function movePlayer():void {
  game!.fillText(
    emojis["PLAYER"],
    playerPosition.x!,
    playerPosition.y!
  );
}

