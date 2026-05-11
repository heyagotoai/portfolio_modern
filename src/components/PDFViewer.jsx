import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PDFViewer({ pdfUrl, title, downloadLabel = 'Pobierz', onClose }) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-start justify-center"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-5xl mx-4 my-8 rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(18,18,18,0.98), rgba(10,10,10,0.99))',
            border: '1px solid rgba(255,255,255,0.08)',
            borderTop: '1px solid rgba(255,255,255,0.15)',
            maxHeight: 'calc(100vh - 64px)',
            display: 'flex',
            flexDirection: 'column',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-white/5 flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-brand-green font-mono text-[10px] tracking-widest uppercase flex-shrink-0">Certyfikat</span>
              <h2 className="text-white font-bold text-lg truncate">{title}</h2>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={pdfUrl}
                download
                className="hidden sm:inline-flex items-center gap-2 text-brand-gray hover:text-brand-green font-mono text-xs tracking-widest uppercase border border-white/10 hover:border-brand-green/40 rounded px-3 py-1.5 transition-colors"
              >
                {downloadLabel}
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2v7M3 7l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <button
                onClick={onClose}
                className="text-brand-gray hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded border border-white/10 hover:border-white/20"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 2l10 10M12 2L2 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* PDF iframe — #view=Fit fits whole page in viewer (Chrome/Edge/Firefox native) */}
          <div className="flex-1 bg-black/40" style={{ aspectRatio: '1.4 / 1', minHeight: '50vh' }}>
            <iframe
              src={`${pdfUrl}#view=Fit&toolbar=0&navpanes=0`}
              title={title}
              className="w-full h-full"
              style={{ border: 'none' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
