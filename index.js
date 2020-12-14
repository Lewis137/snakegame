const grid = document.querySelector('.grid')
const startButton = document.querySelector('#start') // or document.getElementById('start')
const scoreDisplay = document.querySelector('#score') // or document.getElementById('score')
const highScoreDisplay = document.querySelector('#highScore')
const classicButton = document.querySelector('#classicMode')
const sleekButton = document.querySelector('#sleekMode')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let highScore = 0 
let intervalTime = 750
let speedChange = 0.95
let timerId = 0
var snake = 'classicSnake'

function createGrid() {
    for (let i = 0; i < width*width; i++){
    const square = document.createElement('div')
    square.classList.add('square')
    grid.appendChild(square)
    squares.push(square)
    }
}

createGrid()

function classicTheme() {
    currentSnake.forEach(index => squares[index].classList.remove(snake))
    snake = 'classicSnake'
    currentSnake.forEach(index => squares[index].classList.add(snake))
    startGame()
    
}
function changeTheme2() {
    currentSnake.forEach(index => squares[index].classList.remove(snake))
    snake = 'sleekSnake'
    currentSnake.forEach(index => squares[index].classList.add(snake))
    startGame()
}



function startGame() {

    currentSnake.forEach(index => squares[index].classList.remove(snake))
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2,1,0]
    score = 0
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 1000
    
    currentSnake.forEach(index => squares[index].classList.add(snake))
    generateApples()
    timerId = setInterval(move, intervalTime)
}

function move() {
    if (
        (currentSnake[0] + width >= width*width && direction === width) || // bottom
        (currentSnake[0] % width === width-1 && direction === 1) || // right
        (currentSnake[0] % width === 0 && direction === -1) || // left
        (currentSnake[0] - width < 0 && direction === -width) || // up
        squares[currentSnake[0] + direction].classList.contains(snake)

    ) 
    return clearInterval(timerId)

    const tail = currentSnake.pop()
    squares[tail].classList.remove(snake)
    currentSnake.unshift(currentSnake[0] + direction)
    if (squares[currentSnake[0]].classList.contains('apple')){
        squares[tail].classList.add(snake)
        currentSnake.push(tail)
        squares[currentSnake[0]].classList.remove('apple')
        squares[currentSnake[0]].classList.add(snake)
        generateApples()
        score++
        if (score > highScore){
            highScore = score
        } else if (score < highScore) {
            highScore = highScore
        }
        scoreDisplay.textContent = score
        highScoreDisplay.textContent = highScore
        clearInterval(timerId)
        intervalTime = intervalTime * speedChange
        timerId = setInterval(move, intervalTime)
        
    }
    squares[currentSnake[0]].classList.add(snake)
    
}


function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * (width*width))
        
    } while (squares[appleIndex].classList.contains(snake)); (squares[appleIndex].classList.contains('apple'))
    squares[appleIndex].classList.add('apple')
}

generateApples()

function control(e) {
    if (e.keyCode === 39){
        direction = 1 // right
    } else if (e.keyCode === 38) {
        direction = -width // up
    } else if (e.keyCode === 37){
        direction = -1 // left
    } else if (e.keyCode === 40) {
        direction = width // down
    }
}

document.addEventListener('keydown', control)
startButton.addEventListener('click', startGame)
classicButton.addEventListener('click', classicTheme)
sleekButton.addEventListener('click', changeTheme2)
