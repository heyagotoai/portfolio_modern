import { useTranslation } from 'react-i18next'
import ProjectCard from './ProjectCard'
import Solutions from './Solutions'

export default function ProjectsGrid() {
  const { t } = useTranslation()
  const items = t('projects.items', { returnObjects: true })
  const projects = ['careerguide', 'wspolnik-demo'].map((slug) => items.find((item) => item.slug === slug)).filter(Boolean)

  return <section id="projects" className="section container" aria-labelledby="projects-title">
    <div className="section-heading">
      <p className="section-label"><span className="section-number">01 /</span>{t('projects.label')}</p>
      <h2 id="projects-title">{t('projects.title')}</h2>
      <p className="section-intro">{t('projects.subtitle')}</p>
    </div>
    <div className="featured-projects">
      {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
    </div>
    <Solutions />
  </section>
}
