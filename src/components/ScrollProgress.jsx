import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const tween = gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.1,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[2.5px] z-[9990] bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary-dark)] origin-left shadow-[0_0_8px_rgba(126,156,122,0.5)] will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}

