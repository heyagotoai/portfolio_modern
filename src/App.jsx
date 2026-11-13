import './i18n/index.js'
import { MotionConfig } from 'framer-motion'
import Layout from './components/Layout'
import Hero from './components/Hero'
import ProjectsGrid from './components/ProjectsGrid'
import Experience from './components/Experience'
import Skills from './components/Skills'
import EarlierProjects from './components/EarlierProjects'
import CertificatesSection from './components/CertificatesSection'
import Contact from './components/Contact'
import Reveal from './components/Reveal'

export default function App() {
  return (
    <MotionConfig reducedMotion="user"><Layout>
      <Hero />
      <Reveal><ProjectsGrid /></Reveal>
      <Reveal><Experience /></Reveal>
      <Reveal><Skills /></Reveal>
      <Reveal><EarlierProjects /></Reveal>
      <Reveal><CertificatesSection /></Reveal>
      <Reveal><Contact /></Reveal>
    </Layout></MotionConfig>
  )
}
