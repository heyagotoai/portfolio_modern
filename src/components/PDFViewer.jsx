import { useTranslation } from 'react-i18next'
import DocumentDialog from './DocumentDialog'

export default function PDFViewer({ pdfUrl, title, onClose }) {
  const { t } = useTranslation()
  return (
    <DocumentDialog title={title} label={t('certificates.label')} fileUrl={pdfUrl} onClose={onClose}>
      <iframe className="pdf-frame" src={`${pdfUrl}#view=Fit&toolbar=0&navpanes=0`} title={title} />
      <p className="pdf-fallback">{t('ui.pdf_fallback')} <a className="quiet-link" href={pdfUrl} target="_blank" rel="noopener noreferrer">{t('ui.open_file')} ↗</a></p>
    </DocumentDialog>
  )
}
