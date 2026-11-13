import { useEffect, useId, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function DocumentDialog({ title, label, fileUrl, onClose, children }) {
  const { t } = useTranslation()
  const ref = useRef(null)
  const titleId = useId()
  useEffect(() => {
    const dialog = ref.current
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement
    dialog.showModal()
    dialog.querySelector('button')?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [])

  const closeFromBackdrop = (event) => {
    if (event.target !== ref.current) return
    const rect = ref.current.getBoundingClientRect()
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose()
  }

  return (
    <dialog ref={ref} className="document-dialog" aria-labelledby={titleId} onClick={closeFromBackdrop}
      onCancel={(event) => { event.preventDefault(); onClose() }}>
      <div className="dialog-header">
        <div><p className="eyebrow">{label}</p><h2 id={titleId}>{title}</h2></div>
        <div className="dialog-actions">
          <a className="quiet-link" href={fileUrl} download>{t('ui.download')}</a>
          <button type="button" className="dialog-close" onClick={onClose} aria-label={t('ui.close')}>×</button>
        </div>
      </div>
      {children}
    </dialog>
  )
}
