import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import NotebookViewer from './NotebookViewer'
import ProjectCard from './ProjectCard'

export default function EarlierProjects() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(null)
  const projects = t('projects.items', { returnObjects: true }).filter((item) => item.visible !== false && !['careerguide', 'wspolnik-demo'].includes(item.slug))
  return (
    <section id="earlier" className="section container archive-section" aria-labelledby="earlier-title">
      <div className="section-heading compact-heading">
        <p className="eyebrow"><span className="section-number">04 /</span>{t('earlier.label')}</p>
        <div><h2 id="earlier-title">{t('earlier.title')}</h2><p className="section-intro">{t('earlier.intro')}</p></div>
      </div>
      <div className="earlier-cards">
        {projects.filter((project) => ['polmaraton', 'audionotatki', 'piktobajki'].includes(project.slug)).map((project) => <ProjectCard key={project.slug} project={project} linked={false} />)}
      </div>
      <div className="archive-list">
        {projects.filter((project) => ['friends', 'zestawienia'].includes(project.slug)).map((project) => (
          <div className="archive-row" key={project.slug}>
            <span className="archive-name">{project.title}<span className="archive-type">{project.subtitle}</span></span>
            <span className="archive-description">{project.description}</span>
          </div>
        ))}
      </div>
      <details className="notebooks" id="eda">
        <summary><span>{t('eda.title')}<span className="summary-count">02</span></span><span className="details-indicator" aria-hidden="true" /></summary>
        <p className="notebook-intro">{t('eda.subtitle')}</p>
        {t('eda.items', { returnObjects: true }).map((item) => (
          <div className="notebook-row" key={item.slug}>
            <div><h3>{item.title}</h3><p>{item.description}</p></div>
            <div className="notebook-actions"><button className="text-link" type="button" onClick={() => setSelected(item)}>{t('ui.preview')}<span aria-hidden="true">↗</span></button><a className="quiet-link" href={item.notebook_url} download>{t('ui.download')} .ipynb</a></div>
          </div>
        ))}
      </details>
      {selected && <NotebookViewer key={selected.slug} notebookUrl={selected.notebook_url} title={selected.title} onClose={() => setSelected(null)} />}
    </section>
  )
}
