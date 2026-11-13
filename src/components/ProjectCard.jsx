import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { motion as Motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import usePointerMotion from '../hooks/usePointerMotion'

export default function ProjectCard({ project, linked = true }) {
  const { t } = useTranslation()
  const enabled = usePointerMotion() && linked
  const reduced = useReducedMotion()
  const rotateX = useSpring(0, { stiffness: 180, damping: 26 })
  const rotateY = useSpring(0, { stiffness: 180, damping: 26 })
  const reflectionOpacity = useSpring(0, { stiffness: 180, damping: 26 })
  const pointerX = useMotionValue(50)
  const pointerY = useMotionValue(50)
  const reflection = useMotionTemplate`radial-gradient(ellipse at ${pointerX}% ${pointerY}%, rgba(255, 255, 255, 0.08), transparent 65%)`
  const reset = () => { rotateX.set(0); rotateY.set(0); reflectionOpacity.set(0) }

  useEffect(() => {
    if (!enabled) {
      rotateX.jump(0)
      rotateY.jump(0)
      reflectionOpacity.jump(0)
    }
  }, [enabled, rotateX, rotateY, reflectionOpacity])

  const move = (event) => {
    if (!enabled || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height))
    rotateX.set((0.5 - y) * 7)
    rotateY.set((x - 0.5) * 7)
    pointerX.set(x * 100)
    pointerY.set(y * 100)
    reflectionOpacity.set(1)
  }
  const id = project.slug === 'careerguide' ? 'career-guide' : project.slug === 'wspolnik-demo' ? 'wspolnik' : project.slug
  const Tag = linked ? Motion.a : Motion.article
  const linkProps = linked ? { href: project.url, target: '_blank', rel: 'noopener noreferrer', 'aria-labelledby': `${id}-title ${id}-link` } : { 'aria-labelledby': `${id}-title` }
  return <Tag className={`glass-card project-card${linked ? '' : ' is-static'}`} id={id} {...linkProps} initial={reduced ? false : { opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.06 }}
    transition={{ duration: reduced ? 0 : 0.35, ease: 'easeOut' }}
    style={{ rotateX: enabled ? rotateX : 0, rotateY: enabled ? rotateY : 0, transformPerspective: enabled ? 1000 : undefined }}
    onPointerMove={move} onPointerLeave={reset}
    onFocus={(event) => { if (event.currentTarget.matches(':focus-visible')) reset() }} onBlur={reset}>
    <Motion.span className="project-reflection" aria-hidden="true" style={{ background: reflection, opacity: enabled ? reflectionOpacity : 0 }} />
    <div className="project-illustration" aria-hidden="true">
      {project.image && <img src={project.image} alt="" loading="lazy" />}
    </div>
    <div className="project-content">
      <h3 id={`${id}-title`}>{project.title}</h3>
      <p className="project-role">{project.role || project.subtitle}</p>
      {project.scope && <dl className="project-scope">{project.scope.map((entry) => <div key={entry.label}>
        <dt>{entry.label}</dt><dd>{entry.value}</dd>
      </div>)}</dl>}
      <p className="project-description">{project.description}</p>
      <ul className="project-stack">{project.tags.map((tag) => <li className="tag" key={tag}>{tag}</li>)}</ul>
      {linked && project.demo && <p className="demo-note">{project.demo}</p>}
      {linked && <span className="project-link" id={`${id}-link`}>{project.link_label || t('projects.open_app')}<span aria-hidden="true">{String.fromCharCode(8594)}</span></span>}
    </div>
  </Tag>
}
