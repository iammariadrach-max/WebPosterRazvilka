document.addEventListener('DOMContentLoaded', () => {
  const text1 = `
Вы отправляетесь путешествовать по&nbsp;трём странам:
<span class="indiaGap">Индии</span><span id="india-hook"></span>,
<span class="egyptGap">Египту</span><span id="egypt-hook"></span> и&nbsp;Китаю.
<span class="chinaGap">Рядом</span> с&nbsp;вами маскот бренда —
<span class="maskotGap">говорящий</span><span id="maskot-hook"></span> чемодан, который
внимательно следит за&nbsp;вашими вещами и&nbsp;помогает
в&nbsp;<span class="WorldGap">дороге</span><span id="world-hook"></span>.
`

  const text2 = `
В каждой стране вас ждут новые открытия. Вы&nbsp;будете сами строить
маршрут, <span class="lineGap">узнавать</span><span id="line-hook"></span> интересные факты
о&nbsp;<span class="vaseGap">культуре</span><span id="vase-hook"></span> и&nbsp;шаг
за&nbsp;шагом открывать для&nbsp;себя
<span class="world2Gap">мир</span><span id="world2-hook"></span>, собирая яркие
<span class="sunGap">впечатления</span><span id="sun-hook"></span>.
`

  new Typed('#typed-output-1', {
    strings: [text1],
    typeSpeed: 30,
    contentType: 'html'
  })

  new Typed('#typed-output-2', {
    strings: [text2],
    typeSpeed: 30,
    startDelay: 2000,
    contentType: 'html'
  })

  function show(selector) {
    const el = document.querySelector(selector)
    if (el && el.style.opacity !== '1') {
      el.style.opacity = 1
    }
  }

  const observer = new MutationObserver(() => {
    if (document.querySelector('#india-hook')) {
      show('.typedTextIndia')
    }

    if (document.querySelector('#egypt-hook')) {
      show('.typedTextEgypt')
    }

    if (document.querySelector('#china-hook')) {
      setTimeout(() => {
        show('.typedTextChina')
      }, 50)
    }

    if (document.querySelector('#maskot-hook')) {
      show('.typedTextMaskot')
    }

    if (document.querySelector('#world-hook')) {
      show('.typedTextWorld')
    }

    if (document.querySelector('#line-hook')) {
      show('.typedTextLine')
    }

    if (document.querySelector('#vase-hook')) {
      show('.typedTextVase')
    }

    if (document.querySelector('#world2-hook')) {
      show('.typedTextWorld2')
    }

    if (document.querySelector('#sun-hook')) {
      show('.typedTextSun')
    }
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
})
