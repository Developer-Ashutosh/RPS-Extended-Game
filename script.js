// Selecting DOM elements
const rulesButton = document.querySelector("#rules-btn");
const closeButton = document.querySelector("#close-btn");
const gameModal = document.querySelector(".modal");
const cover = document.querySelector(".cover");
const versionBtn = document.querySelector("#version-btn");
const scoreDisplay = document.querySelector("#score");
const gameBoard = document.querySelector("main.board");
let computerChoices = ["paper", "scissor", "rock", "lizard", "spock"];
let playerScore = 0;

// Function to handle player's choice
const handlePlayerChoice = () => {
    const playerOptions = document.querySelectorAll("#step-one .options");
    playerOptions.forEach((option, index) => {
        option.addEventListener("click", () => {
            // Randomly select the computer's choice
            let computerChoice = Math.floor(Math.random() * computerChoices.length);

            // Set up the game board for the next step
            gameBoard.innerHTML = `
                <div class="step" id="step-two">
                    <div id="player">
                        <p>You Picked</p>
                        <div class="${option.classList}">${option.innerHTML}</div>
                    </div>
                    <div class="result">
                        <p></p>
                        <button id="play-again">Play Again</button>
                    </div>
                    <div id="computer">
                        <p>The House Picked</p>
                        <div class="options"></div>
                    </div>
                </div>`;

            // Handle the computer's choice and determine the result
            handleComputerChoice(computerChoice);
            determineResult(index, computerChoice);
            playAgain();
        });
    });
};

// Function to handle the computer's choice
const handleComputerChoice = (computerChoice) => {
    setTimeout(() => {
        // Set up the computer's choice on the game board
        gameBoard.querySelector("#computer").innerHTML = `
            <p>The House Picked</p>
            <div class="options ${computerChoices[computerChoice]}">
                <div class="img-container">
                    <img src="./images/icon-${computerChoices[computerChoice]}.svg" alt="${computerChoices[computerChoice]} Btn">
                </div>
            </div>`;
    }, 1000);
};

// Function to determine the result of the game
const determineResult = (playerIndex, computerChoice) => {
    setTimeout(() => {
        // Display the result on the game board
        gameBoard.querySelector(".result").style.display = "block";

        // Determine the result based on player and computer choices
        if (
            (playerIndex == 0 && (computerChoice == 2 || computerChoice == 4)) ||
            (playerIndex == 1 && (computerChoice == 0 || computerChoice == 3)) ||
            (playerIndex == 2 && (computerChoice == 1 || computerChoice == 3)) ||
            (playerIndex == 3 && (computerChoice == 4 || computerChoice == 0)) ||
            (playerIndex == 4 && (computerChoice == 1 || computerChoice == 2))
        ) {
            gameBoard.querySelector(".result p").innerText = "You Won";
            gameBoard.querySelector("#play-again").style.color = "var(--Dark-Text)";
            playerScore++;
            scoreDisplay.innerText = parseInt(playerScore);
        } else if (
            (playerIndex == 0 && (computerChoice == 1 || computerChoice == 3)) ||
            (playerIndex == 1 && (computerChoice == 4 || computerChoice == 2)) ||
            (playerIndex == 2 && (computerChoice == 0 || computerChoice == 4)) ||
            (playerIndex == 3 && (computerChoice == 2 || computerChoice == 1)) ||
            (playerIndex == 4 && (computerChoice == 3 || computerChoice == 0))
        ) {
            gameBoard.querySelector(".result p").innerText = "You Lose";
            gameBoard.querySelector("#play-again").style.color = "#DD4062";
            playerScore--;
            scoreDisplay.innerText = parseInt(playerScore);
        } else if (
            (playerIndex == 0 && computerChoice == 0) ||
            (playerIndex == 1 && computerChoice == 1) ||
            (playerIndex == 2 && computerChoice == 2) ||
            (playerIndex == 3 && computerChoice == 3) ||
            (playerIndex == 4 && computerChoice == 4)
        ) {
            gameBoard.querySelector(".result p").innerText = "Match Draw";
            gameBoard.querySelector("#play-again").style.color = "var(--Score-Text)";
        }
    }, 2000);
};

