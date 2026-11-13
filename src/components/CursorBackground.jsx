import { useEffect, useRef } from 'react'
import usePointerMotion from '../hooks/usePointerMotion'

const COLS = 28
const ROWS = 18
const REACH = 140

export default function CursorBackground() {
  const canvasRef = useRef(null)
  const enabled = usePointerMotion()

  useEffect(() => {
    if (!enabled) return
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return
    let width = 0
    let height = 0
    let frame = null
    let pointer = null
    let target = null

    const draw = () => {
      frame = null
      if (document.hidden) return
      if (target && pointer) {
        pointer.x += (target.x - pointer.x) * 0.2
        pointer.y += (target.y - pointer.y) * 0.2
      }
      context.clearRect(0, 0, width, height)
      for (let row = 0; row < ROWS; row++) {
        for (let column = 0; column < COLS; column++) {
          const x = column * width / (COLS - 1)
          const y = row * height / (ROWS - 1)
          const proximity = pointer ? Math.max(0, 1 - Math.hypot(pointer.x - x, pointer.y - y) / REACH) : 0
          context.beginPath()
          context.arc(x, y, 1 + proximity * 1.4, 0, Math.PI * 2)
          context.fillStyle = `rgba(163, 230, 53, ${0.035 + proximity * 0.315})`
          context.fill()
        }
      }
      // Draw only while the pointer is settling, never run an idle animation loop.
      if (target && pointer && Math.hypot(target.x - pointer.x, target.y - pointer.y) > 0.2) schedule()
    }
    const schedule = () => {
      if (frame === null && !document.hidden) frame = requestAnimationFrame(draw)
    }
    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      schedule()
    }
    const move = (event) => {
      if (event.pointerType !== 'mouse') return
      target = { x: event.clientX, y: event.clientY }
      if (!pointer) pointer = { ...target }
      schedule()
    }
    const reset = () => {
      pointer = null
      target = null
      schedule()
    }
    const leave = (event) => { if (!event.relatedTarget) reset() }
    const visibility = () => {
      if (document.hidden) {
        if (frame !== null) cancelAnimationFrame(frame)
        frame = null
      } else reset()
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerout', leave)
    window.addEventListener('blur', reset)
    document.addEventListener('visibilitychange', visibility)
    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerout', leave)
      window.removeEventListener('blur', reset)
      document.removeEventListener('visibilitychange', visibility)
      context.clearRect(0, 0, width, height)
    }
  }, [enabled])

  return <canvas ref={canvasRef} className="cursor-background" hidden={!enabled} aria-hidden="true" />
}
