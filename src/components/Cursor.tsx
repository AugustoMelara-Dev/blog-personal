import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Solo en desktop
    if (window.matchMedia('(pointer: coarse)').matches) 
      return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      // Dot sigue el mouse exacto
      if (dot.current) {
        dot.current.style.left = mouseX + 'px'
        dot.current.style.top = mouseY + 'px'
      }
      
      // Ring hace lerp suave detrás del dot
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      
      if (ring.current) {
        ring.current.style.left = ringX + 'px'
        ring.current.style.top = ringY + 'px'
      }
      
      rafId = requestAnimationFrame(animate)
    }

    // Agrandar ring sobre elementos interactivos
    const onEnter = () => {
      if (ring.current) {
        ring.current.style.width = '48px'
        ring.current.style.height = '48px'
        ring.current.style.borderColor = 
          'rgba(163,230,53,0.7)'
      }
      if (dot.current) {
        dot.current.style.opacity = '0'
      }
    }
    
    const onLeave = () => {
      if (ring.current) {
        ring.current.style.width = '32px'
        ring.current.style.height = '32px'
        ring.current.style.borderColor = 
          'rgba(163,230,53,0.4)'
      }
      if (dot.current) {
        dot.current.style.opacity = '1'
      }
    }

    window.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(animate)

    // Aplicar a todos los elementos interactivos
    const interactives = document.querySelectorAll(
      'a, button, [role="button"], input, textarea'
    )
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    // Re-aplicar después de navegación
    const onPageLoad = () => {
      const newInteractives = document.querySelectorAll(
        'a, button, [role="button"], input, textarea'
      )
      newInteractives.forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    document.addEventListener('astro:page-load', onPageLoad)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('astro:page-load', onPageLoad)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}
