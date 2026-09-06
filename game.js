```javascript
const game = document.getElementById("game");

const music = new Audio("music.mp3");
music.loop = true;

console.log("Путь к музыке:", music.src);
console.log("Ошибка аудио:", music.error);


// ====================
// НАСТРОЙКА МАСШТАБА
// ====================

function resizeGame() {

    const controlsSpace = 180;

    const scaleByWidth =
        (window.innerWidth * 0.96) / 800;

    const scaleByHeight =
        (window.innerHeight - controlsSpace) / 500;

    const scale =
        Math.min(1, scaleByWidth, scaleByHeight);

    game.style.transform =
        `scale(${scale})`;

    // Компенсируем место, которое занимает
    // немасштабированное поле в разметке
    game.style.marginBottom =
        -(500 * (1 - scale)) + "px";
}


window.addEventListener("resize", resizeGame);

resizeGame();


let x = 380;
let y = 230;

const speed = 3;

let direction = "right";
let gameOver = false;
let gameStarted = false;

let score = 0;

let eatTimer;


// ====================
// ИГРОК
// ====================

const player = document.createElement("div");

player.style.width = "50px";
player.style.height = "50px";

player.style.backgroundImage = 'url("normal.png")';
player.style.backgroundSize = "contain";
player.style.backgroundRepeat = "no-repeat";
player.style.backgroundPosition = "center";

player.style.position = "absolute";

player.style.zIndex = "2";

game.appendChild(player);


// ====================
// ТЕЛО
// ====================

const body = [];

const positionHistory = [];


// ====================
// ГЛАВНОЕ МЕНЮ
// ====================

const startPanel = document.createElement("div");

startPanel.style.position = "absolute";
startPanel.style.top = "50%";
startPanel.style.left = "50%";

startPanel.style.transform =
    "translate(-50%, -50%)";

startPanel.style.background = "#202020";

startPanel.style.padding = "35px 60px";

startPanel.style.borderRadius = "15px";

startPanel.style.textAlign = "center";

startPanel.style.boxSizing = "border-box";

startPanel.style.zIndex = "10";

game.appendChild(startPanel);


// ====================
// НАЗВАНИЕ ИГРЫ
// ====================

const gameTitle = document.createElement("div");

gameTitle.textContent = "MOJIRI SPACE";

gameTitle.style.color = "white";
gameTitle.style.fontSize = "40px";
gameTitle.style.fontFamily = "Arial";
gameTitle.style.fontWeight = "bold";

gameTitle.style.marginBottom = "25px";

gameTitle.style.whiteSpace = "nowrap";

startPanel.appendChild(gameTitle);


// ====================
// PLAY
// ====================

const playButton = document.createElement("button");

playButton.textContent = "PLAY";

playButton.style.fontSize = "25px";

playButton.style.padding =
    "10px 35px";

playButton.style.cursor = "pointer";

startPanel.appendChild(playButton);


// ====================
// СМЕНА НАПРАВЛЕНИЯ
// ====================

function changeDirection(newDirection) {

    if (!gameStarted || gameOver) {
        return;
    }


    if (direction === "up") {

        if (newDirection === "left") {
            direction = "left";
        }

        if (newDirection === "right") {
            direction = "right";
        }

    }


    if (direction === "down") {

        if (newDirection === "left") {
            direction = "left";
        }

        if (newDirection === "right") {
            direction = "right";
        }

    }


    if (direction === "left") {

        if (newDirection === "up") {
            direction = "up";
        }

        if (newDirection === "down") {
            direction = "down";
        }

    }


    if (direction === "right") {

        if (newDirection === "up") {
            direction = "up";
        }

        if (newDirection === "down") {
            direction = "down";
        }

    }

}


// ====================
// КЛАВИАТУРА
// ====================

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowUp" || event.key === "w") {
        changeDirection("up");
    }

    if (event.key === "ArrowDown" || event.key === "s") {
        changeDirection("down");
    }

    if (event.key === "ArrowLeft" || event.key === "a") {
        changeDirection("left");
    }

    if (event.key === "ArrowRight" || event.key === "d") {
        changeDirection("right");
    }

});


// ====================
// СЕНСОРНЫЕ КНОПКИ
// ====================

const upButton =
    document.getElementById("upButton");

const downButton =
    document.getElementById("downButton");

const leftButton =
    document.getElementById("leftButton");

const rightButton =
    document.getElementById("rightButton");


upButton.addEventListener("pointerdown", (event) => {

    event.preventDefault();

    changeDirection("up");

});


downButton.addEventListener("pointerdown", (event) => {

    event.preventDefault();

    changeDirection("down");

});


leftButton.addEventListener("pointerdown", (event) => {

    event.preventDefault();

    changeDirection("left");

});


rightButton.addEventListener("pointerdown", (event) => {

    event.preventDefault();

    changeDirection("right");

});


// ====================
// SCORE
// ====================

const scoreText = document.createElement("div");

scoreText.textContent = "SCORE: 0";

scoreText.style.position = "absolute";

scoreText.style.top = "10px";
scoreText.style.left = "10px";

scoreText.style.color = "white";

scoreText.style.fontSize = "20px";

scoreText.style.fontFamily = "Arial";

scoreText.style.zIndex = "3";

game.appendChild(scoreText);


// ====================
// ПЕЧЕНЬКА
// ====================

function createCookie() {

    const cookie =
        document.createElement("div");

    cookie.style.width = "40px";
    cookie.style.height = "40px";

    cookie.style.backgroundImage =
        'url("cookie.png")';

    cookie.style.backgroundSize = "contain";
    cookie.style.backgroundRepeat = "no-repeat";
    cookie.style.backgroundPosition = "center";

    cookie.style.position = "absolute";

    cookie.style.left =
        Math.random() * 760 + "px";

    cookie.style.top =
        Math.random() * 460 + "px";

    cookie.style.zIndex = "1";

    game.appendChild(cookie);

    return cookie;
}


let cookie = createCookie();


// ====================
// GAME OVER ПАНЕЛЬ
// ====================

const gameOverPanel =
    document.createElement("div");

gameOverPanel.style.position = "absolute";

gameOverPanel.style.top = "50%";
gameOverPanel.style.left = "50%";

gameOverPanel.style.transform =
    "translate(-50%, -50%)";

gameOverPanel.style.background = "#202020";

gameOverPanel.style.padding =
    "35px 60px";

gameOverPanel.style.borderRadius = "15px";

gameOverPanel.style.textAlign = "center";

gameOverPanel.style.boxSizing = "border-box";

gameOverPanel.style.display = "none";

gameOverPanel.style.zIndex = "10";

game.appendChild(gameOverPanel);


// ====================
// GAME OVER ТЕКСТ
// ====================

const gameOverText =
    document.createElement("div");

gameOverText.textContent =
    "GAME OVER";

gameOverText.style.color = "white";

gameOverText.style.fontSize = "40px";

gameOverText.style.fontFamily = "Arial";

gameOverText.style.fontWeight = "bold";

gameOverText.style.marginBottom = "15px";

gameOverText.style.whiteSpace = "nowrap";

gameOverPanel.appendChild(gameOverText);


// ====================
// ФИНАЛЬНЫЙ СЧЁТ
// ====================

const gameOverScoreText =
    document.createElement("div");

gameOverScoreText.textContent =
    "SCORE: 0";

gameOverScoreText.style.color = "white";

gameOverScoreText.style.fontSize = "25px";

gameOverScoreText.style.fontFamily = "Arial";

gameOverScoreText.style.marginBottom = "25px";

gameOverScoreText.style.whiteSpace = "nowrap";

gameOverPanel.appendChild(
    gameOverScoreText
);


// ====================
// RESTART
// ====================

const restartButton =
    document.createElement("button");

restartButton.textContent =
    "RESTART";

restartButton.style.fontSize = "20px";

restartButton.style.padding =
    "10px 25px";

restartButton.style.cursor =
    "pointer";

gameOverPanel.appendChild(
    restartButton
);


// ====================
// ДОБАВЛЕНИЕ СЕГМЕНТА
// ====================

function addBodySegment() {

    const segment =
        document.createElement("div");

    segment.style.width = "40px";
    segment.style.height = "40px";

    segment.style.backgroundImage =
        'url("eye.png")';

    segment.style.backgroundSize =
        "contain";

    segment.style.backgroundRepeat =
        "no-repeat";

    segment.style.backgroundPosition =
        "center";

    segment.style.position =
        "absolute";

    segment.style.zIndex = "2";

    segment.dataset.new = "true";

    game.appendChild(segment);

    body.push(segment);
}


// ====================
// PLAY
// ====================

playButton.addEventListener("click", () => {

    gameStarted = true;

    gameOver = false;

    music.currentTime = 0;

    music.play().then(() => {

        console.log(
            "МУЗЫКА ЗАПУСТИЛАСЬ!"
        );

    }).catch((error) => {

        console.log(
            "ОШИБКА МУЗЫКИ:",
            error
        );

    });

    startPanel.style.display = "none";

});


// ====================
// GAME OVER
// ====================

function showGameOver() {

    gameOver = true;

    music.pause();

    player.style.backgroundImage =
        'url("gameover.png")';

    gameOverScoreText.textContent =
        "SCORE: " + score;

    gameOverPanel.style.display =
        "block";
}


// ====================
// ИГРОВОЙ ЦИКЛ
// ====================

function gameLoop() {

    if (!gameStarted) {

        requestAnimationFrame(
            gameLoop
        );

        return;
    }


    if (gameOver) {

        requestAnimationFrame(
            gameLoop
        );

        return;
    }


    // ====================
    // ДВИЖЕНИЕ ГОЛОВЫ
    // ====================

    if (direction === "up") {
        y -= speed;
    }

    if (direction === "down") {
        y += speed;
    }

    if (direction === "left") {
        x -= speed;
    }

    if (direction === "right") {
        x += speed;
    }


    player.style.left =
        x + "px";

    player.style.top =
        y + "px";


    // ====================
    // ИСТОРИЯ ДВИЖЕНИЯ
    // ====================

    positionHistory.unshift({
        x: x,
        y: y
    });


    // ====================
    // ДВИЖЕНИЕ ТЕЛА
    // ====================

    for (
        let i = 0;
        i < body.length;
        i++
    ) {

        const historyIndex =
            (i + 1) * 20;

        if (
            positionHistory[
                historyIndex
            ]
        ) {

            body[i].style.left =
                positionHistory[
                    historyIndex
                ].x + 5 + "px";

            body[i].style.top =
                positionHistory[
                    historyIndex
                ].y + 5 + "px";

        }

    }


    // ====================
    // ИСТОРИЯ
    // ====================

    const maxHistory =
        (body.length + 2) * 20;

    if (
        positionHistory.length >
        maxHistory
    ) {

        positionHistory.length =
            maxHistory;

    }


    // ====================
    // СТЕНЫ
    // ====================

    // ВАЖНО:
    // Игровое поле ВСЕГДА 800×500.
    // На телефоне оно только визуально
    // уменьшается через transform.

    if (
        x < 0 ||
        y < 0 ||
        x + 50 > 800 ||
        y + 50 > 500
    ) {

        showGameOver();

    }


    // ====================
    // СТОЛКНОВЕНИЕ С ТЕЛОМ
    // ====================

    const headRect =
        player.getBoundingClientRect();

    for (
        let i = 2;
        i < body.length;
        i++
    ) {

        const bodyRect =
            body[i].getBoundingClientRect();

        if (
            headRect.left <
                bodyRect.right &&

            headRect.right >
                bodyRect.left &&

            headRect.top <
                bodyRect.bottom &&

            headRect.bottom >
                bodyRect.top
        ) {

            showGameOver();

            break;
        }

    }


    // ====================
    // ПЕЧЕНЬКА
    // ====================

    const playerRect =
        player.getBoundingClientRect();

    const cookieRect =
        cookie.getBoundingClientRect();

    if (
        playerRect.left <
            cookieRect.right &&

        playerRect.right >
            cookieRect.left &&

        playerRect.top <
            cookieRect.bottom &&

        playerRect.bottom >
            cookieRect.top
    ) {

        cookie.remove();

        score++;

        scoreText.textContent =
            "SCORE: " + score;

        addBodySegment();

        cookie = createCookie();


        // ====================
        // EAT PNG
        // ====================

        player.style.backgroundImage =
            'url("eat.png")';

        clearTimeout(eatTimer);

        eatTimer = setTimeout(() => {

            if (!gameOver) {

                player.style.backgroundImage =
                    'url("normal.png")';

            }

        }, 500);

    }


    // ====================
    // СТАРЫЕ СЕГМЕНТЫ
    // ====================

    for (
        let i = 0;
        i < body.length;
        i++
    ) {

        body[i].dataset.new =
            "false";

    }


    requestAnimationFrame(
        gameLoop
    );
}


// ====================
// RESTART
// ====================

restartButton.addEventListener(
    "click",
    () => {

        x = 380;
        y = 230;

        direction = "right";

        gameOver = false;

        gameStarted = true;


        // ====================
        // СБРАСЫВАЕМ EAT
        // ====================

        clearTimeout(eatTimer);

        player.style.backgroundImage =
            'url("normal.png")';


        // ====================
        // МУЗЫКА С НАЧАЛА
        // ====================

        music.currentTime = 0;

        music.play();


        // ====================
        // СБРАСЫВАЕМ СЧЁТ
        // ====================

        score = 0;

        scoreText.textContent =
            "SCORE: 0";

        gameOverScoreText.textContent =
            "SCORE: 0";


        // ====================
        // УДАЛЯЕМ ТЕЛО
        // ====================

        for (
            let i = 0;
            i < body.length;
            i++
        ) {

            body[i].remove();

        }

        body.length = 0;

        positionHistory.length = 0;


        // ====================
        // ВОЗВРАЩАЕМ ИГРОКА
        // ====================

        player.style.left =
            x + "px";

        player.style.top =
            y + "px";


        // ====================
        // СКРЫВАЕМ GAME OVER
        // ====================

        gameOverPanel.style.display =
            "none";


        // ====================
        // НОВАЯ ПЕЧЕНЬКА
        // ====================

        cookie.remove();

        cookie = createCookie();

    }
);


gameLoop();
```
