import Pacman from './pacman'
import Ghost from './pacman-ghosts'

if (false) {
}
const canvas = document.getElementById('canvas')
const canvasContext = canvas.getContext('2d')
const pacmanFrames = document.getElementById('animation')
const ghostFrames = document.getElementById('ghosts')
const createRect = (x, y, width, height, color) => {
	canvasContext.fillStyle = color
	canvasContext.fillRect(x, y, width, height)
}

let fps = 30
let oneBlockSize = 20
let pacman
let wallColor = '#fff'
let wallSpaceWidth = oneBlockSize / 2
let wallOffset = (oneBlockSize - wallSpaceWidth) / 2
let wallInnerColor = 'black'
let foodColor = '#fff'
let ghosts = []
let ghostCount = 4
let lives = 3
let foodCount = 0

let ghostsLocations = [
	{
		x: 0,
		y: 0,
	},
	{
		x: 176,
		y: 0,
	},
	{
		x: 0,
		y: 121,
	},
	{
		x: 176,
		y: 121,
	},
]

const directionRight = 4
const directionUp = 3
const directionLeft = 2
const directionBottom = 1

let map = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
	[1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
	[1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
	[1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
	[0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
	[1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
	[0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
	[1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
	[1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
	[1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
	[1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
	[1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

for (let i = 0; i < map.length; i++) {
	for (let j = 0; j < map[0].length; j++) {
		if (map[i][j] === 2) {
			foodCount++
		}
	}
}

const randomTargetForGhosts = [
	{x: 1 * oneBlockSize, y: 1 * oneBlockSize},
	{x: 1 * oneBlockSize, y: (map.length - 2) * oneBlockSize},
	{x: (map[0].length - 2) * oneBlockSize, y: oneBlockSize},
	{x: (map[0].length - 2) * oneBlockSize, y: (map.length - 2) * oneBlockSize},
]

function createNewPacman() {
	pacman = new Pacman(oneBlockSize, oneBlockSize, oneBlockSize, oneBlockSize, oneBlockSize / 5)
}
const gameLoop = () => {
	draw()
	update()
}

const gameInterval = setInterval(gameLoop, 1000 / fps)

const update = () => {
	pacman.moveProcess()
	pacman.eat()
	for (let i = 0; i < ghosts.length; i++) {
		ghosts[i].moveProcess()
	}
	if (pacman.checkGhostCollision()) {
		restartGame()
	}
	if (score >= foodCount) {
		drawWin()
		clearInterval(gameInterval)
	}
}

const drawLives = () => {
	canvasContext.font = '500 25px Montserrat'
	canvasContext.fillStyle = 'white'
	canvasContext.fillText(`Lives:`, 200, oneBlockSize * map.length + 30)
	for (let i = 0; i < lives; i++) {
		canvasContext.drawImage(pacmanFrames, 2 * oneBlockSize, 0, oneBlockSize, oneBlockSize, 270 + i * oneBlockSize, oneBlockSize * map.length + 12, oneBlockSize, oneBlockSize)
	}
}

const restartGame = () => {
	createNewPacman()
	createGhosts()
	lives--
	if (lives == 0) {
		document.querySelector('.pacman__reload').style.display = 'block'
		gameOver()
	}
}
const gameOver = () => {
	drawGameOver()
	clearInterval(gameInterval)
}

const drawGameOver = () => {
	canvasContext.font = 'bold 50px Montserrat'
	canvasContext.fillStyle = 'red'
	canvasContext.fillText(`Game Over`, 80, 250)
}

const drawWin = () => {
	canvasContext.font = 'bold 50px Montserrat'
	canvasContext.fillStyle = 'darkgreen'
	canvasContext.fillText(`You Won`, 80, 250)
	document.querySelector('.pacman__reload').style.display = 'block'
}

let score = 0
function scoreAdd() {
	return score++
}
function drawScore() {
	canvasContext.font = '500 25px Montserrat '
	canvasContext.marginTop = '20px'
	canvasContext.fillStyle = 'white'
	canvasContext.fillText(`Score: ${score}`, 0, oneBlockSize * map.length + 30)
}

const createGhosts = () => {
	ghosts = []
	for (let i = 0; i < ghostCount; i++) {
		let newGhost = new Ghost(9 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize, 10 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize, oneBlockSize, oneBlockSize, pacman.speed / 2, ghostsLocations[i % 4].x, ghostsLocations[i % 4].y, 124, 116, 6 + i)
		ghosts.push(newGhost)
	}
}

const drawFoods = () => {
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[0].length; j++) {
			if (map[i][j] == 2) {
				createRect(j * oneBlockSize + oneBlockSize / 3, i * oneBlockSize + oneBlockSize / 3, oneBlockSize / 3, oneBlockSize / 3, foodColor)
			}
		}
	}
}

const drawGhosts = () => {
	for (let i = 0; i < ghosts.length; i++) {
		ghosts[i].draw()
	}
}

const draw = () => {
	createRect(0, 0, canvas.width, canvas.height, 'black')
	drawWalls()
	drawFoods()
	pacman.draw()
	drawScore()
	drawGhosts()
	drawLives()
}

const drawWalls = () => {
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[0].length; j++) {
			if (map[i][j] == 1) {
				createRect(j * oneBlockSize, i * oneBlockSize, oneBlockSize, oneBlockSize, wallColor)
			}
			if (j > 0 && map[i][j - 1] == 1) {
				createRect(j * oneBlockSize, i * oneBlockSize + wallOffset, wallSpaceWidth + wallOffset, wallSpaceWidth, wallInnerColor)
			}
			if (j < map[0].length - 1 && map[i][j + 1] == 1) {
				createRect(j * oneBlockSize + wallOffset, i * oneBlockSize + wallOffset, wallSpaceWidth + wallOffset, wallSpaceWidth, wallInnerColor)
			}
			if (i > 0 && map[i - 1][j] == 1) {
				createRect(j * oneBlockSize + wallOffset, i * oneBlockSize, wallSpaceWidth, wallSpaceWidth + wallOffset, wallInnerColor)
			}
			if (i < map.length - 1 && map[i + 1][j] == 1) {
				createRect(j * oneBlockSize + wallOffset, i * oneBlockSize + wallOffset, wallSpaceWidth, wallSpaceWidth + wallOffset, wallInnerColor)
			}
		}
	}
}

createNewPacman()
createGhosts()
gameLoop()

window.addEventListener('keydown', event => {
	let k = event.keyCode
	setTimeout(() => {
		if (k == 37 || k == 65) {
			pacman.nextDirection = directionLeft
		} else if (k == 38 || k == 87) {
			pacman.nextDirection = directionUp
		} else if (k == 39 || k == 68) {
			pacman.nextDirection = directionRight
		} else if (k == 40 || k == 83) {
			pacman.nextDirection = directionBottom
		}
	}, 1)
})

export {directionRight, directionUp, directionLeft, directionBottom, map, oneBlockSize, canvasContext, canvas, pacmanFrames, ghostFrames, randomTargetForGhosts, pacman, ghosts, scoreAdd}
