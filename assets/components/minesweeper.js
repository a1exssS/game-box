export const tileStatuses = {
	hidden: 'hidden',
	mine: 'mine',
	number: 'number',
	marked: 'marked',
}

export function createBoard(boardSize, numbersOfMines) {
	const board = []

	const minePositions = getMinePosition(boardSize, numbersOfMines)
	for (let x = 0; x < boardSize; x++) {
		const row = []
		for (let y = 0; y < boardSize; y++) {
			const element = document.createElement('div')
			element.dataset.status = tileStatuses.hidden

			const tile = {
				element,
				x,
				y,
				get status() {
					return this.element.dataset.status
				},
				set status(value) {
					this.element.dataset.status = value
				},
				mine: minePositions.some(pos =>
					positionMatch(pos, {
						x,
						y,
					})
				),
			}
			row.push(tile)
		}
		board.push(row)
	}
	return board
}

function getMinePosition(boardSize, numbersOfMines) {
	const positions = []

	while (positions.length < numbersOfMines) {
		const position = {
			x: randomNumber(boardSize),
			y: randomNumber(boardSize),
		}

		if (!positions.some(pos => positionMatch(pos, position))) {
			positions.push(position)
		}
	}

	return positions
}

function positionMatch(a, b) {
	return a.x === b.x && a.y === b.y
}

function randomNumber(boardSize) {
	return Math.floor(Math.random() * boardSize)
}

export function markTile(tile) {
	if (tile.status !== tileStatuses.hidden && tile.status !== tileStatuses.marked) {
		return
	}

	if (tile.status === tileStatuses.marked) {
		tile.status = tileStatuses.hidden
	} else {
		tile.status = tileStatuses.marked
	}
}

export function revealTile(board, tile) {
	if (tile.status !== tileStatuses.hidden) {
		return
	}
	if (tile.mine) {
		tile.status = tileStatuses.mine
		return
	}

	tile.status = tileStatuses.number
	const adjacentTiles = nearbyTiles(board, tile)
	const mines = adjacentTiles.filter(tile => tile.mine)

	if (mines.length === 0) {
		adjacentTiles.forEach(revealTile.bind(null, board))
	} else {
		tile.element.textContent = mines.length
	}
}

function nearbyTiles(board, {x, y}) {
	const tiles = []

	for (let xOffset = -1; xOffset <= 1; xOffset++) {
		for (let yOffset = -1; yOffset <= 1; yOffset++) {
			const tile = board[x + xOffset]?.[y + yOffset]

			if (tile) tiles.push(tile)
		}
	}

	return tiles
}

export function checkLose(board) {
	return board.some(row => {
		return row.some(tile => {
			return tile.status == tileStatuses.mine
		})
	})
}

export function checkWin(board) {
	return board.every(row => {
		return row.every(tile => {
			return tile.status === tileStatuses.number || (tile.mine && (tile.status == tileStatuses.hidden || tile.status === tileStatuses.marked))
		})
	})
}
