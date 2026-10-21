import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'

// Register plugins once
gsap.registerPlugin(ScrollTrigger, CustomEase)

// Custom signature eases
// "settling lamp" ease — slow rise with graceful, buttery settle
try {
  CustomEase.create('settlingLamp', 'M0,0 C0.16,1 0.3,1 1,1')
  CustomEase.create('warmSnap', 'M0,0 C0.25,1 0.5,1 1,1')
  CustomEase.create('clayWipe', 'M0,0 C0.76, 0, 0.24, 1 1,1')
} catch {
  // Fallbacks if already registered
}

export const ANIMATION_TOKENS = {
  durations: {
    micro: 0.2,
    swift: 0.45,
    medium: 0.85,
    unfold: 1.25,
    ceremonial: 1.7,
  },
  eases: {
    powerOut: 'power3.out',
    expoOut: 'expo.out',
    settlingLamp: 'settlingLamp',
    warmSnap: 'warmSnap',
    clayWipe: 'clayWipe',
  },
  stagger: {
    tight: 0.04,
    comfortable: 0.09,
    generous: 0.16,
  },
}

export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
