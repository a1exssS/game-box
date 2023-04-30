import {snakeSpeed, update as updateSnake, draw as drawSnake, snakeBody, onSnake} from './snake'
import {update as updateFood, draw as drawFood, gridSize} from './food-snake'
if (document.querySelector('.main-snake')) {
	let lastRenderTime = 0
	let gameOver = false
	const gameBoard = document.getElementById('game-board')

	document.querySelector('.snake__btn').addEventListener('click', () => {
		window.location.reload()
	})
	function main(currentTime) {
		if (gameOver) {
			document.querySelector('.snake__gameover').style.display = 'flex'
			return
		}

		window.requestAnimationFrame(main)
		const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
		if (secondsSinceLastRender < 1 / snakeSpeed) return

		lastRenderTime = currentTime

		update()
		draw()
	}

	window.requestAnimationFrame(main)

	function update() {
		updateSnake()
		updateFood()
		checkDeath()
	}
	function draw() {
		gameBoard.innerHTML = ''
		drawSnake(gameBoard)
		drawFood(gameBoard)
	}

	function checkDeath() {
		gameOver = outSideGrid(getSnakeHead()) || snakeIntersection()
	}

	function outSideGrid(position) {
		return position.x < 1 || position.x > gridSize || position.y < 1 || position.y > gridSize
	}

	function getSnakeHead() {
		return snakeBody[0]
	}

	function snakeIntersection() {
		return onSnake(snakeBody[0], {ignoreHead: true})
	}
}
