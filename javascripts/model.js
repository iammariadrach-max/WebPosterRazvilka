import * as THREE from 'three'
import { GLTFLoader } from 'GLTFLoader'

document.addEventListener('DOMContentLoaded', () => {
  initThree()
})

function initThree() {
  const modelContainer = document.querySelector('.suitcase')

  const scene = new THREE.Scene()
  scene.background = null

  const camera = new THREE.PerspectiveCamera(
    14,
    window.innerWidth / window.innerHeight,
    0.1,
    3000
  )
  camera.position.set(0, 5, 15)
  camera.lookAt(0, 0, 0)

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  const rect = modelContainer.getBoundingClientRect()
  renderer.setSize(rect.width, rect.height)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  modelContainer.appendChild(renderer.domElement)

  function updateRendererSize() {
    const containerRect = modelContainer.getBoundingClientRect()
    renderer.setSize(containerRect.width, containerRect.height)
    camera.aspect = containerRect.width / containerRect.height
    camera.updateProjectionMatrix()
  }
  updateRendererSize()
  window.addEventListener('resize', updateRendererSize)

  let model3D, pivot

  //  pivot
  pivot = new THREE.Object3D()
  scene.add(pivot)

  const loader = new GLTFLoader()
  loader.load(
    'maskot.glb',
    function (gltf) {
      model3D = gltf.scene

      // можно уменьшить размер модели
      // model3D.scale.set(0.31, 0.31, 0.31)
      model3D.scale.set(0.55, 0.55, 0.55)

      // центрирование модели относительно pivot
      const box = new THREE.Box3().setFromObject(model3D)
      const center = box.getCenter(new THREE.Vector3())
      model3D.position.sub(center)

      // добавление в pivot
      pivot.add(model3D)

      console.log('Моделька загружена успешно')
    },
    undefined,
    function (error) {
      console.error('Ошибка загрузки модельки:', error)
    }
  )

  // Лампы
  // const dirLight = new THREE.DirectionalLight(0xffffff, 1)
  // dirLight.position.set(200, 40, 150)
  // scene.add(dirLight)

  // const mainLight = new THREE.DirectionalLight(0xffffff, 3)
  // mainLight.position.set(10, 8, -17)
  // scene.add(mainLight)

  // const ambient = new THREE.AmbientLight(0xffffff, 0.1)
  // scene.add(ambient)

  // const dirLight = new THREE.DirectionalLight(0xffffff, 3) // было 1
  // dirLight.position.set(200, 100, 150) // выше и дальше
  // scene.add(dirLight)

  // const mainLight = new THREE.DirectionalLight(0xffffff, 5) // было 3
  // mainLight.position.set(10, 20, -17)
  // scene.add(mainLight)

  // const ambient = new THREE.AmbientLight(0xffffff, 0.3) // было 0.1
  // scene.add(ambient)
  // Направленный свет спереди, мягкий
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.5) // интенсивность света
  dirLight.position.set(50, 50, 50) // свет сверху и спереди
  dirLight.castShadow = true
  dirLight.shadow.mapSize.width = 1024
  dirLight.shadow.mapSize.height = 1024
  dirLight.shadow.radius = 4 // мягкость тени
  scene.add(dirLight)

  // Второй направленный свет для подсветки с другой стороны
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.8) //
  fillLight.position.set(-50, 30, 20)
  scene.add(fillLight)

  // Равномерный мягкий свет
  const ambient = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambient)

  let scrollY = 0
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY
  })

  const baseRotation = -Math.PI / 2

  function animate() {
    requestAnimationFrame(animate)

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0

    const isMobile = window.innerWidth < 768
    // const rotationMultiplier = isMobile ? 2 : 6
    const rotationMultiplier = isMobile ? 2 : 6

    if (pivot) {
      // pivot
      pivot.rotation.y = baseRotation + progress * Math.PI * rotationMultiplier
      pivot.position.y = -progress * (isMobile ? 2 : 5)
    }

    const distance = isMobile ? 0.2 : 2.5
    // const distance = isMobile ? 0.05 : 2.5
    modelContainer.style.transform = `translateX(-50%) translateY(${progress * window.innerHeight * distance}px)`

    renderer.render(scene, camera)
  }

  animate()
}
// loader.load(
//   'maskot.glb',
//   function (gltf) {
//     model3D = gltf.scene

//     scene.add(model3D)
//     console.log('Моделька загружена успешно')
//   },
//   function (xhr) {
//     console.log(((xhr.loaded / xhr.total) * 100).toFixed(2) + '% loaded')
//   },
//   function (error) {
//     console.error('Ошибка загрузки модельки:', error)
//   }
// )

// const progress =
//   scrollY / (document.documentElement.scrollHeight - window.innerHeight)

// // движение вниз по странице
// model.style.top = 7 + progress * 50 + '%'
