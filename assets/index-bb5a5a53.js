;(function () {
	const e = document.createElement('link').relList
	if (e && e.supports && e.supports('modulepreload')) return
	for (const i of document.querySelectorAll('link[rel="modulepreload"]')) o(i)
	new MutationObserver(i => {
		for (const c of i) if (c.type === 'childList') for (const r of c.addedNodes) r.tagName === 'LINK' && r.rel === 'modulepreload' && o(r)
	}).observe(document, {childList: !0, subtree: !0})
	function n(i) {
		const c = {}
		return i.integrity && (c.integrity = i.integrity), i.referrerPolicy && (c.referrerPolicy = i.referrerPolicy), i.crossOrigin === 'use-credentials' ? (c.credentials = 'include') : i.crossOrigin === 'anonymous' ? (c.credentials = 'omit') : (c.credentials = 'same-origin'), c
	}
	function o(i) {
		if (i.ep) return
		i.ep = !0
		const c = n(i)
		fetch(i.href, c)
	}
})()
document.querySelector('.footer__copyright').textContent = `© Copyright Termly ${new Date().getFullYear()}`
const d = {hidden: 'hidden', mine: 'mine', number: 'number', marked: 'marked'}
function Q(t, e) {
	const n = [],
		o = V(t, e)
	for (let i = 0; i < t; i++) {
		const c = []
		for (let r = 0; r < t; r++) {
			const h = document.createElement('div')
			h.dataset.status = d.hidden
			const y = {
				element: h,
				x: i,
				y: r,
				get status() {
					return this.element.dataset.status
				},
				set status(p) {
					this.element.dataset.status = p
				},
				mine: o.some(p => A(p, {x: i, y: r})),
			}
			c.push(y)
		}
		n.push(c)
	}
	return n
}
function V(t, e) {
	const n = []
	for (; n.length < e; ) {
		const o = {x: O(t), y: O(t)}
		n.some(i => A(i, o)) || n.push(o)
	}
	return n
}
function A(t, e) {
	return t.x === e.x && t.y === e.y
}
function O(t) {
	return Math.floor(Math.random() * t)
}
function G(t) {
	;(t.status !== d.hidden && t.status !== d.marked) || (t.status === d.marked ? (t.status = d.hidden) : (t.status = d.marked))
}
function F(t, e) {
	if (e.status !== d.hidden) return
	if (e.mine) {
		e.status = d.mine
		return
	}
	e.status = d.number
	const n = Z(t, e),
		o = n.filter(i => i.mine)
	o.length === 0 ? n.forEach(F.bind(null, t)) : (e.element.textContent = o.length)
}
function Z(t, {x: e, y: n}) {
	var i
	const o = []
	for (let c = -1; c <= 1; c++)
		for (let r = -1; r <= 1; r++) {
			const h = (i = t[e + c]) == null ? void 0 : i[n + r]
			h && o.push(h)
		}
	return o
}
function ee(t) {
	return t.some(e => e.some(n => n.status == d.mine))
}
function te(t) {
	return t.every(e => e.every(n => n.status === d.number || (n.mine && (n.status == d.hidden || n.status === d.marked))))
}
if (document.querySelector('.main-minesweeper')) {
	let t = function () {
		;(document.querySelector('.minesweeper__play').textContent = 'reload'),
			document.querySelector('.minesweeper__play').addEventListener('click', () => {
				window.location.reload()
			})
	}
	var reloadTheGame = t
	;(document.querySelector('.minesweeper__subtitle').style.display = 'none'),
		(document.querySelector('.minesweeper__board').style.display = 'none'),
		document.querySelector('.minesweeper__play').addEventListener('click', () => {
			const e = Number(document.querySelector('#field').value),
				n = Number(document.querySelector('#mine').value)
			;(document.querySelector('.minesweeper__board').style.display = 'inline-grid'),
				(document.querySelector('.minesweeper__subtitle').style.display = 'block'),
				document.querySelectorAll('.minesweeper__input').forEach(u => {
					u.style.display = 'none'
				}),
				document.querySelectorAll('label').forEach(u => {
					u.style.display = 'none'
				})
			const o = Q(e, n),
				i = document.querySelector('.minesweeper__board'),
				c = document.querySelector('[data-mines]'),
				r = document.querySelector('.minesweeper__subtitle')
			;(document.querySelector('[data-mines]').textContent = n),
				(document.querySelector('.minesweeper__container').style.width = `calc(${e} * 60px + 100px)`),
				(document.querySelector('.minesweeper__container').style.maxWidth = `calc(${e} * 60px + 100px)`),
				i.style.setProperty('--size', e),
				o.forEach(u => {
					u.forEach(x => {
						i.append(x.element),
							x.element.addEventListener('click', () => {
								F(o, x), y()
							}),
							x.element.addEventListener('contextmenu', m => {
								m.preventDefault(), G(x), h()
							})
					})
				})
			function h() {
				const u = o.reduce((x, m) => x + m.filter(M => M.status == d.marked).length, 0)
				c.textContent = n - u
			}
			function y() {
				const u = te(o),
					x = ee(o)
				;(u || x) && (i.addEventListener('click', p, {capture: !0}), i.addEventListener('contextmenu', p, {capture: !0})),
					u && ((r.textContent = 'You Win'), alert('You Won')),
					x &&
						((r.textContent = 'You Lose'),
						o.forEach(m => {
							m.forEach(M => {
								M.status === d.marked && G(M), M.mine && F(o, M)
							})
						}),
						alert('You Lost'))
			}
			function p(u) {
				u.stopImmediatePropagation()
			}
			t()
		})
}
let C = {x: 0, y: 0},
	L = {x: 0, y: 0}
