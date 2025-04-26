const gmailInput = document.querySelector("#gmail_input")
const gmailButton = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

const regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = "OK"
        gmailResult.style.color = "green"
    } else {
        gmailResult.innerHTML = "NOT OK"
        gmailResult.style.color = "red"
    }
}

const child_block = document.querySelector('.child_block')

let posX = 0
let posY = 0
let direction = 'right'



const moveBlock = () => {

    if (direction === 'right') {
        posX++
        if (posX >= 450) direction = 'down'
    } else if (direction === 'down') {
        posY++
        if (posY >= 450) direction = 'left'
    } else if (direction === 'left') {
        posX--
        if (posX <= 0) direction = 'up'
    } else if (direction === 'up') {
        posY--
        if (posY <= 0) direction = 'right'
    }

    child_block.style.left = `${posX}px`
    child_block.style.top = `${posY}px`

    requestAnimationFrame(moveBlock)
}

moveBlock()

const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const resetButton = document.querySelector("#reset");
const secondsOnDisplay = document.querySelector("#seconds");

let seconds = 0
let timerInterval

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

function updateDisplay() {
    secondsOnDisplay.textContent = seconds;
}
function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000);
    }
}
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}
function resetTimer() {
    stopTimer();
    seconds = 0;
    updateDisplay();
}

updateDisplay();
//
const characterList = document.querySelector(".characters-list"); // <--- тут класс .characters-list
const request = new XMLHttpRequest();
request.open("GET", "../data/persons.json");
request.setRequestHeader("Content-type", "application/json");
request.responseType = "json";
request.send()

const renderCharacterList = (data) => {
    data.forEach((character) => {
        const characterCard = document.createElement("div");
        characterCard.classList.add("character-card");

        const characterImage = document.createElement("img");
        characterImage.setAttribute("src", character.image);

        const characterName = document.createElement("p");
        characterName.innerText = character.name;

        const characterAge = document.createElement("span");
        characterAge.innerText = character.age;

        characterCard.append(characterImage);
        characterCard.append(characterName);
        characterCard.append(characterAge);

        characterList.append(characterCard);
    });
}

request.onload = () => {
    const data = request.response;
    console.log(data);
    renderCharacterList(data);
}
