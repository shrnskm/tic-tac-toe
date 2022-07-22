const createPlayer = (name, marker) => {
    return {name, marker}
};

const gameBoardModule = (() => {
    //create board array
    let board = [];
    for (i = 0; i < 9; i++) {
        board.push("");
    }

    //populate board(create squares)
    let gameGrid = document.querySelector("#gameGrid");
    board.forEach((item, index) => {
        const square = document.createElement("div");
        square.className = "square";
        gameGrid.appendChild(square);
    });

    //add event to each square
    Array.from(gameGrid.children).forEach((square,index) => {
        square.addEventListener("click", () => {

            square.classList.add(gameObject.currentPlayer.marker);
            square.setAttribute("data", gameObject.currentPlayer.marker);
            
            //update board array value to current player's marker
            board[index] = gameObject.currentPlayer.marker;

            //disable event on marked squares
            square.style.pointerEvents = "none";
            square.style.cursor = "none";

            //update remaininf spots
            gameObject.remainingSpots -= 1;
            gameObject.checkWinner();

            if (gameObject.winnerDeclared === false) {
                if (gameObject.remainingSpots > 0) {
                    gameObject.alertNextPlayer();
                    gameObject.nextPlayer();
                } else if (gameObject.remainingSpots === 0) {
                    gameObject.declareTie();
                }
            }
        })
    });

    const resetBtn = document.querySelector("#resetBtn");
    resetBtn.addEventListener("click", () => {
        window.location.reload(true);
    });

    return {board,};
})();


const gameObject = (() => {
    //create players
    const playerOne = createPlayer("Player 1", "alien");
    const playerTwo = createPlayer("Player 2", "ufo");

    let currentPlayer = playerOne;
    let winnerDeclared = false;
    let remainingSpots = 9;

    let subtext = document.querySelector("#subtext");
    let playerName = document.querySelector("#playerName");
    
    //array of winning combinations
    const winArrays = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function checkWinner() {
        winArrays.forEach((item, index) => {
            if (gameBoardModule.board[item[0]] === this.currentPlayer.marker 
        && gameBoardModule.board[item[1]] === this.currentPlayer.marker 
        && gameBoardModule.board[item[2]] === this.currentPlayer.marker) {
                console.log("winner!");
                subtext.innerHTML = `${this.currentPlayer.name} wins!`;
                this.winnerDeclared = true;
            };
        });
    };
    
    function alertNextPlayer() {
        this.currentPlayer === playerOne ? playerName.textContent = "Player 2" : playerName.textContent = "Player 1";
    };

    function nextPlayer() {
        // if (gameObject.currentPlayer === playerOne) {
        //     gameObject.currentPlayer = playerTwo;
        // } else {
        //     gameObject.currentPlayer = playerOne;
        // };
        this.currentPlayer = this.currentPlayer === playerOne ? playerTwo : playerOne;
        console.log("current player: " + this.currentPlayer.name);
    };

    function declareTie() {
        subtext.innerHTML = "Tie game!";
    };

    return { 
        currentPlayer, 
        remainingSpots,
        winnerDeclared,
        checkWinner,
        alertNextPlayer,
        nextPlayer,
        declareTie,
    };

})();

