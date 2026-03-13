import { useTranslation } from 'react-i18next'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import NotebookViewer from './NotebookViewer'

function EDACard({ item, index, onOpen }) {
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
    <div style={{ perspective: '600px' }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        style={{
          rotateX, rotateY,
          transformStyle: 'preserve-3d',
          boxShadow: useTransform(
            [shadowX, shadowY],
            ([x, y]) =>
              `${x}px ${y}px 40px rgba(0,0,0,0.6), 0 2px 0 rgba(255,255,255,0.06) inset, 0 -2px 0 rgba(0,255,136,0.15) inset, ${x * 0.4}px ${y * 0.4}px 0px 1px rgba(0,255,136,0.08)`
          )
        }}
        className="glass-card overflow-hidden group cursor-default relative"
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
        <div className="h-28 bg-black/40 relative overflow-hidden flex items-center justify-center">
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-contain p-4 opacity-50 group-hover:opacity-70 transition-opacity"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="p-6" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
          <p className="text-brand-gray text-sm leading-relaxed mb-4">{item.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {item.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpen}
              className="inline-flex items-center gap-2 text-brand-green font-mono text-xs tracking-widest uppercase hover:gap-3 transition-all duration-200"
            >
              Otwórz
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href={item.notebook_url}
              download
              className="inline-flex items-center gap-2 text-brand-gray font-mono text-xs tracking-widest uppercase hover:text-white transition-colors duration-200"
            >
              Pobierz
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 3v8M3 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function EDASection() {
  const { t } = useTranslation()
  const items = t('eda.items', { returnObjects: true })
  const [openNotebook, setOpenNotebook] = useState(null)

  return (
    <section id="eda" className="relative py-24 px-8 lg:px-16">
      <div className="absolute top-0 left-8 lg:left-16 right-8 lg:right-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-4">{t('eda.title')}</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {t('eda.subtitle')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <EDACard
              key={item.slug}
              item={item}
              index={i}
              onOpen={() => setOpenNotebook(item)}
            />
          ))}
        </div>
      </div>

      {openNotebook && (
        <NotebookViewer
          notebookUrl={openNotebook.notebook_url}
          title={openNotebook.title}
          onClose={() => setOpenNotebook(null)}
        />
      )}
    </section>
  )
}
