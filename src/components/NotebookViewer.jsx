import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// --- Minimal markdown → HTML (no library needed) ---
function renderMarkdown(text) {
  return text
    .replace(/^######\s(.+)/gm, '<h6 class="text-xs font-bold text-white/70 mt-3 mb-1">$1</h6>')
    .replace(/^#####\s(.+)/gm, '<h5 class="text-sm font-bold text-white/80 mt-3 mb-1">$1</h5>')
    .replace(/^####\s(.+)/gm, '<h4 class="text-base font-bold text-white/80 mt-4 mb-1">$1</h4>')
    .replace(/^###\s(.+)/gm, '<h3 class="text-lg font-bold text-white mt-4 mb-2">$1</h3>')
    .replace(/^##\s(.+)/gm, '<h2 class="text-xl font-bold text-white mt-5 mb-2 border-b border-white/10 pb-1">$1</h2>')
    .replace(/^#\s(.+)/gm, '<h1 class="text-2xl font-bold text-white mt-6 mb-3">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="text-white/80 italic">$1</em>')
    .replace(/`([^`]+)`/g, '<code class="text-brand-green bg-black/40 px-1 rounded text-[12px] font-mono">$1</code>')
    .replace(/^\s*[-*]\s(.+)/gm, '<li class="text-brand-gray text-sm ml-4 list-disc">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, (m) => `<ul class="my-2 space-y-1">${m}</ul>`)
    .replace(/\n\n/g, '<br/><br/>')
}

function MarkdownCell({ source, basePath }) {
  let text = Array.isArray(source) ? source.join('') : source
  // Resolve relative <img src="..."> to basePath
  text = text.replace(/<img\s([^>]*?)src="(?!http|data:)([^"]+)"([^>]*)>/g, (_, pre, src, post) => {
    const resolved = `${basePath}${src}`
    return `<img ${pre}src="${resolved}"${post} class="max-w-full rounded my-2 border border-white/5" />`
  })
  const html = renderMarkdown(text)
  return (
    <div
      className="px-1 py-2 text-brand-gray text-sm leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function CodeCell({ source, outputs }) {
  const code = Array.isArray(source) ? source.join('') : source

  return (
    <div className="my-3">
      {/* Code input */}
      <div className="rounded-lg overflow-hidden border border-white/5">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 border-b border-white/5">
          <span className="text-brand-green font-mono text-[10px] tracking-widest">IN</span>
        </div>
        <pre className="bg-black/40 p-4 overflow-x-auto text-[12px] font-mono text-white/70 leading-relaxed whitespace-pre">
          {code}
        </pre>
      </div>

      {/* Outputs */}
      {outputs && outputs.length > 0 && (
        <div className="mt-1 rounded-lg overflow-hidden border border-white/5">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 border-b border-white/5">
            <span className="text-brand-gray font-mono text-[10px] tracking-widest">OUT</span>
          </div>
          <div className="bg-black/20 p-4">
            {outputs.map((out, i) => {
              if (out.output_type === 'display_data' || out.output_type === 'execute_result') {
                if (out.data?.['image/png']) {
                  return (
                    <img
                      key={i}
                      src={`data:image/png;base64,${out.data['image/png']}`}
                      alt="output"
                      className="max-w-full rounded border border-white/5"
                    />
                  )
                }
                if (out.data?.['text/plain']) {
                  const txt = Array.isArray(out.data['text/plain'])
                    ? out.data['text/plain'].join('')
                    : out.data['text/plain']
                  return <pre key={i} className="text-[12px] font-mono text-white/60 whitespace-pre-wrap">{txt}</pre>
                }
              }
              if (out.output_type === 'stream') {
                const txt = Array.isArray(out.text) ? out.text.join('') : out.text
                return <pre key={i} className="text-[12px] font-mono text-white/60 whitespace-pre-wrap">{txt}</pre>
              }
              return null
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default function NotebookViewer({ notebookUrl, title, onClose }) {
  const basePath = notebookUrl.substring(0, notebookUrl.lastIndexOf('/') + 1)
  const [notebook, setNotebook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(notebookUrl)
      .then((r) => {
        if (!r.ok) throw new Error('Nie można wczytać notebooka')
        return r.json()
      })
      .then(setNotebook)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [notebookUrl])

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
          className="relative w-full max-w-4xl mx-4 my-8 rounded-2xl overflow-hidden"
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
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 flex-shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-brand-green font-mono text-[10px] tracking-widest uppercase">Notebook</span>
              <h2 className="text-white font-bold text-lg">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-brand-gray hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded border border-white/10 hover:border-white/20"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 2l10 10M12 2L2 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex-1 px-6 py-6">
            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="text-brand-gray font-mono text-sm animate-pulse">Wczytywanie notebooka...</div>
              </div>
            )}
            {error && (
              <div className="text-red-400 font-mono text-sm py-10 text-center">{error}</div>
            )}
            {notebook && notebook.cells.map((cell, i) => (
              <div key={i} className="mb-2">
                {cell.cell_type === 'markdown' && <MarkdownCell source={cell.source} basePath={basePath} />}
                {cell.cell_type === 'code' && <CodeCell source={cell.source} outputs={cell.outputs} />}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
