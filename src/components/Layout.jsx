import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import CursorBackground from './CursorBackground'

const NAV_ITEMS = [
  { key: 'about', href: '#about', icon: UserIcon },
  { key: 'projects', href: '#projects', icon: GridIcon },
  { key: 'eda', href: '#eda', icon: ChartIcon },
  { key: 'contact', href: '#contact', icon: MailIcon },
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
function ChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
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
  const [active, setActive] = useState('about')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'eda', 'contact']
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'pl' ? 'en' : 'pl')
  }

  return (
    <div className="flex min-h-screen">
      <CursorBackground />
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-shrink-0 flex-col fixed top-0 left-0 h-full z-50 border-r border-white/5 bg-black/40 backdrop-blur-sm">
        {/* Logo */}
        <div className="p-8 pb-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full border border-brand-green/40 flex items-center justify-center text-brand-green font-mono font-bold text-lg green-glow">
              MS
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">Marcin Szczęsny</p>
              <p className="text-brand-gray text-[10px] font-mono tracking-widest">DATA / AI</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-8 py-10 relative">
          {/* Vertical line */}
          <div className="absolute left-[38px] top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          <ul className="space-y-6">
            {NAV_ITEMS.map(({ key, href, icon: Icon }) => (
              <li key={key}>
                <a
                  href={href}
                  onClick={() => setActive(key)}
                  className={`nav-link flex items-center gap-4 group ${active === key ? 'active' : ''}`}
                >
                  <span className={`flex-shrink-0 transition-colors duration-200 ${active === key ? 'text-brand-green' : 'text-white/30 group-hover:text-white/60'}`}>
                    <Icon />
                  </span>
                  <span>{t(`nav.${key}`)}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <button
              onClick={toggleLang}
              className="font-mono text-sm tracking-widest text-white/60 hover:text-brand-green transition-colors duration-200 border border-white/15 hover:border-brand-green/40 rounded px-5 py-2"
            >
              {i18n.language === 'pl' ? 'EN' : 'PL'}
            </button>
          </div>
        </nav>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-brand-green/40 flex items-center justify-center text-brand-green font-mono font-bold text-sm">
            MS
          </div>
          <span className="text-white font-semibold text-sm">Marcin Szczęsny</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="font-mono text-[11px] tracking-widest text-brand-gray hover:text-brand-green transition-colors border border-white/10 hover:border-brand-green/40 rounded px-2 py-1"
          >
            {i18n.language === 'pl' ? 'EN' : 'PL'}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileOpen ? (
                <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
              ) : (
                <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <div className="lg:hidden fixed top-[60px] left-0 right-0 z-40 bg-black/95 backdrop-blur-sm border-b border-white/5">
          <ul className="px-6 py-4 space-y-3">
            {NAV_ITEMS.map(({ key, href, icon: Icon }) => (
              <li key={key}>
                <a
                  href={href}
                  onClick={() => { setActive(key); setMobileOpen(false) }}
                  className={`nav-link flex items-center gap-3 py-2 ${active === key ? 'active' : ''}`}
                >
                  <span className={active === key ? 'text-brand-green' : 'text-white/30'}>
                    <Icon />
                  </span>
                  {t(`nav.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-64">
        {children}
      </main>
    </div>
  )
}