// Function to start a new game
const playAgain = () => {
    const playBtn = document.querySelector("#play-again");
    playBtn.addEventListener("click", () => {
        // Reset the game board for a new game
        gameBoard.innerHTML = `
        <div class="step" id="step-one">
            <div class="options paper" id="paper">
              <div class="img-container">
                <img src="./images/icon-paper.svg" alt="Paper Btn">
              </div>
            </div>
            <div class="options scissor" id="scissor">
              <div class="img-container">
                <img src="./images/icon-scissor.svg" alt="Scissor Btn">
              </div>
            </div>
            <div class="options rock" id="rock">
              <div class="img-container">
                <img src="./images/icon-rock.svg" alt="Rock Btn">
              </div>
            </div>
        </div > `;

        // Add the bonus options for the "Regular" version
        if (versionBtn.textContent == "Regular") {
            document.querySelector("#step-one").innerHTML += `
        <div class="options lizard bonus" id="lizard">
            <div class="img-container">
                <img src="./images/icon-lizard.svg" alt="Rock Btn">
            </div>
        </div>
        <div class="options spock bonus" id="spock">
            <div class="img-container">
                 <img src="./images/icon-spock.svg" alt="Rock Btn">
            </div>
        </div>`;
        }
        // Or adjust the styling for the "Extended" version
        else {
            document.querySelector("#step-one").style.backgroundImage = "url(./images/bg-triangle.svg)";
            document.querySelectorAll(".options").forEach(e => {
                e.style.height = e.style.width = "140px ";
            });
            document.querySelector("#paper").style.left = document.querySelector("#scissor").style.right = "0.5rem";
            document.querySelector("#scissor").style.top = "1.5rem";
            document.querySelector("#rock").style.right = "7.8rem";
        }
        // Re-enable player choice handling for the new game
        handlePlayerChoice();
    });
};

// Function to toggle the rules modal
const toggleRules = () => {
    rulesButton.addEventListener("click", () => {
        gameModal.style.top = "50%";
        cover.style.display = "flex";
    });
    closeButton.addEventListener("click", () => {
        gameModal.style.top = "-100%";
        cover.style.display = "none";
    });
};

// Function to toggle between "Regular" and "Extended" versions
const toggleVersion = () => {
    versionBtn.addEventListener("click", () => {
        if (versionBtn.textContent == "Regular") {
            // Switch to "Regular" version
            document.querySelector("link").href = "./images/logo.svg";
            computerChoices = ["paper", "scissor", "rock"];
            document.querySelectorAll(".bonus").forEach(e => {
                e.remove();
            });
            scoreDisplay.innerText = "00";
            document.querySelectorAll("h1").forEach(e => {
                e.style.fontSize = "2.5rem";
            });
            document.querySelector("#step-one").style.backgroundImage = "url(./images/bg-triangle.svg)";
            document.querySelectorAll(".options").forEach(e => {
                e.style.height = e.style.width = "140px ";
            });
            document.querySelector("#paper").style.left = document.querySelector("#scissor").style.right = "0.5rem";
            document.querySelector("#scissor").style.top = "1.5rem";
            document.querySelector("#rock").style.right = "7.8rem";
            gameModal.querySelector("img#rules").src = "./images/image-rules.svg";
            versionBtn.textContent = "Extended";
            handlePlayerChoice();
        } else {
            // Switch to "Extended" version
            document.querySelector("link").href = "./images/logo-bonus.svg";
            computerChoices = ["paper", "scissor", "rock", "lizard", "spock"];
            document.querySelector(".normal").innerHTML += `<h1 class="bonus">Lizard</h1>
    <h1 class="bonus">Spock</h1>`;
            scoreDisplay.innerText = "00";
            document.querySelector("#step-one").innerHTML += `
        <div class="options lizard bonus" id="lizard">
            <div class="img-container">
                <img src="./images/icon-lizard.svg" alt="Rock Btn">
            </div>
        </div>
        <div class="options spock bonus" id="spock">
            <div class="img-container">
                 <img src="./images/icon-spock.svg" alt="Rock Btn">
            </div>
        </div>`;
            document.querySelectorAll("h1").forEach(e => {
                e.style.fontSize = "1.9rem";
            });
            document.querySelector("#step-one").style.backgroundImage = "url(./images/bg-pentagon.svg)";
            document.querySelectorAll(".options").forEach(e => {
                e.style.height = e.style.width = "130px ";
            });
            document.querySelector("#paper").style.left = "7.7rem";
            document.querySelector("#scissor").style.top = "8rem";
            document.querySelector("#rock").style.right = "2.5rem";
            gameModal.querySelector("img#rules").src = "./images/image-rules-bonus.svg";
            versionBtn.textContent = "Regular";
            handlePlayerChoice();
        }
    });
};

// Initial function calls
handlePlayerChoice();
toggleRules();
toggleVersion();