window.addEventListener('keydown', t => {
	let e = t.keyCode
	setTimeout(() => {
		if (e == 37 || e == 65) {
			if ((document.querySelector('.snake__snake').classList.add('left'), L.x !== 0)) return
			C = {x: -1, y: 0}
		} else if (e == 38 || e == 87) {
			if ((document.querySelector('.snake__snake').classList.add('top'), L.y !== 0)) return
			C = {x: 0, y: -1}
		} else if (e == 39 || e == 68) {
			if ((document.querySelector('.snake__snake').classList.add('right'), L.x !== 0)) return
			C = {x: 1, y: 0}
		} else if (e == 40 || e == 83) {
			if ((document.querySelector('.snake__snake').classList.add('bottom'), L.y !== 0)) return
			C = {x: 0, y: 1}
		}
	}, 1)
})
function se() {
	return (L = C), C
}
const ne = 10
let P = 0
const g = [{x: 17, y: 17}]
function ie() {
	ce()
	const t = se()
	for (let e = g.length - 2; e >= 0; e--) g[e + 1] = {...g[e]}
	;(g[0].x += t.x), (g[0].y += t.y)
}
function re(t) {
	g.forEach(e => {
		const n = document.createElement('div')
		;(n.style.gridRowStart = e.y), (n.style.gridColumnStart = e.x), n.classList.add('snake__snake'), t.appendChild(n)
	})
}
function T(t, {ignoreHead: e = !1} = {}) {
	return g.some((n, o) => (e && o == 0 ? !1 : oe(n, t)))
}
function oe(t, e) {
	return t.x === e.x && t.y === e.y
}
function ae(t) {
	P += t
}
function ce() {
	for (let t = 0; t < P; t++) g.push({...g[g.length - 1]})
	P = 0
}
const E = 35,
	le = 1
