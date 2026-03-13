import { useEffect, useRef } from 'react'

const COLS = 28
const ROWS = 18
const DOT_RADIUS = 1.5
const MAX_DIST = 100
const GLOW_COLOR = '0, 255, 136' // brand-green

export default function CursorBackground() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      const colGap = width / (COLS - 1)
      const rowGap = height / (ROWS - 1)

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const x = c * colGap
          const y = r * rowGap

          const dx = mouse.current.x - x
          const dy = mouse.current.y - y
          const dist = Math.sqrt(dx * dx + dy * dy)

          const proximity = Math.max(0, 1 - dist / MAX_DIST)
          const alpha = 0.08 + proximity * 0.7
          const radius = DOT_RADIUS + proximity * 2.5

          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${GLOW_COLOR}, ${alpha})`
          ctx.fill()

          if (proximity > 0.3) {
            ctx.shadowBlur = 8 * proximity
            ctx.shadowColor = `rgba(${GLOW_COLOR}, ${proximity * 0.6})`
            ctx.fill()
            ctx.shadowBlur = 0
          }
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  )
}
