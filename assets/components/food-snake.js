import {onSnake, expandSnake} from './snake'

const gridSize = 35
const expansionRate = 1
let food = getRandomFoodPosition()

function update() {
	if (onSnake(food)) {
		expandSnake(expansionRate)
		food = getRandomFoodPosition()
	}
}
function draw(gameBoard) {
	const foodElement = document.createElement('div')
	foodElement.style.gridRowStart = food.y
	foodElement.style.gridColumnStart = food.x
	foodElement.classList.add('snake__food')
	gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
	let newFoodPostion
	while (newFoodPostion == null || onSnake(newFoodPostion)) {
		newFoodPostion = randomGridPosition()
	}
	return newFoodPostion
}

function randomGridPosition() {
	return {
		x: Math.floor(Math.random() * gridSize) + 1,
		y: Math.floor(Math.random() * gridSize) + 1,
	}
}

export {update, draw, gridSize, randomGridPosition}
