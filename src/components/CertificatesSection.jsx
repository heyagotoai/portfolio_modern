import { useTranslation } from 'react-i18next'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import PDFViewer from './PDFViewer'

function MedalGraphic() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
      <path d="M20 4l-6 14M44 4l6 14" opacity="0.6" />
      <circle cx="32" cy="36" r="16" />
      <circle cx="32" cy="36" r="10" opacity="0.5" />
      <path d="M26 34l4 4 8-8" />
    </svg>
  )
}

function CertificateCard({ item, index, labels, onOpen }) {
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
    <div style={{ perspective: '600px', '--shine-delay': `${index % 8}s` }} className="h-full">
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
        className="glass-card shine-sweep overflow-hidden group cursor-default relative h-full flex flex-col"
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

        {/* Visual header (medal + issuer) */}
        <div className="h-28 bg-zinc-900/60 relative overflow-hidden flex flex-col items-center justify-center gap-1">
          <p className="text-brand-gray/70 font-mono text-[10px] tracking-widest uppercase">{item.issuer}</p>
          <MedalGraphic />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </div>

        <div className="p-6 flex flex-col flex-1" style={{ transform: 'translateZ(30px)' }}>
          <h3 className="text-white font-bold text-xl mb-2 leading-tight">{item.title}</h3>
          <p className="text-brand-gray text-xs font-mono tracking-wide mb-3">{item.date_display}</p>
          {item.description && (
            <p className="text-brand-gray text-sm leading-relaxed mb-4">{item.description}</p>
          )}

          <div className="flex flex-wrap gap-1.5 mb-5">
            {item.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <div className="mt-auto flex items-center flex-wrap gap-4">
            <button
              onClick={onOpen}
              className="inline-flex items-center gap-2 text-brand-green font-mono text-xs tracking-widest uppercase hover:gap-3 transition-all duration-200"
            >
              {labels.open}
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href={item.pdf_url}
              download
              className="inline-flex items-center gap-2 text-brand-gray font-mono text-xs tracking-widest uppercase hover:text-white transition-colors duration-200"
            >
              {labels.download}
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 3v8M3 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            {item.verify_url && (
              <a
                href={item.verify_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-brand-gray/70 font-mono text-[11px] tracking-widest uppercase hover:text-brand-green transition-colors duration-200"
              >
                {labels.verify}
                <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3h5v5M8 3L3 8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function CertificatesSection() {
  const { t } = useTranslation()
  const items = t('certificates.items', { returnObjects: true })
  const [openCert, setOpenCert] = useState(null)

  const labels = {
    open: t('certificates.open'),
    download: t('certificates.download'),
    verify: t('certificates.verify'),
  }

  return (
    <section id="certificates" className="relative py-24 px-8 lg:px-16">
      <div className="absolute top-0 left-8 lg:left-16 right-8 lg:right-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-4">{t('certificates.title')}</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {t('certificates.subtitle')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <CertificateCard
              key={item.slug}
              item={item}
              index={i}
              labels={labels}
              onOpen={() => setOpenCert(item)}
            />
          ))}
        </div>
      </div>

      {openCert && (
        <PDFViewer
          pdfUrl={openCert.pdf_url}
          title={openCert.title}
          downloadLabel={labels.download}
          onClose={() => setOpenCert(null)}
        />
      )}
    </section>
  )
}
