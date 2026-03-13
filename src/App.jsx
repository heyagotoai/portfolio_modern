import './i18n/index.js'
import Layout from './components/Layout'
import Hero from './components/Hero'
import ProjectsGrid from './components/ProjectsGrid'
import EDASection from './components/EDASection'
import Contact from './components/Contact'

export default function App() {
  return (
    <Layout>
      <Hero />
      <ProjectsGrid />
      <EDASection />
      <Contact />
    </Layout>
  )
}
