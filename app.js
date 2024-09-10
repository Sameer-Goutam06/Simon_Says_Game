let gameseq = [];
let userseq = [];
let btns = ["yellow", "red", "green", "purple"];
let h2 = document.querySelector("h2");
let btn = document.getElementsByClassName("btn");
let startButton = document.getElementById("start-btn");
let stopButton = document.getElementById("stop-btn");

// Initializing the start of the game
let start = false;
let level = 0;

// Game starts
let started = function () {
    startButton.addEventListener("click", function () {
        if (!start) {
            console.log("Game start");
            start = true;
            levelUp();
        }
    });
}
started();

// Button flashing function
function gameFlash(btn) {
    btn.classList.add("btnflash");
    setTimeout(function () {
        btn.classList.remove("btnflash");
    }, 400);
}

// User interaction 
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 400);
}

// levelUp starts
function levelUp() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randomIndex = Math.floor(Math.random() * 3);
    let randomColor = btns[randomIndex];
    gameseq.push(randomColor);
    let randomButton = document.querySelector(`.${randomColor}`);
    gameFlash(randomButton);
}

// To check sequence
function checkSequence(index) {
    if (userseq[index] == gameseq[index]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelUp(), 1000);
        }
        console.log("Sequence matched");
    } else {
        console.log("Game Over");
        h2.innerHTML = `Game Over! Your score is: <b>${level * 10}</b><br>Press start to play again`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 100);
        reset();
    }
}

// Function for capturing pressed buttons sequence   
function btnPress() {
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userseq.push(userColor);
    checkSequence(userseq.length - 1);
}

// addEventListener for buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Reset function
function reset() {
    start = false;
    gameseq = [];
    userseq = [];
    level = 0;
    h2.innerText = `Press start to play`;
}

// Stop game on clicking stop button
stopButton.addEventListener("click", function () {
    console.log("Game stopped");
    reset();
});
