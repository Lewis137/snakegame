const grid = document.querySelector('.grid')
const startButton = document.querySelector('#start')
const scoreDisplay = document.querySelector('#score')
const highScoreDisplay = document.querySelector('#highScore')
const arcadeButton = document.querySelector('#arcadeMode')
const sleekButton = document.querySelector('#sleekMode')
const background = document.getElementsByTagName('body')[0]
const movesDisplay = document.getElementById('moves')

let squares = []
var appleIndex = 0
let currentSnake = [2, 1, 0]
let direction = 1
const width = 10
var moves = 0

let score = 0
let highScore = 0
let intervalTime = 750
let speedChange = 0.95
let timerId = 0
var snake = 'arcadeSnake'
var apple = 'arcadeApple'
let appleDelete = [
  33,
  34,
  35,
  36,
  43,
  44,
  45,
  46,
  53,
  54,
  55,
  56,
  63,
  64,
  65,
  66
]

function control (e) {
  if (e.keyCode === 39) {
    moves++
    direction = 1
    // right
  } else if (e.keyCode === 38) {
    moves++
    direction = -width
    // up
  } else if (e.keyCode === 37) {
    moves++
    direction = -1
    // left
  } else if (e.keyCode === 40) {
    moves++
    direction = width
    // down
  }
}

function createGrid () {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    grid.appendChild(square)
    squares.push(square)
  }
}

createGrid()

function startGame () {
  score = 0
  moves = 0
  currentSnake.forEach(index => squares[index].classList.remove(snake))
  squares[appleIndex].classList.remove(apple)
  clearInterval(timerId)
  currentSnake = [2, 1, 0]
  movesDisplay.textContent = 0
  scoreDisplay.textContent = 0
  direction = 1
  intervalTime = 1000
  currentSnake.forEach(index => squares[index].classList.add(snake))
  generateApples()
  timerId = setInterval(move, intervalTime)
  gameOverOff()
}

function move () {
  if (
    (currentSnake[0] + width >= width * width && direction === width) || // bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || // right
    (currentSnake[0] % width === 0 && direction === -1) || // left
    (currentSnake[0] - width < 0 && direction === -width) || // up
    squares[currentSnake[0] + direction].classList.contains(snake)
  ) {
    appleRemove()
    gameOverOn()
    return clearInterval(timerId)
  } else {
    const tail = currentSnake.pop()
    squares[tail].classList.remove(snake)
    currentSnake.unshift(currentSnake[0] + direction)
    movesDisplay.textContent = moves
    if (squares[currentSnake[0]].classList.contains(apple)) {
      squares[tail].classList.add(snake)
      currentSnake.push(tail)
      squares[currentSnake[0]].classList.remove(apple)
      squares[currentSnake[0]].classList.add(snake)
      generateApples()
      score++
      if (score > highScore) {
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
}

function generateApples () {
  do {
    appleIndex = Math.floor(Math.random() * (width * width))
  } while (squares[appleIndex].classList.contains(snake))
  squares[appleIndex].classList.contains(apple)
  squares[appleIndex].classList.add(apple)
}

function arcadeTheme () {
  squares[appleIndex].classList.remove(apple)
  apple = 'arcadeApple'

  squares[appleIndex].classList.add(apple)

  currentSnake.forEach(index => squares[index].classList.remove(snake))
  currentSnake.forEach(index => squares[index].classList.remove(apple))
  snake = 'arcadeSnake'
  currentSnake.forEach(index => squares[index].classList.add(snake))

  background.style.backgroundColor = 'black'
  grid.style.borderColor = '#33ff00'
}

function sleekTheme () {
  squares[appleIndex].classList.remove(apple)
  apple = 'sleekApple'
  squares[appleIndex].classList.add(apple)

  currentSnake.forEach(index => squares[index].classList.remove(snake))
  currentSnake.forEach(index => squares[index].classList.remove(apple))
  snake = 'sleekSnake'
  currentSnake.forEach(index => squares[index].classList.add(snake))
  background.style.backgroundColor = 'white'
  grid.style.borderColor = 'black'
}

document.addEventListener('keydown', control)
startButton.addEventListener('click', startGame)
arcadeButton.addEventListener('click', arcadeTheme)
sleekButton.addEventListener('click', sleekTheme)

function appleRemove () {
  if (appleDelete.includes(appleIndex)) {
    squares[appleIndex].classList.remove(apple)
    appleIndex = 44
  } else {
  }
}

function gameOverOn () {
  document.getElementById('overlay').style.display = 'block'
}

function gameOverOff () {
  document.getElementById('overlay').style.display = 'none'
}
