gsap.registerPlugin(ScrollTrigger)

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.endOfTheJourney',
    start: 'top top',
    end: '+=250%',
    scrub: true,
    pin: true
  }
})

tl.fromTo(
  '.star',
  { y: '-10vw', scale: 5 },
  { y: '0vw', scale: 243, rotate: 360, ease: 'none' },
  0
)

tl.fromTo(
  '.desc',
  { x: '20vw', opacity: 0, scale: 1 },
  { x: '0vw', opacity: 1, scale: 1.2, ease: 'power3.out' },
  0.7
)

tl.to(
  '.text-block',
  {
    top: '40%',
    left: '50%',
    right: 'auto',
    transform: 'translate(-50%, -50%)',
    ease: 'power2.out'
  },
  1.2
)

tl.to(
  '.footer',
  {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out'
  },
  1.5
)

gsap.fromTo(
  '.button1',
  { y: '2vw', rotate: '-16.16deg' },
  {
    y: '2vw',
    rotate: '-16.16deg',
    duration: 0.8,
    ease: 'power2.out',
    delay: 1.6
  }
)
gsap.fromTo(
  '.button2',
  { y: '2vw', rotate: '21.88deg' },
  {
    y: '2vw',
    rotate: '21.88deg',
    duration: 0.8,
    ease: 'power2.out',
    delay: 1.7
  }
)
gsap.fromTo(
  '.button3',
  { y: '0.5vw', rotate: '-12.17deg' },
  {
    y: '0.5vw',
    rotate: '-12.17deg',
    duration: 0.8,
    ease: 'power2.out',
    delay: 1.8
  }
)
gsap.fromTo(
  '.button4',
  { y: '3vw', rotate: '-5.02deg' },
  {
    y: '3vw',
    rotate: '-5.02deg',
    duration: 0.8,
    ease: 'power2.out',
    delay: 1.9
  }
)
gsap.fromTo(
  '.button5',
  { y: '2vw', rotate: '7deg' },
  {
    y: '2vw',
    rotate: '7deg',
    duration: 0.8,
    ease: 'power2.out',
    delay: 2.0
  }
)
