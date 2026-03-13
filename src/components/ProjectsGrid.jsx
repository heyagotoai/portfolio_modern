import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

export default function ProjectsGrid() {
  const { t } = useTranslation()
  const projects = t('projects.items', { returnObjects: true })

  // Asymmetric masonry layout classes — alternating sizes for visual variety
  const gridClasses = [
    'col-span-2 lg:col-span-2',  // large: 2 cols
    'col-span-2 lg:col-span-1',  // medium: 1 col
    'col-span-2 lg:col-span-1',  // medium: 1 col
    'col-span-2 lg:col-span-1',  // small: 1 col
    'col-span-2 lg:col-span-1',  // small: 1 col
  ]

  return (
    <section id="projects" className="relative py-24 px-8 lg:px-16 dot-grid">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-green/3 blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-4">{t('projects.title')}</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            {t('projects.subtitle')}
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <div key={project.slug} className={gridClasses[i] || 'col-span-2 lg:col-span-1'}>
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