let D = $()
function he() {
	T(D) && (ae(le), (D = $()))
}
function de(t) {
	const e = document.createElement('div')
	;(e.style.gridRowStart = D.y), (e.style.gridColumnStart = D.x), e.classList.add('snake__food'), t.appendChild(e)
}
function $() {
	let t
	for (; t == null || T(t); ) t = ue()
	return t
}
function ue() {
	return {x: Math.floor(Math.random() * E) + 1, y: Math.floor(Math.random() * E) + 1}
}
if (document.querySelector('.main-snake')) {
	let o = function (m) {
			if (e) {
				document.querySelector('.snake__gameover').style.display = 'flex'
				return
			}
			window.requestAnimationFrame(o), !((m - t) / 1e3 < 1 / ne) && ((t = m), i(), c())
		},
		i = function () {
			ie(), he(), r()
		},
		c = function () {
			;(n.innerHTML = ''), re(n), de(n)
		},
		r = function () {
			e = h(y()) || p()
		},
		h = function (m) {
			return m.x < 1 || m.x > E || m.y < 1 || m.y > E
		},
		y = function () {
			return g[0]
		},
		p = function () {
			return T(g[0], {ignoreHead: !0})
		}
	var main = o,
		checkDeath = r,
		outSideGrid = h,
		getSnakeHead = y,
		snakeIntersection = p
	let t = 0,
		e = !1
	const n = document.getElementById('game-board')
	document.querySelector('.snake__btn').addEventListener('click', () => {
		window.location.reload()
	}),
		window.requestAnimationFrame(o)
}
class me {
	constructor(e, n, o, i, c) {
		;(this.x = e),
			(this.y = n),
			(this.width = o),
			(this.height = i),
			(this.speed = c),
			(this.direction = v),
			(this.nextDirection = this.direction),
			(this.frameCount = 7),
			(this.currentFrame = 1),
			setInterval(() => {
				this.changeAnimation()
			}, 100)
	}
	moveProcess() {
		if ((this.changeDirectionIfPossible(), this.moveForwards(), this.checkCollisions())) {
			this.moveBackwards()
			return
		}
	}
	eat() {
		for (let e = 0; e < a.length; e++) for (let n = 0; n < a[0].length; n++) a[e][n] == 2 && this.getMapX() == n && this.getMapY() == e && ((a[e][n] = 3), _e())
	}
	moveBackwards() {
		switch (this.direction) {
			case v:
				this.x -= this.speed
				break
			case I:
				this.y += this.speed
				break
			case S:
				this.x += this.speed
				break
			case q:
				this.y -= this.speed
				break
		}
	}
	moveForwards() {
		switch (this.direction) {
			case v:
				this.x += this.speed
				break
			case I:
				this.y -= this.speed
				break
			case S:
				this.x -= this.speed
				break
			case q:
				this.y += this.speed
				break
		}
	}
	checkCollisions() {
		let e = !1
		return (a[parseInt(this.y / s)][parseInt(this.x / s)] == 1 || a[parseInt(this.y / s + 0.9999)][parseInt(this.x / s)] == 1 || a[parseInt(this.y / s)][parseInt(this.x / s + 0.9999)] == 1 || a[parseInt(this.y / s + 0.9999)][parseInt(this.x / s + 0.9999)] == 1) && (e = !0), e
	}
	checkGhostCollision() {
		for (let e = 0; e < b.length; e++) {
			let n = b[e]
			if (n.getMapX() == this.getMapX() && n.getMapY() == this.getMapY()) return !0
		}
		return !1
	}
	changeDirectionIfPossible() {
		if (this.direction == this.nextDirection) return
		let e = this.direction
		;(this.direction = this.nextDirection), this.moveForwards(), this.checkCollisions() ? (this.moveBackwards(), (this.direction = e)) : this.moveBackwards()
	}
	changeAnimation() {
		this.currentFrame = this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1
	}
	draw() {
		l.save(), l.translate(this.x + s / 2, this.y + s / 2), l.rotate((this.direction * 90 * Math.PI) / 180), l.translate(-this.x - s / 2, -this.y - s / 2), l.drawImage(j, (this.currentFrame - 1) * s, 0, s, s, this.x, this.y, this.width, this.height), l.restore()
	}
	getMapX() {
		return parseInt(this.x / s)
	}
	getMapY() {
		return parseInt(this.y / s)
	}
	getMapXRightSide() {
		return parseInt((this.x * 0.99 + s) / s)
	}
	getMapYRightSide() {
		return parseInt((this.y * 0.99 + s) / s)
	}
}
class fe {
	constructor(e, n, o, i, c, r, h, y, p, u) {
		;(this.x = e),
			(this.y = n),
			(this.width = o),
			(this.height = i),
			(this.speed = c),
			(this.direction = v),
			(this.imageX = r),
			(this.imageY = h),
			(this.imageHeight = p),
			(this.imageWidth = y),
			(this.range = u),
			(this.randomTargetIndex = parseInt(Math.random() * 4)),
			(this.target = W[this.randomTargetIndex]),
			setInterval(() => {
				this.changeRandomDirection()
			}, 1e4)
	}
	changeRandomDirection() {
		;(this.randomTargetIndex += parseInt(Math.random() * 4)), (this.randomTargetIndex = this.randomTargetIndex % 4)
	}
	moveProcess() {
		if ((this.isInRange() ? (this.target = f) : (this.target = W[this.randomTargetIndex]), this.changeDirectionIfPossible(), this.moveForwards(), this.checkCollisions())) {
			this.moveBackwards()
			return
		}
	}
	moveBackwards() {
		switch (this.direction) {
			case v:
				this.x -= this.speed
				break
			case I:
				this.y += this.speed
				break
			case S:
				this.x += this.speed
				break
			case q:
				this.y -= this.speed
				break
		}
	}
	moveForwards() {
		switch (this.direction) {
			case v:
				this.x += this.speed
				break
			case I:
				this.y -= this.speed
				break
			case S:
				this.x -= this.speed
				break
			case q:
				this.y += this.speed
				break
		}
	}
	checkCollisions() {
		let e = !1
		return (a[parseInt(this.y / s)][parseInt(this.x / s)] == 1 || a[parseInt(this.y / s + 0.9999)][parseInt(this.x / s)] == 1 || a[parseInt(this.y / s)][parseInt(this.x / s + 0.9999)] == 1 || a[parseInt(this.y / s + 0.9999)][parseInt(this.x / s + 0.9999)] == 1) && (e = !0), e
	}
	isInRange() {
		let e = Math.abs(f.getMapX() - this.getMapX()),
			n = Math.abs(f.getMapY() - this.getMapY())
		return Math.sqrt(e * e + n * n) <= this.range
	}
	changeDirectionIfPossible() {
		let e = this.direction
		if (((this.direction = this.calculateNewDirection(a, parseInt(this.target.x / s), parseInt(this.target.y / s))), typeof this.direction > 'u')) {
			this.direction = e
			return
		}
		this.getMapY() != this.getMapYRightSide() && (this.direction == S || this.direction == v) && (this.direction = I), this.getMapX() != this.getMapXRightSide() && this.direction == I && (this.direction = S), this.moveForwards(), this.checkCollisions() ? (this.moveBackwards(), (this.direction = e)) : this.moveBackwards()
	}
	calculateNewDirection(e, n, o) {
		let i = []
		for (let r = 0; r < e.length; r++) i[r] = e[r].slice()
		let c = [{x: this.getMapX(), y: this.getMapY(), rightX: this.getMapXRightSide(), rightY: this.getMapYRightSide(), moves: []}]
		for (; c.length > 0; ) {
			let r = c.shift()
			if (r.x == n && r.y == o) return r.moves[0]
			{
				i[r.y][r.x] = 1
				let h = this.addNeighbors(r, i)
				for (let y = 0; y < h.length; y++) c.push(h[y])
			}
		}
		return 1
	}
	addNeighbors(e, n) {
		let o = [],
			i = n.length,
			c = n[0].length
		if (e.x - 1 >= 0 && e.x - 1 < i && n[e.y][e.x - 1] != 1) {
			let r = e.moves.slice()
			r.push(S), o.push({x: e.x - 1, y: e.y, moves: r})
		}
		if (e.x + 1 >= 0 && e.x + 1 < i && n[e.y][e.x + 1] != 1) {
			let r = e.moves.slice()
			r.push(v), o.push({x: e.x + 1, y: e.y, moves: r})
		}
		if (e.y - 1 >= 0 && e.y - 1 < c && n[e.y - 1][e.x] != 1) {
			let r = e.moves.slice()
			r.push(I), o.push({x: e.x, y: e.y - 1, moves: r})
		}
		if (e.y + 1 >= 0 && e.y + 1 < c && n[e.y + 1][e.x] != 1) {
			let r = e.moves.slice()
			r.push(q), o.push({x: e.x, y: e.y + 1, moves: r})
		}
		return o
	}
	changeAnimation() {
		this.currentFrame = this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1
	}
	draw() {
		l.save(), l.drawImage(ye, this.imageX, this.imageY, this.imageWidth, this.imageHeight, this.x, this.y, this.width, this.height), l.restore()
	}
	getMapX() {
		return parseInt(this.x / s)
	}
	getMapY() {
		return parseInt(this.y / s)
	}
	getMapXRightSide() {
		return parseInt((this.x * 0.99 + s) / s)
	}
	getMapYRightSide() {
		return parseInt((this.y * 0.99 + s) / s)
	}
}
const X = document.getElementById('canvas'),
	l = X.getContext('2d'),
	j = document.getElementById('animation'),
	ye = document.getElementById('ghosts'),
	_ = (t, e, n, o, i) => {
		;(l.fillStyle = i), l.fillRect(t, e, n, o)
	}
