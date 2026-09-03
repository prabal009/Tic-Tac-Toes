//making tic tac toe game

let box = document.querySelectorAll(".box");
let btn = document.querySelector("#reset");
let newgame = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let winningLine = document.querySelector("#winning-line");

let turn0 = true;
let count = 0;

const win = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];


const getCellCenter = (index) => {
    const cell = box[index];
    const gameWrapper = document.querySelector('.game-wrapper');
    if (!gameWrapper || !cell) {
        console.error("Game wrapper or cell not found");
        return { x: 0, y: 0 };
    }
    const wrapperRect = gameWrapper.getBoundingClientRect();
    const cellRect = cell.getBoundingClientRect();
    return {
        x: (cellRect.left + cellRect.width / 2) - wrapperRect.left,
        y: (cellRect.top + cellRect.height / 2) - wrapperRect.top
    };
};


const drawWinningLine = (pattern) => {
    if (!winningLine) {
        console.error("Winning line element not found!");
        return;
    }
    
    const pos1 = getCellCenter(pattern[0]);
    const pos2 = getCellCenter(pattern[1]);
    const pos3 = getCellCenter(pattern[2]);
    const line = document.querySelector("#winning-line line");
    
    if (!line) {
        console.error("Line element not found!");
        return;
    }
    
    line.setAttribute("x1", pos1.x);
    line.setAttribute("y1", pos1.y);
    line.setAttribute("x2", pos3.x);
    line.setAttribute("y2", pos3.y);
    
    winningLine.classList.add("show");
    line.style.animation = "none";
    line.offsetHeight;
    line.style.animation = "drawLine 0.6s ease forwards";
};


const clearWinningLine = () => {
    if (!winningLine) {
        console.error("Winning line element not found!");
        return;
    }
    winningLine.classList.remove("show");
    const line = document.querySelector("#winning-line line");
    if (line) {
        line.setAttribute("x1", "0");
        line.setAttribute("y1", "0");
        line.setAttribute("x2", "0");
        line.setAttribute("y2", "0");
    }
};

const resetgame = () => {
    turn0 = true;
    count = 0;
    enableboxes();
    msgcontainer.classList.add("hide");
    clearWinningLine();
};

box.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return;
        console.log("box was clicked");
        if (turn0) {
            box.innerText = "◯";
            turn0 = false;
        } else {
            box.innerText = "✕";
            turn0 = true;
        }
        box.disabled = true;
        count++;
        let iswinner = checkwinner();
        if (count == 9 && !iswinner) {
            gamedraw();
        }
    });
});

const gamedraw = () => {
    msg.innerText = "Game was a Draw";
    msgcontainer.classList.remove("hide");
    disableboxes();
};

const disableboxes = () => {
    for (let b of box) {
        b.disabled = true;
    }
};

const enableboxes = () => {
    for (let b of box) {
        b.disabled = false;
        b.innerText = "";
    }
};

const showWinner = (winner, pattern) => {
    msg.innerText = "🎉 Congratulations! Winner is " + winner;
    msgcontainer.classList.remove("hide");
    disableboxes();
    drawWinningLine(pattern);
};

const checkwinner = () => {
    for (let pattern of win) {
        let pos1 = box[pattern[0]].innerText;
        let pos2 = box[pattern[1]].innerText;
        let pos3 = box[pattern[2]].innerText;
        
        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 == pos2 && pos2 == pos3) {
                showWinner(pos1, pattern);
                return true;
            }
        }
    }
    return false;
};

newgame.addEventListener("click", resetgame);
btn.addEventListener("click", resetgame);