import {createBoard, markTile, tileStatuses, revealTile, checkWin, checkLose} from './minesweeper'

if (document.querySelector('.main-minesweeper')) {
	document.querySelector('.minesweeper__subtitle').style.display = 'none'
	document.querySelector('.minesweeper__board').style.display = 'none'

	document.querySelector('.minesweeper__play').addEventListener('click', () => {
		const boardSize = Number(document.querySelector('#field').value)
		const numberOfMines = Number(document.querySelector('#mine').value)
		document.querySelector('.minesweeper__board').style.display = 'inline-grid'
		document.querySelector('.minesweeper__subtitle').style.display = 'block'
		document.querySelectorAll('.minesweeper__input').forEach(item => {
			item.style.display = 'none'
		})
		document.querySelectorAll('label').forEach(item => {
			item.style.display = 'none'
		})
		const board = createBoard(boardSize, numberOfMines)
		const boardElement = document.querySelector('.minesweeper__board')

		const minesCounter = document.querySelector('[data-mines]')

		const messageText = document.querySelector('.minesweeper__subtitle')

		document.querySelector('[data-mines]').textContent = numberOfMines
		document.querySelector('.minesweeper__container').style.width = `calc(${boardSize} * 60px + 100px)`
		document.querySelector('.minesweeper__container').style.maxWidth = `calc(${boardSize} * 60px + 100px)`

		boardElement.style.setProperty('--size', boardSize)

		board.forEach(row => {
			row.forEach(tile => {
				boardElement.append(tile.element)
				tile.element.addEventListener('click', () => {
					revealTile(board, tile)
					checkGameEnd()
				})
				tile.element.addEventListener('contextmenu', e => {
					e.preventDefault()
					markTile(tile)
					listMines()
				})
			})
		})

		function listMines() {
			const count = board.reduce((count, row) => {
				return (
					count +
					row.filter(tile => {
						return tile.status == tileStatuses.marked
					}).length
				)
			}, 0)

			minesCounter.textContent = numberOfMines - count
		}

		function checkGameEnd() {
			const win = checkWin(board)
			const lose = checkLose(board)

			if (win || lose) {
				boardElement.addEventListener('click', stopProp, {
					capture: true,
				})
				boardElement.addEventListener('contextmenu', stopProp, {
					capture: true,
				})
			}

			if (win) {
				messageText.textContent = `You Win`
				alert('You Won')
			}
			if (lose) {
				messageText.textContent = `You Lose`
				board.forEach(row => {
					row.forEach(tile => {
						if (tile.status === tileStatuses.marked) {
							markTile(tile)
						}

						if (tile.mine) {
							revealTile(board, tile)
						}
					})
				})
				alert('You Lost')
			}
		}

		function stopProp(e) {
			e.stopImmediatePropagation()
		}
		reloadTheGame()
	})

	function reloadTheGame() {
		document.querySelector('.minesweeper__play').textContent = 'reload'
		document.querySelector('.minesweeper__play').addEventListener('click', () => {
			window.location.reload()
		})
	}
}
