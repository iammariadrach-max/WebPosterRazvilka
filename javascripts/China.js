coords()

function coords() {
  const x = document.querySelector('.XCoord')
  const y = document.querySelector('.YCoord')

  document.addEventListener('mousemove', (event) => {
    x.innerHTML = `X: ${event.pageX}`
    y.innerHTML = `Y: ${event.pageY}`
  })
}

const state = {
  mouseDown: false,
  currentCircle: 0,
  linesShow: [false, false, false, false, false, false]
}

function resetState() {
  state.mouseDown = false
  state.currentCircle = 0
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

function calcDistance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

function calcAngle(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1)
}

document.addEventListener('DOMContentLoaded', () => {
  initCircles()
  initDocument()
  cycle()
})

function initDocument() {
  document.addEventListener('mousemove', (e) => {
    if (state.mouseDown) {
      drawLine(e)
    }
  })

  document.addEventListener('mouseup', () => {
    resetState()
    eraseLine()
  })
}

function initCircles() {
  const circles = document.querySelectorAll('.number-circle')

  circles.forEach((circle) => {
    initCircle(circle)
  })
}

function initCircle(circleElement) {
  const container = document.querySelector('.numbers')

  const { width, height } = circleElement.getBoundingClientRect()
  const { width: cw, height: ch } = container.getBoundingClientRect()

  circleElement.style.top = `${getRandomArbitrary(0, ch - height)}px`
  circleElement.style.left = `${getRandomArbitrary(0, cw - width)}px`

  circleElement.addEventListener('mousedown', (e) => {
    state.mouseDown = true
    state.currentCircle = Number(e.target.id.split('_')[1])
  })

  circleElement.addEventListener('mouseup', (e) => {
    const targetCircle = Number(e.target.id.split('_')[1])

    if (state.currentCircle + 1 === targetCircle) {
      state.linesShow[state.currentCircle - 1] = true
    }

    if (state.currentCircle - 1 === targetCircle) {
      state.linesShow[state.currentCircle - 2] = true
    }
    if (
      state.linesShow[0] &&
      state.linesShow[1] &&
      state.linesShow[2] &&
      state.linesShow[3] &&
      state.linesShow[4] &&
      state.linesShow[5]
    ) {
      const circlesBlink = document.querySelectorAll('.number-circle')
      circlesBlink.forEach((circleBlink) => {
        circleBlink.classList.add('circle-blink')
      })
    }

    resetState()
  })
}

function drawLine(e) {
  const container = document.querySelector('.numbers')
  const parentRect = container.getBoundingClientRect()

  const currentCircle = document.getElementById(`circle_${state.currentCircle}`)

  if (!currentCircle) return

  const rect = currentCircle.getBoundingClientRect()

  const x1 = rect.left - parentRect.left + rect.width / 2
  const y1 = rect.top - parentRect.top + rect.height / 2

  const x2 = e.clientX - parentRect.left
  const y2 = e.clientY - parentRect.top

  const distance = calcDistance(x1, y1, x2, y2)
  const angle = calcAngle(x1, y1, x2, y2)

  const line = document.getElementById(`line_${state.currentCircle}`)
  if (!line) return

  line.style.top = `${y1}px`
  line.style.left = `${x1}px`
  line.style.width = `${distance}px`
  line.style.transform = `rotate(${angle}rad)`
}

function eraseLine() {
  const lines = document.querySelectorAll('.line')
  lines.forEach((line) => {
    line.style.width = 0
  })
}

function drawLines() {
  const container = document.querySelector('.numbers')
  const parentRect = container.getBoundingClientRect()

  state.linesShow.forEach((show, index) => {
    if (!show) return

    const line = document.getElementById(`line_${index + 1}`)
    const c1 = document.getElementById(`circle_${index + 1}`)
    const c2 = document.getElementById(`circle_${index + 2}`)

    if (!line || !c1 || !c2) return

    const r1 = c1.getBoundingClientRect()
    const r2 = c2.getBoundingClientRect()

    const x1 = r1.left - parentRect.left + r1.width / 2
    const y1 = r1.top - parentRect.top + r1.height / 2

    const x2 = r2.left - parentRect.left + r2.width / 2
    const y2 = r2.top - parentRect.top + r2.height / 2

    const distance = calcDistance(x1, y1, x2, y2)
    const angle = calcAngle(x1, y1, x2, y2)

    line.style.top = `${y1}px`
    line.style.left = `${x1}px`
    line.style.width = `${distance}px`
    line.style.transform = `rotate(${angle}rad)`
  })
}

function moveCircles(circles) {
  const container = document.querySelector('.numbers')
  const { width: cw, height: ch } = container.getBoundingClientRect()

  for (let circle of circles) {
    const { width, height } = circle.getBoundingClientRect()

    circle.style.top = `${getRandomArbitrary(0, ch - height)}px`
    circle.style.left = `${getRandomArbitrary(0, cw - width)}px`
  }
}

function cycle() {
  const circles = document.getElementsByClassName('number-circle')

  setInterval(drawLines, 1000 / 60)

  moveCircles(circles)

  setInterval(() => {
    moveCircles(circles)
  }, 5000)
}
