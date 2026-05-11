import './i18n/index.js'
import Layout from './components/Layout'
import Hero from './components/Hero'
import ProjectsGrid from './components/ProjectsGrid'
import EDASection from './components/EDASection'
import CertificatesSection from './components/CertificatesSection'
import Contact from './components/Contact'

export default function App() {
  return (
    <Layout>
      <Hero />
      <ProjectsGrid />
      <EDASection />
      <CertificatesSection />
      <Contact />
    </Layout>
  )
}
