import { useTranslation } from 'react-i18next'

export default function Solutions() {
  const { t } = useTranslation()
  return (
    <div className="solutions">
      <div className="solutions-heading"><h3>{t('solutions.title')}</h3><p>{t('solutions.intro')}</p></div>
      <div className="solutions-list">
        {t('solutions.items', { returnObjects: true }).map((item, index) => (
          <details key={item.name} className="solution glass-card" name="solutions" open={index === 0}>
            <summary><span className="solution-index">0{index + 1}</span><span className="solution-name">{item.name}<span>{item.subtitle}</span></span><span className="details-indicator" aria-hidden="true" /></summary>
            <div className="solution-body">
              <div><h4>{t('solutions.problem')}</h4><p>{item.problem}</p></div>
              <div><h4>{t('solutions.approach')}</h4><p>{item.approach}</p></div>
              <div><h4>{t('solutions.technology')}</h4><p>{item.technology}</p></div>
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
