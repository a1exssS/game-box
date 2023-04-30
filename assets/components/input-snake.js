let inputDirection = {x: 0, y: 0}
let lastInputDirection = {x: 0, y: 0}

window.addEventListener('keydown', e => {
	let k = e.keyCode
	setTimeout(() => {
		if (k == 37 || k == 65) {
			//left
			document.querySelector('.snake__snake').classList.add('left')
			if (lastInputDirection.x !== 0) return
			inputDirection = {x: -1, y: 0}
		} else if (k == 38 || k == 87) {
			//top
			document.querySelector('.snake__snake').classList.add('top')
			if (lastInputDirection.y !== 0) return
			inputDirection = {x: 0, y: -1}
		} else if (k == 39 || k == 68) {
			//right
			document.querySelector('.snake__snake').classList.add('right')
			if (lastInputDirection.x !== 0) return
			inputDirection = {x: 1, y: 0}
		} else if (k == 40 || k == 83) {
			//bottom
			document.querySelector('.snake__snake').classList.add('bottom')
			if (lastInputDirection.y !== 0) return
			inputDirection = {x: 0, y: 1}
		}
	}, 1)
})

function getInputDirection() {
	lastInputDirection = inputDirection
	return inputDirection
}
export {getInputDirection}
