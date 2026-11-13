import { createElement, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CursorBackground from './CursorBackground'

const NAV_ITEMS = [
  { key: 'about', icon: UserIcon },
  { key: 'projects', icon: GridIcon },
  { key: 'experience', icon: ChartIcon },
  { key: 'skills', icon: CodeIcon },
  { key: 'certificates', icon: MedalIcon },
  { key: 'contact', icon: MailIcon },
]

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}
function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}
function CodeIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18" />
  </svg>
}
function ChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}
function MedalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3l-2 5M17 3l2 5" />
      <circle cx="12" cy="14" r="6" />
      <path d="M9 13l2 2 4-4" />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  )
}

export default function Layout({ children }) {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('about')
  const language = i18n.resolvedLanguage === 'en' ? 'en' : 'pl'

  useEffect(() => {
    document.documentElement.lang = language
    document.title = t('meta.title')
    for (const [selector, value] of [
      ['meta[name="description"]', t('meta.description')],
      ['meta[property="og:title"]', t('meta.title')],
      ['meta[property="og:description"]', t('meta.description')],
      ['meta[property="og:locale"]', language === 'pl' ? 'pl_PL' : 'en_US'],
      ['meta[name="twitter:title"]', t('meta.title')],
      ['meta[name="twitter:description"]', t('meta.description')],
    ]) document.querySelector(selector)?.setAttribute('content', value)
  }, [language, t])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
      if (visible.length) setActive(visible[0].target.id)
    }, { rootMargin: '-15% 0px -65% 0px' })
    NAV_ITEMS.forEach(({ key }) => {
      const element = document.getElementById(key)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        document.getElementById('menu-toggle')?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const brand = <a className="wordmark" href="#about" onClick={() => setMenuOpen(false)} aria-label={t('ui.home')}>
    <span className="monogram" aria-hidden="true">MS</span>
    <span className="brand-name">{t('hero.name')}<span className="brand-caption">DATA / AI</span></span>
  </a>
  const languages = <div className="language-switch" role="group" aria-label={t('ui.language')}>
    {['pl', 'en'].map((lng) => <button key={lng} type="button" lang={lng}
      aria-pressed={language === lng} onClick={() => i18n.changeLanguage(lng)}>{lng.toUpperCase()}</button>)}
  </div>
  const links = NAV_ITEMS.map(({ key, icon }) => <a key={key} href={`#${key}`}
    className={`nav-link${active === key ? ' active' : ''}`} aria-current={active === key ? 'location' : undefined}
    onClick={() => { setActive(key); setMenuOpen(false) }}>
    <span aria-hidden="true">{createElement(icon)}</span>{t(`nav.${key}`)}
  </a>)

  return <div className="site-layout">
    <CursorBackground />
    <a className="skip-link" href="#main">{t('ui.skip')}</a>
    <aside className="desktop-sidebar">
      {brand}
      <nav className="sidebar-navigation" aria-label={t('ui.navigation')}>{links}</nav>
      {languages}
    </aside>
    <header className="mobile-header">
      {brand}
      <div className="header-actions">{languages}
        <button id="menu-toggle" className="menu-toggle" type="button" aria-expanded={menuOpen}
          aria-controls="main-navigation" aria-label={menuOpen ? t('ui.close') : t('ui.menu')}
          onClick={() => setMenuOpen(!menuOpen)}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d={menuOpen ? 'M5 5l12 12M17 5L5 17' : 'M3 6h16M3 11h16M3 16h16'} strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
    <nav id="main-navigation" className={`mobile-navigation${menuOpen ? ' is-open' : ''}`} aria-label={t('ui.navigation')} hidden={!menuOpen}>{links}</nav>
    <main id="main" tabIndex={-1}>{children}</main>
  </div>
}
