// Game constants & Variables
let inputDir = {x: 0, y: 0};
const foodSound = new Audio('music/food.mp3');
const gameoverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{x: 13, y: 13}];
let food = {x: 5, y: 5};

// value of Speed
let speed = parseInt(document.getElementById('speedDis').innerText);

speedChange.addEventListener('click', ()=>{
    speed = prompt("Enter Speed you want(Numbers only)!");
    while (!(parseInt(speed) <= 100 && parseInt(speed) > 0)) {
        speed = prompt("Invalid Speed Input! Enter Speed Again(Between 1 to 100)!");
        if (speed == null) {
            speed = 5;
            break;
        }
    }

    speed = parseInt(speed);
    document.getElementById('speedDis').innerText = `${speed}`;
});

// Background music Play/Pause
let ply = document.getElementById('play');
ply.addEventListener('click', ()=>{
    musicSound.play();
});

let pau = document.getElementById('pause');
pau.addEventListener('click', ()=>{
    musicSound.pause();
});

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // If you bump into wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    // Part 1: Updating the snake array & food
    if (isCollide(snakeArr)) {
        gameoverSound.play();
        // musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert(`Game Over! Your Score was: ${score}. Press any key to play again.`);
        snakeArr = [{x: 13, y: 15}];
        // musicSound.play();
        score = 0;
        document.getElementById('scoreDis').innerText = `${score}`;
    }

    // If food eaten, increament the score & regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
        score++;
        document.getElementById('scoreDis').innerText = `${score}`;
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and food

    // Displaying the snake
    // document.getElementById('board').innerHTML = "";
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
        // document.getElementById('board').appendChild(snakeElement);
    })

    // Displaying the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}





// Main Logic
window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            // console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            // console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            // console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})