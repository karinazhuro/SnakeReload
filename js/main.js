const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

const lineSize = 1;
const lineColor = "#767676";

const snakeSize = 30;
const snakeColor = "#169633";

let snakeX = 0;
let snakeY = 0;

let direction = 3;

const keyMap = {
    arrowUp: 38,
    arrowDown: 40,
    arrowRight: 39,
    arrowLeft: 37,
};

let appleX = 0;
let appleY = 0;
const appleColor = "#BF2929";

let snakeBody = [];

const width = window.innerWidth - window.innerWidth % snakeSize;
const height = window.innerHeight - window.innerHeight % snakeSize;

canvas.width = width;
canvas.height = height;

document.addEventListener('keydown', function (event) {
    if (event.keyCode === keyMap.arrowLeft && direction !== 3) {
        direction = 1;
    } else if (event.keyCode === keyMap.arrowUp && direction !== 4) {
        direction = 2;
    } else if (event.keyCode === keyMap.arrowRight && direction !== 1) {
        direction = 3;
    } else if (event.keyCode === keyMap.arrowDown && direction !== 2) {
        direction = 4;
    }
});

function loop() {
    ctx.fillStyle = "#fafafa";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = snakeColor;
    for (let i = snakeBody.length - 1; i >= 0; i--) {
        if (i !== 0) {
            snakeBody[i].x = snakeBody[i - 1].x;
            snakeBody[i].y = snakeBody[i - 1].y;
        } else {
            snakeBody[i].x = snakeX;
            snakeBody[i].y = snakeY;
        }
        ctx.fillRect(snakeBody[i].x, snakeBody[i].y, snakeSize, snakeSize);
    }

    switch (direction) {
        case 1:
            snakeX -= snakeSize;
            break;
        case 2:
            snakeY -= snakeSize;
            break;
        case 3:
            snakeX += snakeSize;
            break;
        case 4:
            snakeY += snakeSize;
            break;
    }
    ctx.fillStyle = "#0E5A1F";

    snakeX = (snakeX % width + width) % width;
    snakeY = (snakeY % height + height) % height;

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i].x && snakeY === snakeBody[i].y) {
            alert(`game over: ${snakeBody.length}`);
            snakeBody = [];
            snakeX = 0;
            snakeY = 0;
        }
    }

    ctx.fillRect(snakeX, snakeY, snakeSize, snakeSize);

    if (snakeX === appleX && snakeY === appleY) {
        resolveApplePosition();
        snakeBody.push({x: snakeX, y: snakeY});
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (appleX === snakeBody[i].x && appleY === snakeBody[i].y) {
            resolveApplePosition();
        }
    }

    ctx.fillStyle = appleColor;
    ctx.fillRect(appleX, appleY, snakeSize, snakeSize);

    ctx.fillStyle = lineColor;
    for (let i = 0; i < width; i += snakeSize) {
        ctx.fillRect(i, 0, lineSize, height);
    }
    for (let i = 0; i < height; i += snakeSize) {
        ctx.fillRect(0, i, width, lineSize);
    }
}

function resolveApplePosition() {
    let posX = Math.random() * width;
    let posY = Math.random() * height;
    appleX = posX - posX % snakeSize;
    appleY = posY - posY % snakeSize;
}
function stopGame() {
    $('body').keydown(function(e) {
        if (e.keyCode === 27) {
            alert('Играть дальше');
        }
    });

    // let e = $.Event("keydown", {
    //     keyCode: 27
    // });
    //
    // $('button').click(function() {
    //     $("body").trigger(e);
    // });
    //
}
resolveApplePosition();
loop();
setInterval(loop, 200);