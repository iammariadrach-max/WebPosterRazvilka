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

  pivot = new THREE.Object3D()
  scene.add(pivot)

  const loader = new GLTFLoader()
  loader.load(
    'maskot.glb',
    function (gltf) {
      model3D = gltf.scene

      model3D.scale.set(0.55, 0.55, 0.55)

      const box = new THREE.Box3().setFromObject(model3D)
      const center = box.getCenter(new THREE.Vector3())
      model3D.position.sub(center)

      pivot.add(model3D)

      console.log('Моделька загружена успешно')
    },
    undefined,
    function (error) {
      console.error('Ошибка загрузки модельки:', error)
    }
  )

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.5)
  dirLight.position.set(50, 50, 50)
  dirLight.castShadow = true
  dirLight.shadow.mapSize.width = 1024
  dirLight.shadow.mapSize.height = 1024
  dirLight.shadow.radius = 4
  scene.add(dirLight)

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.8)
  fillLight.position.set(-50, 30, 20)
  scene.add(fillLight)

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

    const rotationMultiplier = isMobile ? 14 : 28

    if (pivot) {
      pivot.rotation.y = baseRotation + progress * Math.PI * rotationMultiplier

      pivot.position.y = -progress * (isMobile ? 2 : 5)
    }

    const distance = isMobile ? 5 : 10

    modelContainer.style.transform = `translateX(-50%) translateY(${progress * window.innerHeight * distance}px)`

    renderer.render(scene, camera)
  }

  animate()
}
