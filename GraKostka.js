
const state = {
    playerScore: 0,
    computerScore: 0,
    total: 0,
    history: [],
    playerTurn: true,
    gameOver: false
};


const dice = document.getElementById("dice");
const rollBtn = document.getElementById("rollBtn");
const resetBtn = document.getElementById("resetBtn");
const historyEl = document.getElementById("history");
const messageEl = document.getElementById("message");

const elements = {
    player: document.getElementById("playerScore"),
    computer: document.getElementById("computerScore"),
    total: document.getElementById("total")
};



function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function updateState(value, isPlayer) {
    state.history.push(value);
    state.total += value;

    if (isPlayer) {
        if (value === 1) {
            state.playerScore = 0;
            state.playerTurn = false;
            return "fail";
        } else {
            state.playerScore += value;
            state.playerTurn = false;
            return "ok";
        }
    } else {
        if (value === 1) {
            state.computerScore = 0;
            return "fail";
        } else {
            state.computerScore += value;
            state.playerTurn = true;
            return "ok";
        }
    }
}

function checkWinner() {
    if (state.playerScore >= 20) {
        state.gameOver = true;
        return "player";
    }
    if (state.computerScore >= 20) {
        state.gameOver = true;
        return "computer";
    }
    return null;
}

function resetGame() {
    state.playerScore = 0;
    state.computerScore = 0;
    state.total = 0;
    state.history = [];
    state.playerTurn = true;
    state.gameOver = false;
}



function updateDice(value) {
    dice.textContent = value;

    dice.classList.add("roll");
    setTimeout(() => dice.classList.remove("roll"), 300);
}

function updateUI() {
    elements.player.textContent = `Punkty gracza: ${state.playerScore}`;
    elements.computer.textContent = `Punkty komputera: ${state.computerScore}`;
    elements.total.textContent = `Suma punktów: ${state.total}`;
    historyEl.textContent = state.history.join(", ");
}

function showMessage(text) {
    messageEl.textContent = text;
}


function playerMove() {
    if (!state.playerTurn || state.gameOver) return;

    const value = rollDice();
    updateDice(value);

    const result = updateState(value, true);

    if (result === "fail") {
        showMessage("❌ Straciłeś punkty!");
    } else {
        showMessage(`Dostałeś ${value}`);
    }

    updateUI();
    checkGame();

    if (!state.gameOver) {
        setTimeout(computerMove, 1000);
    }
}

function computerMove() {
    if (state.gameOver) return;

    const value = rollDice();
    updateDice(value);

    const result = updateState(value, false);

    if (result === "fail") {
        showMessage("🤖 Komputer stracił punkty!");
    } else {
        showMessage(`Komputer rzucił ${value}`);
    }

    updateUI();
    checkGame();
}


function checkGame() {
    const winner = checkWinner();

    if (winner === "player") {
        showMessage("🎉 Wygrałeś!");
        resetBtn.classList.remove("hidden");
    }

    if (winner === "computer") {
        showMessage("💀 Komputer wygrał!");
        resetBtn.classList.remove("hidden");
    }
}


rollBtn.addEventListener("click", playerMove);

resetBtn.addEventListener("click", () => {
    resetGame();
    updateUI();
    showMessage("");
    resetBtn.classList.add("hidden");
});


updateUI();
