import { useTranslation } from 'react-i18next'

export default function Skills() {
  const { t } = useTranslation()
  return (
    <section id="skills" className="section container" aria-labelledby="skills-title">
      <div className="section-heading">
        <p className="eyebrow"><span className="section-number">03 /</span>{t('skills.label')}</p>
        <div><h2 id="skills-title">{t('skills.title')}</h2><p className="section-intro">{t('skills.intro')}</p></div>
      </div>
      <dl className="skills-list">
        {t('skills.categories', { returnObjects: true }).map((category) => (
          <div className="skill-category" key={category.name}><dt>{category.name}</dt><dd>{category.items.map((item) => <span className="tag" key={item}>{item}</span>)}</dd></div>
        ))}
      </dl>
    </section>
  )
}
