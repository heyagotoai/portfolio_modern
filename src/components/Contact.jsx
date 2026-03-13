import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export default function Contact() {
  const { t } = useTranslation()
  const availabilityItems = t('contact.availability_items', { returnObjects: true })

  return (
    <section id="contact" className="relative py-24 px-8 lg:px-16">
      {/* Divider */}
      <div className="absolute top-0 left-8 lg:left-16 right-8 lg:right-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-brand-green/8 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="section-label mb-4">{t('contact.title')}</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {t('contact.subtitle')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Availability */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-8"
          >
            <p className="text-brand-gray text-xs font-mono tracking-widest uppercase mb-6">
              {t('contact.availability')}
            </p>
            <ul className="space-y-4">
              {availabilityItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                  <span className="flex-shrink-0 mt-1 w-4 h-4 rounded-full border border-brand-green/40 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 flex flex-col justify-between"
          >
            <div className="space-y-5">
              {/* Email */}
              <a
                href={`mailto:${t('contact.email')}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl border border-white/10 group-hover:border-brand-green/40 flex items-center justify-center transition-colors">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-gray group-hover:text-brand-green transition-colors">
                    <rect x="2" y="4" width="14" height="10" rx="1.5" />
                    <path d="M2 5l7 5 7-5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-brand-gray tracking-widest uppercase">Email</p>
                  <p className="text-white text-sm group-hover:text-brand-green transition-colors">{t('contact.email')}</p>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={t('contact.github')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl border border-white/10 group-hover:border-brand-green/40 flex items-center justify-center transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-brand-gray group-hover:text-brand-green transition-colors">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-brand-gray tracking-widest uppercase">GitHub</p>
                  <p className="text-white text-sm group-hover:text-brand-green transition-colors">heyagotoai</p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={t('contact.linkedin')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl border border-white/10 group-hover:border-brand-green/40 flex items-center justify-center transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-brand-gray group-hover:text-brand-green transition-colors">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-brand-gray tracking-widest uppercase">LinkedIn</p>
                  <p className="text-white text-sm group-hover:text-brand-green transition-colors">marcin-szczesny-ai</p>
                </div>
              </a>
            </div>

            <a
              href={`mailto:${t('contact.email')}`}
              className="mt-8 w-full bg-brand-green text-black font-semibold py-3 px-6 rounded-xl text-sm text-center hover:bg-brand-green/90 transition-all duration-200 hover:scale-105 inline-block"
            >
              {t('contact.cta')} →
            </a>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-brand-gray text-xs font-mono tracking-wider">
            © 2026 {t('footer.rights')}
          </p>
          <p className="text-brand-gray text-xs font-mono tracking-wider">
            {t('footer.built_with')} React {t('footer.and')} Tailwind CSS
          </p>
        </motion.div>
      </div>
    </section>
  )
}
