document.addEventListener('DOMContentLoaded', function () {
  randomCircles()
  showIndiaButtons()
})

function randomCircles() {
  const circles = document.querySelectorAll('.circle')
  const india = document.querySelector('.India')

  circles.forEach((circle) => {
    const x = Math.random() * (india.getBoundingClientRect().width - 30)
    const y = Math.random() * (india.getBoundingClientRect().height - 30)

    circle.style.left = x + 'px'
    circle.style.top = y + 'px'
  })
}
// движение шаров
let moveInterval
moveCircles()
function moveCircles() {
  const circles = document.querySelectorAll('.circle')
  const india = document.querySelector('.India')

  moveInterval = setInterval(() => {
    circles.forEach((circle) => {
      const x = Math.random() * (india.offsetWidth - 50)
      const y = Math.random() * (india.offsetHeight - 50)

      circle.style.left = x + 'px'
      circle.style.top = y + 'px'
    })
  }, 3000)
}
function showIndiaButtons() {
  const button = document.querySelector('.buttonCircles')
  const cityButtons = document.querySelectorAll('.city')
  const circles = document.querySelectorAll('.circle')
  const india = document.querySelector('.India')

  const x = india.getBoundingClientRect().width / 2
  const y = india.getBoundingClientRect().height / 2

  button.addEventListener('click', () => {
    cityButtons.forEach((city) => {
      city.style.display = 'block'
    })
    button.style.display = 'none'

    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i]
      circle.style.left = x + 'px'
      circle.style.top = y + 'px'
      circle.classList.add('anim')

      setTimeout(() => {
        circle.style.display = 'none'
        // здесь прописать появлене картинки индии
        india.classList.add('cover')
      }, 2000)
    }
  })

  const varanasi = document.querySelector('.varanasi')
  const howrahBridge = document.querySelector('.howrahBridge')
  const nandi = document.querySelector('.nandi')
  const minkshiTemple = document.querySelector('.minkshiTemple')
  const hawaMahal = document.querySelector('.hawaMahal')
  const tajMahal = document.querySelector('.tajMahal')

  const varanasiImg = document.querySelector('.varanasiImg')
  const howrahBridgeImg = document.querySelector('.howrahBridgeImg')
  const nandiImg = document.querySelector('.nandiImg')
  const minkshiTempleImg = document.querySelector('.minkshiTempleImg')
  const hawaMahalImg = document.querySelector('.hawaMahalImg')
  const tajMahalImg = document.querySelector('.tajMahalImg')

  varanasi.addEventListener('click', () => {
    varanasiImg.classList.toggle('none')
  })

  howrahBridge.addEventListener('click', () => {
    howrahBridgeImg.classList.toggle('none')
  })
  nandi.addEventListener('click', () => {
    nandiImg.classList.toggle('none')
  })
  minkshiTemple.addEventListener('click', () => {
    minkshiTempleImg.classList.toggle('none')
  })
  hawaMahal.addEventListener('click', () => {
    hawaMahalImg.classList.toggle('none')
  })
  tajMahal.addEventListener('click', () => {
    tajMahalImg.classList.toggle('none')
  })
}
