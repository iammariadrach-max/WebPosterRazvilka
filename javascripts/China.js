// координаты
coords()

function coords() {
  let x = document.querySelector('.XCoord')
  let y = document.querySelector('.YCoord')

  document.addEventListener('mousemove', (event) => {
    let cursorX = event.pageX
    let cursorY = event.pageY

    x.innerHTML = `X: ${cursorX}`
    y.innerHTML = `Y: ${cursorY}`
  })
}
