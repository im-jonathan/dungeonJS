"use strict";
const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const fixPosition = 6;
let canvasSize;
let elementsSize;
let level = 0;
window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);
function startGame() {
    game.clearRect(0, 0, canvasSize, canvasSize);
    game.font = `${elementsSize}px Verdana`;
    game.textAlign = "end";
    let map = maps[level].match(/[IXO\-]+/g).map(i => i.split(""));
    map.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = (elementsSize * (colIndex + 1)) + fixPosition;
            const posY = (elementsSize * (rowIndex + 1)) - fixPosition;
            game.fillText(emoji, posX, posY);
        });
    });
}
function setCanvasSize() {
    canvasSize = window.innerHeight > window.innerWidth ? window.innerWidth * 0.8 : window.innerHeight * 0.8;
    elementsSize = canvasSize * 0.1;
    canvas.setAttribute("width", canvasSize.toString());
    canvas.setAttribute("height", canvasSize.toString());
    startGame();
}