let ge = 30,
	s = 20,
	f,
	pe = '#fff',
	k = s / 2,
	w = (s - k) / 2,
	Y = 'black',
	xe = '#fff',
	b = [],
	we = 4,
	R = 3,
	H = 0,
	N = [
		{x: 0, y: 0},
		{x: 176, y: 0},
		{x: 0, y: 121},
		{x: 176, y: 121},
	]
const v = 4,
	I = 3,
	S = 2,
	q = 1
let a = [
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
for (let t = 0; t < a.length; t++) for (let e = 0; e < a[0].length; e++) a[t][e] === 2 && H++
const W = [
	{x: 1 * s, y: 1 * s},
	{x: 1 * s, y: (a.length - 2) * s},
	{x: (a[0].length - 2) * s, y: s},
	{x: (a[0].length - 2) * s, y: (a.length - 2) * s},
]
function z() {
	f = new me(s, s, s, s, s / 5)
}
const K = () => {
		Ye(), ke()
	},
	U = setInterval(K, 1e3 / ge),
	ke = () => {
		f.moveProcess(), f.eat()
		for (let t = 0; t < b.length; t++) b[t].moveProcess()
		f.checkGhostCollision() && Ie(), B >= H && (Me(), clearInterval(U))
	},
	ve = () => {
		;(l.font = '500 25px Montserrat'), (l.fillStyle = 'white'), l.fillText('Lives:', 200, s * a.length + 30)
		for (let t = 0; t < R; t++) l.drawImage(j, 2 * s, 0, s, s, 270 + t * s, s * a.length + 12, s, s)
	},
	Ie = () => {
		z(), J(), R--, R == 0 && ((document.querySelector('.pacman__reload').style.display = 'block'), Se())
	},
	Se = () => {
		be(), clearInterval(U)
	},
	be = () => {
		;(l.font = 'bold 50px Montserrat'), (l.fillStyle = 'red'), l.fillText('Game Over', 80, 250)
	},
	Me = () => {
		;(l.font = 'bold 50px Montserrat'), (l.fillStyle = 'darkgreen'), l.fillText('You Won', 80, 250), (document.querySelector('.pacman__reload').style.display = 'block')
	}
let B = 0
function _e() {
	return B++
}
function Ce() {
	;(l.font = '500 25px Montserrat '), (l.marginTop = '20px'), (l.fillStyle = 'white'), l.fillText(`Score: ${B}`, 0, s * a.length + 30)
}
const J = () => {
		b = []
		for (let t = 0; t < we; t++) {
			let e = new fe(9 * s + (t % 2 == 0 ? 0 : 1) * s, 10 * s + (t % 2 == 0 ? 0 : 1) * s, s, s, f.speed / 2, N[t % 4].x, N[t % 4].y, 124, 116, 6 + t)
			b.push(e)
		}
	},
	qe = () => {
		for (let t = 0; t < a.length; t++) for (let e = 0; e < a[0].length; e++) a[t][e] == 2 && _(e * s + s / 3, t * s + s / 3, s / 3, s / 3, xe)
	},
	Le = () => {
		for (let t = 0; t < b.length; t++) b[t].draw()
	},
	Ye = () => {
		_(0, 0, X.width, X.height, 'black'), Ee(), qe(), f.draw(), Ce(), Le(), ve()
	},
	Ee = () => {
		for (let t = 0; t < a.length; t++) for (let e = 0; e < a[0].length; e++) a[t][e] == 1 && _(e * s, t * s, s, s, pe), e > 0 && a[t][e - 1] == 1 && _(e * s, t * s + w, k + w, k, Y), e < a[0].length - 1 && a[t][e + 1] == 1 && _(e * s + w, t * s + w, k + w, k, Y), t > 0 && a[t - 1][e] == 1 && _(e * s + w, t * s, k, k + w, Y), t < a.length - 1 && a[t + 1][e] == 1 && _(e * s + w, t * s + w, k, k + w, Y)
	}
z()
J()
K()
window.addEventListener('keydown', t => {
	let e = t.keyCode
	setTimeout(() => {
		e == 37 || e == 65 ? (f.nextDirection = S) : e == 38 || e == 87 ? (f.nextDirection = I) : e == 39 || e == 68 ? (f.nextDirection = v) : (e == 40 || e == 83) && (f.nextDirection = q)
	}, 1)
})
