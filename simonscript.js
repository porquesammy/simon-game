const buttonColors = ["red", "blue", "green", "yellow"];
const button = document.querySelectorAll('.btn');

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// start game on keydown event 
window.addEventListener("keydown", function () {
    if (!started) {
        document.getElementById("level-title").innerText = "Level = " + level;
        nextSequence();
        started = true;
    }
});

// add click features, play sound when clicked and animate button
const btn = document.querySelectorAll(".btn")
for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function () {
        let userChosenColor = this.attributes.id.nodeValue;
        userClickedPattern.push(userChosenColor);
        let sound = new Audio(`/sounds/${userChosenColor}.mp3`);
        sound.play();
        this.classList.add('pressed');
        checkAnswer(userClickedPattern.length - 1);
    });
}



// remove pressed class after transform
button.forEach(btn => btn.addEventListener("transitionend", removeTransition));

function removeTransition(e) {
    if (e.propertyName !== 'transform') return; //skip if not true
    this.classList.remove('pressed');
}



// check the user input -playSound -reset if wrong
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        const soundWrong = new Audio('/sounds/wrong.mp3');
        soundWrong.play();
        const body = document.querySelector('body');
        body.classList.add('game-over');
        document.getElementById('level-title').innerText = "Game Over, Press Any Key to Restart";

        setTimeout(removeGameOver, 1000);

        function removeGameOver() {
            body.classList.remove('game-over');
        }

        startOver();
    }
}


//move to next sequence update level and push another color to gamePattern
function nextSequence() {
    userClickedPattern = [];
    level++;
    document.getElementById('level-title').innerText = "Level = " + level;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    document.getElementById(randomChosenColor).classList.add('pressed');
    let sound = new Audio(`/sounds/${randomChosenColor}.mp3`);
    sound.play();
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}