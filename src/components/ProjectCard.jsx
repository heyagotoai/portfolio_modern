import { motion } from 'framer-motion'

export default function ProjectCard({ project, index, style = {} }) {
  const rotations = [-2, 2, -1.5, 1.5, -2.5]
  const rotation = rotations[index % rotations.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: rotation }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      style={style}
      className="glass-card overflow-hidden cursor-pointer group"
    >
      {/* Image */}
      <div className="relative h-28 overflow-hidden bg-zinc-900 flex items-center justify-center">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain p-4 opacity-85 group-hover:opacity-100 transition-opacity duration-300"
            onError={(e) => { e.target.style.display = 'none' }}
          />
        ) : null}
        {/* Color overlay */}
        <div
          className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
          style={{ background: `linear-gradient(135deg, ${project.color}40, transparent)` }}
        />
        {/* Corner accent */}
        <div
          className="absolute top-3 right-3 w-2 h-2 rounded-full"
          style={{ backgroundColor: project.color, boxShadow: `0 0 8px ${project.color}` }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-brand-gray text-[10px] font-mono tracking-widest uppercase mb-1">{project.subtitle}</p>
        <h3 className="text-white font-bold text-xl tracking-wide mb-2">{project.title}</h3>
        <p className="text-brand-gray text-sm leading-relaxed mb-4 line-clamp-3">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* Link */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-brand-green font-mono text-xs tracking-widest uppercase hover:gap-3 transition-all duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          Open app
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </motion.div>
  )
}
