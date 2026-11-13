import { useTranslation } from 'react-i18next'

export default function Experience() {
  const { t } = useTranslation()
  return (
    <section id="experience" className="experience-section" aria-labelledby="experience-title">
      <div className="container section">
        <div className="section-heading">
          <p className="eyebrow"><span className="section-number">02 /</span>{t('experience.label')}</p>
          <div><h2 id="experience-title">{t('experience.title')}</h2></div>
        </div>
        <div className="experience-body">
          <div className="experience-context">
            <p className="eyebrow">Crait / {t('hero.crait_role')}</p>
            <h3>{t('experience.statement')}</h3><p className="experience-intro">{t('experience.intro')}</p>
            <p>{t('experience.background')}</p>
            <a className="text-link" href="https://crait.pl" target="_blank" rel="noopener noreferrer">{t('experience.crait_link')}<span aria-hidden="true">↗</span></a>
          </div>
          <ol className="practice-list">
            {t('experience.practices', { returnObjects: true }).map((item, index) => (
              <li className="glass-card" key={item.title}><span className="practice-number">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
