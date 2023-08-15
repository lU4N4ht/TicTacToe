const boxes = document.querySelectorAll(".box");
let checkturn = true;
const Mustang = "X";
const Tequila = "O";
const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];
document.addEventListener("click", (event) => {
    if (event.target.matches(".box")) {
        play(event.target.id);
    }
});

function play(id) {
    const box = document.getElementById(id);
    turn = checkturn ? Mustang : Tequila;
    box.textContent = turn;
    box.classList.add(turn);
    checkWinner(turn);
}

function checkWinner(turn) {
    const winner = combinations.some((comb) => {
        return comb.every((index) => {
            return boxes[index].classList.contains(turn);

        })
    })
    if (winner) {
        endGame(turn)
    } else if (checkTie()) {
        endGame();
    } else {
        checkturn = !checkturn;
    }
}
function checkTie() {
    let X = 0
    let O = 0
    for (index in boxes) {
        if (!isNaN(index)) {
            if (boxes[index].classList.contains(Mustang)) {
                X++;
            }
            if (boxes[index].classList.contains(Tequila)) {
                O++;
            }

        }
    }

    return X + O === 9 ? true : false
}
function endGame(winner = null) {
    if (winner) {
        console.log('VOCE VENCEU ' + winner)
    } else {
        console.log('EMPATE')
    }
} 