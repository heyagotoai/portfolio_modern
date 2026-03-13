import { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    let timeout

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setWordIdx(w => (w + 1) % words.length)
    }

    setDisplay(current.slice(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return display
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
}

export default function Hero() {
  const { t } = useTranslation()
  const roles = t('hero.roles', { returnObjects: true })
  const stats = t('hero.stats', { returnObjects: true })
  const role = useTypewriter(roles)

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center dot-grid overflow-hidden pt-16 lg:pt-0"
    >
      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-brand-green/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-8 lg:px-16 py-20">
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="section-label mb-6"
        >
          {t('hero.greeting')}
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-5xl lg:text-7xl font-bold text-white leading-none tracking-tight mb-4"
        >
          {t('hero.name')}
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="h-12 flex items-center mb-8"
        >
          <span className="text-2xl lg:text-3xl font-mono text-brand-green">
            {role}
            <span className="animate-blink ml-0.5">_</span>
          </span>
        </motion.div>

        {/* Bio */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="max-w-xl mb-12 space-y-3"
        >
          {Array.isArray(t('hero.bio', { returnObjects: true }))
            ? t('hero.bio', { returnObjects: true }).map((para, i) => (
                <p key={i} className="text-brand-gray text-base lg:text-lg leading-relaxed">{para}</p>
              ))
            : <p className="text-brand-gray text-base lg:text-lg leading-relaxed">{t('hero.bio')}</p>
          }
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="flex flex-wrap gap-4 mb-16"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 bg-brand-green text-black font-semibold px-6 py-3 rounded-xl text-sm hover:bg-brand-green/90 transition-all duration-200 hover:scale-105"
          >
            {t('hero.cta_projects')}
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-white/20 text-white/80 px-6 py-3 rounded-xl text-sm hover:border-brand-green/50 hover:text-white transition-all duration-200"
          >
            {t('hero.cta_contact')}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
          className="grid grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-brand-gray text-[11px] font-mono tracking-wide leading-tight">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Skills floating section */}
        <SkillsInline />
      </div>
    </section>
  )
}

function SkillsInline() {
  const { t } = useTranslation()
  const categories = t('skills.categories', { returnObjects: true })

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.7 }}
      className="mt-20 pt-16 border-t border-white/5"
    >
      <p className="section-label mb-8">{t('skills.title')}</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {categories.map((cat, i) => (
          <div key={i}>
            <p className="text-brand-gray text-xs font-mono tracking-widest uppercase mb-3">{cat.name}</p>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span key={item} className="tag">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
