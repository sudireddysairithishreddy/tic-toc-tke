document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const messageDisplay = document.getElementById('game-message');
    const resetButton = document.getElementById('reset-button');

    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const displayMessage = (msg) => {
        messageDisplay.textContent = msg;
    };

    const handleCellClick = (clickedCellEvent) => {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameBoard[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        updateCellStyling(clickedCell, currentPlayer);

        handleResultValidation();
    };

    const updateCellStyling = (cell, player) => {
        if (player === 'X') {
            cell.classList.add('x');
        } else {
            cell.classList.add('o');
        }
    };

    const handleResultValidation = () => {
        let roundWon = false;
        let winningCombination = null;

        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameBoard[winCondition[0]];
            let b = gameBoard[winCondition[1]];
            let c = gameBoard[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                winningCombination = winCondition;
                break;
            }
        }

        if (roundWon) {
            displayMessage(`${currentPlayer} has won!`);
            gameActive = false;
            highlightWinningCells(winningCombination);
            return;
        }

        let roundDraw = !gameBoard.includes('');
        if (roundDraw) {
            displayMessage(`Game ended in a draw!`);
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        displayMessage(`It's ${currentPlayer}'s turn`);
    };

    const highlightWinningCells = (condition) => {
        condition.forEach(index => {
            cells[index].classList.add('winning-cell');
        });
    };

    const handleRestartGame = () => {
        gameActive = true;
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        displayMessage(`It's ${currentPlayer}'s turn`);

        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning-cell');
        });
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', handleRestartGame);

    displayMessage(`It's ${currentPlayer}'s turn`);
});