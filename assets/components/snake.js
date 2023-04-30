import {getInputDirection} from './input-snake'

const snakeSpeed = 10
let newSegments = 0

const snakeBody = [{x: 17, y: 17}]

function update() {
	addSegments()
	const inputDirection = getInputDirection()
	for (let i = snakeBody.length - 2; i >= 0; i--) {
		snakeBody[i + 1] = {...snakeBody[i]}
	}

	snakeBody[0].x += inputDirection.x
	snakeBody[0].y += inputDirection.y
}
function draw(gameBoard) {
	snakeBody.forEach(segment => {
		const snakeElement = document.createElement('div')
		snakeElement.style.gridRowStart = segment.y
		snakeElement.style.gridColumnStart = segment.x
		snakeElement.classList.add('snake__snake')
		gameBoard.appendChild(snakeElement)
	})
}
function onSnake(position, {ignoreHead = false} = {}) {
	return snakeBody.some((segment, index) => {
		if (ignoreHead && index == 0) return false
		return equalPositions(segment, position)
	})
}

function equalPositions(position1, position2) {
	return position1.x === position2.x && position1.y === position2.y
}

function expandSnake(amount) {
	newSegments += amount
}

function addSegments() {
	for (let i = 0; i < newSegments; i++) {
		snakeBody.push({...snakeBody[snakeBody.length - 1]})
	}
	newSegments = 0
}

export {snakeSpeed, update, draw, onSnake, expandSnake, snakeBody}
