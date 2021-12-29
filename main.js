let currentPlayer = "🐵";
let activeTurn = true;
let playingGrid = ["", "", "", "", "", "", "", "", ""];
let resetButton = document.querySelector(".resetbutton");
//let winningMessage = document.querySelector(".winning-item")
let statusShow = document.querySelector(".status")
let winningShowup = document.querySelector(".winning-item")

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;




//start game
function resetGame(){
    activeTurn = true;
    playingGrid= ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll(".grid-item").forEach(element => {
        element.innerHTML= ""
    })
}


resetButton.addEventListener("click", resetGame);

let grid = document.querySelector(".grid-container");







// change turns to make sure the next click is not the same emo
function changeTurn(){
    if(currentPlayer ==="🐵"){
        return currentPlayer = "🐸";

    }else if(currentPlayer ==="🐸") {
        return currentPlayer ="🐵";
    }  
    


}
changeTurn();


// update grid once click 
function placeEmo(clickedcell,clickedIndex){
  //let clickedIndex1 = clickedcell.getAttribute('data-of');
    // console.log(clickedIndex);
    // console.log(clickedcell)
    playingGrid[clickedIndex] = currentPlayer;
   // playingGrid.splice(clickedIndex,1, currentPlayer)
  //  console.log(playingGrid)
    if(clickedcell.innerHTML.length == 0){
        clickedcell.innerHTML = currentPlayer;
        // console.log(playingGrid)
        changeTurn();

    }

}

// create the winning condition
let winningMatrix = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 3, 6], 
    [0, 4, 8], 
    [2, 4, 6]
]

function winningDecision(){
  //  console.log("winningDecision")
    let winningShow = false;
    for(let i=0; i< winningMatrix.length; i++){
        let winningcondition = winningMatrix[i];
        let a = playingGrid[winningcondition[0]];
        let b = playingGrid[winningcondition[1]];
        let c = playingGrid[winningcondition[2]];
        
        if(a ===""||b===""||c===""){
    //        console.log("no winner")
            // console.log(playingGrid)
            // console.log(winningcondition)
            // console.log(a)
            // console.log(b)
            // console.log(c)
            continue;
        }
        if(a ===b && b===c){
            winningShow =true;
            // console.log("winner")
            // console.log(playingGrid)
            // console.log(winningcondition)
            // console.log(a)
            // console.log(b)
            // console.log(c)
            break;
        }
    }
if (winningShow){

    statusShow.innerHTML = winningMessage();

    activeTurn = false;
    return;
    }

let draw = !playingGrid.includes("");
if (draw){
    statusShow.innerHTML = drawMessage();
    activeTurn = false;
    return;
}
changeTurn();
}


// create click to show the result 
function clickGrid(event){
    //console.log(event);
    let clickedcell = event.target
    //console.log(event.target);
    //console.log(event.target.dataset.of);

let clickedIndex = parseInt(clickedcell.getAttribute("data-of"));
if(playingGrid[clickedIndex] !=="" || !activeTurn){
    return; 
}

   placeEmo(clickedcell,clickedIndex)
   changeTurn()
   winningDecision();


}
    
grid.addEventListener("click",clickGrid);


