import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import DocumentDialog from './DocumentDialog'

const sourceText = (source) => Array.isArray(source) ? source.join('') : (source || '')

// Notebook text stays React text; HTML and scripts from a file never execute.
function MarkdownCell({ source, basePath }) {
  return <div className="notebook-markdown">{sourceText(source).split('\n').map((line, index) => {
    const image = line.match(/<img\s[^>]*src=["']([^"']+)["']/i)
    if (image) {
      const path = image[1]
      if (!/^(?:https?:|data:|\/\/)/i.test(path) && !path.includes('..')) return <img key={index} src={`${basePath}${path.replace(/^\//, '')}`} alt="" loading="lazy" />
    }
    const heading = line.match(/^#{1,6}\s+(.+)/)
    if (heading) return <h3 key={index}>{heading[1]}</h3>
    return <p key={index}>{line || '\u00a0'}</p>
  })}</div>
}

function CodeCell({ cell }) {
  return <div className="notebook-code">
    <span className="cell-label">IN</span><pre><code>{sourceText(cell.source)}</code></pre>
    {cell.outputs?.length > 0 && <div className="notebook-output">{cell.outputs.map((output, index) => {
      if (output.data?.['image/png']) return <img key={index} src={`data:image/png;base64,${sourceText(output.data['image/png'])}`} alt="" loading="lazy" />
      const text = output.data?.['text/plain'] || output.text
      return text ? <pre key={index}>{sourceText(text)}</pre> : null
    })}</div>}
  </div>
}

export default function NotebookViewer({ notebookUrl, title, onClose }) {
  const { t } = useTranslation()
  const [notebook, setNotebook] = useState(null)
  const [error, setError] = useState(false)
  const basePath = notebookUrl.substring(0, notebookUrl.lastIndexOf('/') + 1)
  useEffect(() => {
    const controller = new AbortController()
    fetch(notebookUrl, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error('notebook'); return response.json() })
      .then((data) => { if (!Array.isArray(data.cells)) throw new Error('notebook'); setNotebook(data) })
      .catch((cause) => { if (cause.name !== 'AbortError') setError(true) })
    return () => controller.abort()
  }, [notebookUrl])
  return (
    <DocumentDialog title={title} label="Jupyter Notebook" fileUrl={notebookUrl} onClose={onClose}>
      <div className="notebook-body">
        {!notebook && !error && <p className="notebook-status" role="status">{t('ui.loading')}</p>}
        {error && <p className="notebook-status" role="alert">{t('ui.load_error')} <a className="quiet-link" href={notebookUrl} download>{t('ui.download')}</a></p>}
        {notebook?.cells.map((cell, index) => cell.cell_type === 'markdown'
          ? <MarkdownCell key={index} source={cell.source} basePath={basePath} />
          : cell.cell_type === 'code' ? <CodeCell key={index} cell={cell} /> : null)}
      </div>
    </DocumentDialog>
  )
}
