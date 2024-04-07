document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const turnX = document.getElementById("turnX");
    const turnO = document.getElementById("turnO");
    const results = document.getElementById("results");
    const playAgainBtn = document.getElementById("play-again");
    let currentPlayer = "X";
    let boardState = ["", "", "", "", "", "", "", "", ""];

    function checkWin() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }

        if (!boardState.includes("")) {
            return "draw";
        }

        return null;
    }

    function updateTurn() {
        if (currentPlayer === "X") {
            turnX.classList.add("active");
            turnO.classList.remove("active");
        } else {
            turnO.classList.add("active");
            turnX.classList.remove("active");
        }
    }

    function updateBoard() {
        board.innerHTML = "";
        boardState.forEach((value, index) => {
            const box = document.createElement("div");
            box.classList.add("box");
            box.textContent = value;
            box.setAttribute("data-index", index);
            board.appendChild(box);
        });
    }

    function handleBoxClick(event) {
        const index = event.target.getAttribute("data-index");
        if (boardState[index] || checkWin()) {
            return;
        }

        boardState[index] = currentPlayer;
        updateBoard();
        const winner = checkWin();

        if (winner) {
            if (winner === "draw") {
                results.textContent = "It's a draw!";
            } else {
                results.textContent = `Player ${winner} wins!`;
            }
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateTurn();
        }
    }

    function handlePlayAgain() {
        currentPlayer = "X";
        boardState = ["", "", "", "", "", "", "", "", ""];
        results.textContent = "";
        updateTurn();
        updateBoard();
    }

    board.addEventListener("click", handleBoxClick);
    playAgainBtn.addEventListener("click", handlePlayAgain);

    updateTurn();
});
