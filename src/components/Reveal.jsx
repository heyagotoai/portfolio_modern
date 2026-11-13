import { motion as Motion, useReducedMotion } from 'framer-motion'

export default function Reveal({ children }) {
  const reduced = useReducedMotion()
  return (
    <Motion.div className="section-reveal" initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 'some' }}
      transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </Motion.div>
  )
}
