import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function ProjectCard({ project, index, style = {} }) {
  const cardRef = useRef(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), { stiffness: 180, damping: 18 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), { stiffness: 180, damping: 18 })
  const shineX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%'])
  const shineY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%'])
  const shadowX = useTransform(mouseX, [-0.5, 0.5], [12, -12])
  const shadowY = useTransform(mouseY, [-0.5, 0.5], [-12, 12])

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div style={{ perspective: '600px', ...style }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
        style={{
          rotateX, rotateY,
          transformStyle: 'preserve-3d',
          boxShadow: useTransform(
            [shadowX, shadowY],
            ([x, y]) =>
              `${x}px ${y}px 40px rgba(0,0,0,0.6), 0 2px 0 rgba(255,255,255,0.06) inset, 0 -2px 0 rgba(0,255,136,0.15) inset, ${x * 0.4}px ${y * 0.4}px 0px 1px rgba(0,255,136,0.08)`
          )
        }}
        className="glass-card overflow-hidden cursor-pointer group relative"
      >
        {/* Shine overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [shineX, shineY],
              ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 40%, transparent 65%)`
            ),
          }}
        />

        {/* Edge highlight (top) */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-10" />

        {/* Image */}
        <div className="relative h-28 overflow-hidden bg-zinc-900/60 flex items-center justify-center">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-contain p-4 opacity-85 group-hover:opacity-100 transition-opacity duration-300"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          ) : null}
          <div
            className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-300"
            style={{ background: `linear-gradient(135deg, ${project.color}60, transparent)` }}
          />
          <div
            className="absolute top-3 right-3 w-2 h-2 rounded-full"
            style={{ backgroundColor: project.color, boxShadow: `0 0 8px ${project.color}` }}
          />
        </div>

        {/* Content */}
        <div className="p-5" style={{ transform: 'translateZ(30px)' }}>
          <p className="text-brand-gray text-[10px] font-mono tracking-widest uppercase mb-1">{project.subtitle}</p>
          <h3 className="text-white font-bold text-xl tracking-wide mb-2">{project.title}</h3>
          <p className="text-brand-gray text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-green font-mono text-xs tracking-widest uppercase hover:gap-3 transition-all duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            Open app
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </motion.div>
    </div>
  )
}
