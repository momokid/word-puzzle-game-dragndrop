const jumbledWords = document.querySelectorAll('#jumbledWordsWrapper > span');
const orderedWords = document.querySelectorAll('#orderedWordsWrapper > span');
const anyMoveId = document.getElementById('trials')
const correctMoveId = document.getElementById('correctMove')
const remMoveId = document.getElementById('remMoves')
let draggedElemId


console.log(jumbledWords)

let counter = {
    allMoves:0,
    correctMoves:0,
    maxTries:jumbledWords.length,
    remMove:jumbledWords.length
}

remMoveId.textContent = counter.remMove;

//console.log(`All Moves: ${counter.allMoves}, Correct Moves: ${counter.correctMoves}, maximum trials: ${counter.maxTries}`)

//console.log(jumbledWordsWrapper.length)

console.log('jumbled words: ', jumbledWords)
console.log('ordered words: ', orderedWords)

//Loop through each span element in jumbled word wrappers div
jumbledWords.forEach(el => {
    el.addEventListener('dragstart', dragStarHandler);
    el.addEventListener('dragend', dragEndHandler)
})

function dragStarHandler(e){
    draggedElemId = e.target
    e.dataTransfer.setData('text', e.target.getAttribute('data-source-id'))

    console.log(draggedElemId)
    

}

//Loop through elements in the ordered words div
orderedWords.forEach( e =>{
    e.addEventListener('dragenter', dragEnterHandler);
    e.addEventListener('dragover', dragOverHandler)
    e.addEventListener('dragleave', dragLeaveHandler)
    e.addEventListener('drop', dropHandler)

})

function dragEndHandler(e){
    e.preventDefault();
}


function dragEnterHandler(e){

}

function dragOverHandler(e){
    e.preventDefault();
}

function dragLeaveHandler(e){

}

function dropHandler(e){
    e.preventDefault();
    
    const dataSourceId = e.dataTransfer.getData('text')
    const dataTargetId = e.target.getAttribute('data-target-id')
    //console.warn(dataSourceId, dataTargetId);
    anyMoveId.innerHTML = addAnyMove();

    if(dataSourceId === dataTargetId){
        e.target.insertAdjacentHTML('afterbegin', dataSourceId)
        e.target.style = "border:5px dashed red"
        draggedElemId.style= "background-color: red"
        draggedElemId.setAttribute('draggable',false)
        
        correctMoveId.innerHTML = addCorrectMove();

    }

    console.log(`MAx tries: ${counter.maxTries},Any move: ${counter.allMoves}`)

    if(counter.maxTries < counter.allMoves){
        alert('Game over.')
        jumbledWords.setAttribute('disabled','disabled')
    }
}

function stopGame(maxMove, anyMove){
    if(maxMove === anyMove){
        alert("Game ended")
    }
}

function addAnyMove(){
    return ++counter.allMoves;
}

function addCorrectMove(){
    let correct_move_counter = ++counter.correctMoves;

    return correct_move_counter
}