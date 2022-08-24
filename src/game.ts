const canvas = <HTMLCanvasElement> document.querySelector("#game");
const game = canvas.getContext("2d");
const fixPosition: number = 6;
let canvasSize: number;
let elementsSize: number;
let level: number = 0;

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);


function startGame():void {
  game!.clearRect(0, 0, canvasSize, canvasSize);
  game!.font = `${elementsSize}px Verdana`
  game!.textAlign = "end"
  let map: any = maps[level].match(/[IXO\-]+/g)!.map(i => i.split(""))
  map.forEach((row: [string], rowIndex: number) => {
    row.forEach((col: string, colIndex: number) => {
      const emoji: string = emojis[col]
      const posX: number = (elementsSize * (colIndex + 1)) + fixPosition
      const posY: number = (elementsSize * (rowIndex + 1)) - fixPosition
      game!.fillText(
        emoji,
        posX,
        posY
      )
    });
  });
}


function setCanvasSize(): void {
  canvasSize =  window.innerHeight > window.innerWidth ? window.innerWidth * 0.8 : window.innerHeight * 0.8;
  elementsSize = canvasSize * 0.1;

  canvas.setAttribute("width", canvasSize.toString())
  canvas.setAttribute("height", canvasSize.toString())

  startGame()
}
