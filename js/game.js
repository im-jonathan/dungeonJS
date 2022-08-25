"use strict";
const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const fixPosition = 6;
let canvasSize;
let elementsSize;
let level = 1;
const keysFunction = {
    ArrowUp: moveUp,
    ArrowDown: moveDown,
    ArrowLeft: moveLeft,
    ArrowRight: moveRight
};
const playerPosition = {
    x: undefined,
    y: undefined
};
window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);
window.addEventListener("keydown", moveByKey);
function startGame() {
    game.clearRect(0, 0, canvasSize, canvasSize);
    game.font = `${elementsSize}px Verdana`;
    game.textAlign = "end";
    let map = maps[level].match(/[IXO\-]+/g).map(i => i.split(""));
    game.clearRect(0, 0, canvasSize, canvasSize);
    map.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const emoji = emojis[col];
            const posX = (elementsSize * (colIndex + 1)) + fixPosition;
            const posY = (elementsSize * (rowIndex + 1)) - fixPosition;
            if (col === "O" && playerPosition.x === undefined) {
                playerPosition.x = posX;
                playerPosition.y = posY;
            }
            game.fillText(emoji, posX, posY);
        });
    });
    movePlayer();
}
function setCanvasSize() {
    canvasSize = window.innerHeight > window.innerWidth ? window.innerWidth * 0.8 : window.innerHeight * 0.8;
    elementsSize = canvasSize * 0.1;
    canvas.setAttribute("width", canvasSize.toString());
    canvas.setAttribute("height", canvasSize.toString());
    startGame();
}
function moveUp() {
    if ((playerPosition.y - elementsSize) > (elementsSize - fixPosition)) {
        playerPosition.y -= elementsSize;
    }
    startGame();
}
function moveDown() {
    if ((playerPosition.y + elementsSize) < canvasSize) {
        playerPosition.y += elementsSize;
    }
    startGame();
}
function moveLeft() {
    if ((playerPosition.x - elementsSize) > elementsSize) {
        playerPosition.x -= elementsSize;
    }
    startGame();
}
function moveRight() {
    if ((playerPosition.x + elementsSize) < (canvasSize + fixPosition)) {
        playerPosition.x += elementsSize;
    }
    startGame();
}
function moveByKey(event) {
    let tecla = event.key;
    if (tecla in keysFunction) {
        console.log("aqui");
        keysFunction[tecla]();
    }
}
function movePlayer() {
    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}
