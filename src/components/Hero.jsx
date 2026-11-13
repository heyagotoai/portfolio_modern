import { useTranslation } from 'react-i18next'
import { motion as Motion, useReducedMotion } from 'framer-motion'

export default function Hero() {
  const { t } = useTranslation()
  const roles = t('hero.roles', { returnObjects: true }).slice(0, 2)
  const stats = t('hero.stats', { returnObjects: true })
  const reduced = useReducedMotion()
  const item = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.35, ease: 'easeOut' } },
  }

  return <section id="about" className="hero dot-grid" aria-labelledby="hero-title">
    <Motion.div className="hero-content container" initial={reduced ? false : 'hidden'} animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : 0.055 } } }}>
      <Motion.p className="section-label" variants={item}>{t('hero.greeting')}</Motion.p>
      <Motion.h1 id="hero-title" variants={item}>{t('hero.name')}</Motion.h1>
      <Motion.div className="hero-roles" variants={item}>{roles.map((role) => <p key={role}>{role}</p>)}</Motion.div>
      <Motion.p className="hero-intro" variants={item}>{t('hero.intro')}</Motion.p>
      <Motion.div className="hero-links" variants={item}>
        <a className="button button-primary" href="#projects">{t('hero.cta_projects')}<span aria-hidden="true">{String.fromCharCode(8594)}</span></a>
        <a className="button button-outline" href="#contact">{t('hero.cta_contact')}</a>
      </Motion.div>
      <Motion.div className="hero-facts" variants={item}>
        {stats.map((stat) => <div className="hero-fact" key={stat.label}><p className="stat-value">{stat.value}</p><p className="stat-label">{stat.label}</p></div>)}
      </Motion.div>
    </Motion.div>
  </section>
}
