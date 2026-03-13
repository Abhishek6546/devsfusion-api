import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Calendar } from 'lucide-react';
import { projects } from '../data/projects';

/* ─── Project card ───────────────────────────────────────────────────────── */
const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.93 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full"
    >
      <div className="
        relative h-full flex flex-col rounded-2xl overflow-hidden
        bg-white dark:bg-[#161b27]
        border border-[#dbe4ff] dark:border-[#2a3550]
        shadow-[0_2px_16px_rgba(59,91,219,0.06)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.4)]
        hover:shadow-[0_8px_40px_rgba(59,91,219,0.18)] dark:hover:shadow-[0_8px_40px_rgba(59,91,219,0.25)]
        hover:-translate-y-1.5 transition-all duration-400
      ">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-[#eef2ff] dark:bg-[#1a2035]">
          <img
            src={project.imageLink}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/80 via-[#3b5bdb]/30 to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
            flex items-end justify-between p-4"
          >
            <span className="text-white text-sm font-semibold tracking-wide">View project</span>
            <div className="flex gap-2">
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/20 backdrop-blur border border-white/30
                    flex items-center justify-center text-white hover:bg-white hover:text-[#3b5bdb] transition-all duration-200"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-base font-bold text-[#1a2a5e] dark:text-[#e8eeff] leading-snug">
              {project.title}
            </h3>
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer"
                className="shrink-0 mt-0.5 text-[#748ffc] dark:text-[#7c93f0] hover:text-[#3b5bdb] dark:hover:text-white transition-colors"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
          <p className="text-sm text-[#5a6b9a] dark:text-[#8896c0] leading-relaxed flex-grow">
            {project.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main ───────────────────────────────────────────────────────────────── */
const Portfolio = () => {
  return (
    <div className="min-h-screen bg-[#f8faff] dark:bg-[#0d1117] text-[#1a2a5e] dark:text-[#e8eeff] transition-colors duration-300">

      {/* ── Hero ── */}
      <div className="relative pt-16 pb-8 md:pt-24 md:pb-12 px-4 overflow-hidden">
        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(59,91,219,0.10) 0%, transparent 70%)' }}
        />

        <div className="container mx-auto max-w-6xl relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            {/* Eyebrow */}
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#3b5bdb] opacity-30" />
              <span className="text-[#3b5bdb] dark:text-[#748ffc] text-xs font-bold tracking-[0.2em] uppercase">Selected Work</span>
              <div className="h-px w-8 bg-[#3b5bdb] opacity-30" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-5 text-center">
              Our{' '}
              <span className="relative inline-block">
                <span className="text-[#3b5bdb] dark:text-[#748ffc]">Portfolio</span>
                <svg className="absolute -bottom-2 left-0 w-full" height="5" viewBox="0 0 200 5" preserveAspectRatio="none">
                  <path d="M0 4 Q100 0 200 4" stroke="#3b5bdb" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.35" />
                </svg>
              </span>
            </h1>

            <p className="text-lg text-[#5a6b9a] dark:text-[#8896c0] max-w-2xl leading-relaxed text-center mx-auto">
              A curated selection of projects we've built for clients across industries —
              each one a collaboration we're genuinely proud of.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Project Grid ── */}
      <div className="container mx-auto max-w-6xl px-4 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {projects.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;