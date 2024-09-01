var playerScore
var computerScore
var scoreToWin = 5

playGame()

function playGame() {
    playerScore = 0
    computerScore = 0

    rock = document.getElementById("rock")
    paper = document.getElementById("paper")
    scissors = document.getElementById("scissors")

    rock.addEventListener("click", () => playRound("rock", scoreToWin))
    paper.addEventListener("click", () => playRound("paper", scoreToWin))
    scissors.addEventListener("click", () => playRound("scissors", scoreToWin))
}

function playRound(playerSelection, scoreToWin) {
    roundDisplay = document.getElementById("round")
    playerScoreDisplay = document.getElementById("playerScore")
    computerScoreDisplay = document.getElementById("computerScore")

    if (playerScore == scoreToWin)
        roundDisplay.innerText = "Yay. You won with these scores:"
    else if (computerScore == scoreToWin)
        roundDisplay.innerText = "Dang you lost cuh! You lost with these scores:"
    else {
        roundDisplay.innerText = victorOutput(playerSelection, getComputerChoice())
        playerScoreDisplay.innerText = "player score: " + playerScore
        computerScoreDisplay.innerText = "computer score: " + computerScore
    }
}


function getComputerChoice() {
    const choice = Math.floor(Math.random() * 3) + 1;
    switch (choice) {
        case 1:
            return "Rock";
        case 2:
            return "Paper";
        case 3:
            return "Scissors";
    }
}

function victorOutput(playerSelection, computerSelection) {
    var beginPhrase = "You ";
    const playerSelectionFormatted = playerSelection.charAt(0).toUpperCase() + playerSelection.substring(1);
    const victor = victorDecision(playerSelectionFormatted, computerSelection);

    if (victor === "Tied")
        return beginPhrase + victor + "! " + "You both chose " + playerSelectionFormatted + "!";
    if (victor === "Won")
        return beginPhrase + victor + "! " + playerSelectionFormatted + " beats " + computerSelection;
    // if Lost
    return beginPhrase + victor + "! " + computerSelection + " beats " + playerSelectionFormatted;
}

function victorDecision(playerSelection, computerSelection) {
    if (playerSelection === computerSelection)
        return "Tied";
    if (playerSelection === "Rock" && computerSelection === "Scissors") {
        playerScore++
        return "Won";
    }
    if (playerSelection === "Paper" && computerSelection === "Rock") {
        playerScore++
        return "Won";
    }
    if (playerSelection === "Scissors" && computerSelection === "Paper") {
        playerScore++
        return "Won";
    }
    computerScore++
    return "Lost";
}

