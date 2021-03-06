const grid = document.querySelector('.grid')
const mainSelect = document.getElementById('idmain')
const overlay = document.getElementById('overlay')
const startButton = document.querySelector('#start')
const scoreDisplay = document.querySelector('#score')
const highScoreDisplay = document.querySelector('#highScore')
const arcadeButton = document.querySelector('#arcadeMode')
const sleekButton = document.querySelector('#sleekMode')
const background = document.getElementsByTagName('body')[0]
const movesDisplay = document.getElementById('moves')
// const upArrow = document.getElementById('upButton')
// const downArrow = document.getElementById('downButton')
// const leftArrow = document.getElementById('leftButton')
// const rightArrow = document.getElementById('rightButton')
let overlaySelection = 'overlay-arcade'
const squares = []
let appleIndex = 0
let currentSnake = [2, 1, 0]
let direction = 1
const width = 10
let moves = 0
let score = 0
let highScore = 0
let intervalTime
const speedChange = 0.9
let timerId = 0
let snake = 'arcadeSnake'
let apple = 'arcadeApple'
const appleDelete = [33, 34, 35, 36, 43, 44, 45, 46, 53, 54, 55, 56, 63, 64, 65, 66]

function control (event) {
  if (event.keyCode === 39 && direction !== -1 && direction !== 1) {
    moves++
    direction = 1
    // right
  } else if (event.keyCode === 38 && direction !== width && direction !== -width) {
    moves++
    direction = -width
    // up
  } else if (event.keyCode === 37 && direction !== 1 && direction !== -1) {
    moves++
    direction = -1
    // left
  } else if (event.keyCode === 40 && direction !== -width && direction !== width) {
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

const startGame = () => {
  score = 0
  moves = 0
  currentSnake.forEach(index => squares[index].classList.remove(snake))
  squares[appleIndex].classList.remove(apple)
  clearInterval(timerId)
  currentSnake = [2, 1, 0]
  movesDisplay.textContent = 0
  scoreDisplay.textContent = 0
  direction = 1
  intervalTime = 950
  currentSnake.forEach(index => squares[index].classList.add(snake))
  generateApples()
  timerId = setInterval(move, intervalTime)
  gameOverOff()
}

function move () {
  console.log(direction)
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
    addLength()
  }
}

function addLength () {
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
    } else {
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
  mainSelect.style.color = '#33ff00'

  sleekButton.style.color = '#33ff00'
  sleekButton.style.borderColor = '#33ff00'
  sleekButton.style.backgroundColor = 'black'

  arcadeButton.style.color = '#33ff00'
  arcadeButton.style.borderColor = '#33ff00'
  arcadeButton.style.backgroundColor = 'black'

  startButton.style.color = '#33ff00'
  startButton.style.borderColor = '#33ff00'
  startButton.style.backgroundColor = 'black'
  sleekButton.classList.remove('button-sleek')
  sleekButton.classList.add('button-arcade')
  arcadeButton.classList.remove('button-sleek')
  arcadeButton.classList.add('button-arcade')
  startButton.classList.remove('button-sleek')
  startButton.classList.add('button-arcade')
  overlay.classList.remove(overlaySelection)
  overlaySelection = 'overlay-arcade'
  overlay.classList.add(overlaySelection)
}

function sleekTheme () {
  squares[appleIndex].classList.remove(apple)
  apple = 'sleekApple'
  squares[appleIndex].classList.add(apple)

  currentSnake.forEach(index => squares[index].classList.remove(snake))
  currentSnake.forEach(index => squares[index].classList.remove(apple))
  snake = 'sleekSnake'
  currentSnake.forEach(index => squares[index].classList.add(snake))

  background.style.backgroundColor = '#e6ebe0'
  grid.style.borderColor = '#ed6a5a'
  mainSelect.style.color = '#ed6a5a'
  sleekButton.style.color = '#ed6a5a'
  sleekButton.style.borderColor = '#ed6a5a'
  sleekButton.style.backgroundColor = '#e6ebe0'
  sleekButton.classList.add('button-sleek')
  arcadeButton.style.color = '#ed6a5a'
  arcadeButton.style.borderColor = '#ed6a5a'
  arcadeButton.style.backgroundColor = '#e6ebe0'
  arcadeButton.classList.add('button-sleek')
  startButton.style.color = '#ed6a5a'
  startButton.style.borderColor = '#ed6a5a'
  startButton.style.backgroundColor = '#e6ebe0'
  startButton.classList.add('button-sleek')

  overlay.classList.remove(overlaySelection)
  overlaySelection = 'overlay-sleek'
  overlay.classList.add(overlaySelection)
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
  overlay.style.display = 'block'
  overlay.classList.add(overlaySelection)
}

function gameOverOff () {
  overlay.style.display = 'none'
  overlay.classList.remove(overlaySelection)
}

// mobile buttons

// function upArrowfunction () {
//   direction = -width
// }

// function downArrowfunction () {
//   direction = +width
// }

// function leftArrowfunction () {
//   direction = -1
// }

// function rightArrowfunction () {
//   direction = +1
// }

// upArrow.addEventListener('click', upArrowfunction)
// downArrow.addEventListener('click', downArrowfunction)
// leftArrow.addEventListener('click', leftArrowfunction)
// rightArrow.addEventListener('click', rightArrowfunction)
