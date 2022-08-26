"use strict";
const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const fixPosition = 7;
let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;
let isEnemiesFilled = false;
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
const finishPosition = {
    x: undefined,
    y: undefined
};
let enemyPositions = [];
window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);
window.addEventListener("keydown", moveByKey);
function startGame() {
    game.clearRect(0, 0, canvasSize, canvasSize);
    game.font = `${elementsSize}px Verdana`;
    game.textAlign = "end";
    try {
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
                else if (col === "I") {
                    finishPosition.x = posX;
                    finishPosition.y = posY;
                }
                else if (col === "X" && !isEnemiesFilled) {
                    enemyPositions.push({
                        x: posX,
                        y: posY
                    });
                }
                game.fillText(emoji, posX, posY);
            });
        });
        isEnemiesFilled = true;
        movePlayer();
    }
    catch (error) {
        gameWin();
    }
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
        keysFunction[tecla]();
    }
}
function movePlayer() {
    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
    const collitionX = playerPosition.x.toFixed(3) === finishPosition.x.toFixed(3);
    const collitionY = playerPosition.y.toFixed(3) === finishPosition.y.toFixed(3);
    const collition = collitionX && collitionY;
    if (collition)
        nextLevel();
    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) === playerPosition.x.toFixed(3);
        const enemyCollisionY = enemy.y.toFixed(3) === playerPosition.y.toFixed(3);
        return (enemyCollisionX && enemyCollisionY);
    });
    if (enemyCollision) {
        levelFail();
    }
}
function nextLevel() {
    level += 1;
    enemyPositions = [];
    isEnemiesFilled = false;
    startGame();
}
function gameWin() {
    console.log("ganaste");
}
function levelFail() {
    lives--;
    if (lives <= 0) {
        level = 0;
        lives = 3;
        isEnemiesFilled = false;
        enemyPositions = [];
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}
