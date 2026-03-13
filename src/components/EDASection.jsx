import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export default function EDASection() {
  const { t } = useTranslation()
  const items = t('eda.items', { returnObjects: true })

  return (
    <section id="eda" className="relative py-24 px-8 lg:px-16">
      {/* Divider line */}
      <div className="absolute top-0 left-8 lg:left-16 right-8 lg:right-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-4">{t('eda.title')}</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {t('eda.subtitle')}
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 32, rotate: i === 0 ? -1 : 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: i === 0 ? -1 : 1 }}
              whileHover={{ rotate: 0, y: -4, scale: 1.01 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card overflow-hidden group cursor-default"
            >
              {/* Image */}
              <div className="h-28 bg-black/40 relative overflow-hidden flex items-center justify-center">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain p-4 opacity-50 group-hover:opacity-70 transition-opacity"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-brand-gray text-sm leading-relaxed mb-4">{item.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                {/* Notebook download link */}
                <a
                  href={item.notebook_url}
                  download
                  className="inline-flex items-center gap-2 text-brand-green font-mono text-xs tracking-widest uppercase hover:gap-3 transition-all duration-200"
                >
                  Pobierz Notebook
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 3v8M3 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
