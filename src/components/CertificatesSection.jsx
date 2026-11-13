import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PDFViewer from './PDFViewer'

export default function CertificatesSection() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(null)
  const certificates = t('certificates.items', { returnObjects: true })
  const order = ['masterclass', 'ai-dla-ceo', 'produkty-ai', 'data-scientist']
  return (
    <section id="certificates" className="section container certificates-section" aria-labelledby="certificates-title">
      <div className="section-heading compact-heading"><p className="eyebrow"><span className="section-number">05 /</span>{t('certificates.label')}</p><div><h2 id="certificates-title">{t('certificates.title')}</h2></div></div>
      <div className="certificate-list">
        {order.map((slug) => certificates.find((item) => item.slug === slug)).map((item) => (
          <article className="certificate-row glass-card" key={item.slug}>
            <p className="certificate-date">{item.date_display}</p>
            <div className="certificate-name"><h3>{item.title}</h3><p>{item.issuer}</p></div>
            <div className="certificate-actions"><button type="button" className="text-link" onClick={() => setSelected(item)} aria-label={`${t('certificates.open')}: ${item.title}`}>PDF<span aria-hidden="true">↗</span></button><a className="quiet-link" href={item.pdf_url} download aria-label={`${t('ui.download')}: ${item.title}`}>{t('ui.download')}</a>{item.verify_url && <a className="quiet-link" href={item.verify_url} target="_blank" rel="noopener noreferrer" aria-label={`${t('certificates.verify')}: ${item.title}`}>{t('certificates.verify')}</a>}</div>
          </article>
        ))}
      </div>
      {selected && <PDFViewer pdfUrl={selected.pdf_url} title={selected.title} onClose={() => setSelected(null)} />}
    </section>
  )
}
