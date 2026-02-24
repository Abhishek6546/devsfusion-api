import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ExternalLink, Github, Calendar, ArrowRight, Sparkles, Mail, Phone } from 'lucide-react';
import Section from '../components/ui/Section';
import { Link } from 'react-router-dom';
import { projectService } from '../api/services/projectService';

/* ─── Category config ────────────────────────────────────────────────────── */
const categoryConfig = {
  'Web App':    { dot: '#6ee7b7', light: 'bg-emerald-50 text-emerald-700 border-emerald-200',   dark: 'dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700/40' },
  'Dashboard':  { dot: '#93c5fd', light: 'bg-blue-50   text-blue-700   border-blue-200',        dark: 'dark:bg-blue-900/30   dark:text-blue-300   dark:border-blue-700/40'   },
  'Mobile App': { dot: '#fda4af', light: 'bg-rose-50   text-rose-700   border-rose-200',        dark: 'dark:bg-rose-900/30   dark:text-rose-300   dark:border-rose-700/40'   },
};
const defaultCat = { dot: '#a5b4fc', light: 'bg-indigo-50 text-indigo-700 border-indigo-200', dark: 'dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700/40' };

/* ─── Animated counter ───────────────────────────────────────────────────── */
const Counter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let val = 0;
    const step = target / 50;
    const t = setInterval(() => {
      val += step;
      if (val >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(val));
    }, 25);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
};

/* ─── Project card ───────────────────────────────────────────────────────── */
const ProjectCard = ({ project, index }) => {
  const cat = categoryConfig[project.category] || defaultCat;
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
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/20 backdrop-blur border border-white/30
                    flex items-center justify-center text-white hover:bg-white hover:text-[#3b5bdb] transition-all duration-200"
                >
                  <Github size={14} />
                </a>
              )}
            </div>
          </div>
          {/* Category badge */}
          {project.category && (
            <span className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full
              text-xs font-semibold border backdrop-blur-sm ${cat.light} ${cat.dark}`}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat.dot }} />
              {project.category}
            </span>
          )}
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
          <p className="text-sm text-[#5a6b9a] dark:text-[#8896c0] leading-relaxed flex-grow mb-4">
            {project.description}
          </p>
          {project.year && (
            <div className="flex items-center gap-1.5 text-xs text-[#748ffc] dark:text-[#5a75d9] mt-auto pt-3
              border-t border-[#e8ecff] dark:border-[#1e2d4a]"
            >
              <Calendar size={11} />
              <span className="font-medium">{project.year}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Skeleton ───────────────────────────────────────────────────────────── */
const Skeleton = () => (
  <div className="rounded-2xl overflow-hidden border border-[#dbe4ff] dark:border-[#2a3550] bg-white dark:bg-[#161b27] animate-pulse">
    <div className="aspect-video bg-[#eef2ff] dark:bg-[#1a2035]" />
    <div className="p-5 space-y-3">
      <div className="h-3.5 w-1/3 rounded-full bg-[#e8ecff] dark:bg-[#1e2d4a]" />
      <div className="h-5 w-3/4 rounded-full bg-[#e8ecff] dark:bg-[#1e2d4a]" />
      <div className="h-3 rounded-full bg-[#e8ecff] dark:bg-[#1e2d4a]" />
      <div className="h-3 w-5/6 rounded-full bg-[#e8ecff] dark:bg-[#1e2d4a]" />
    </div>
  </div>
);

/* ─── Stat card ──────────────────────────────────────────────────────────── */
const StatCard = ({ number, suffix, label }) => (
  <div className="text-center px-6 py-5 rounded-xl bg-[#eef2ff] dark:bg-[#1a2035] border border-[#dbe4ff] dark:border-[#2a3550]">
    <p className="text-3xl font-black tracking-tight text-[#3b5bdb] dark:text-[#748ffc]">
      <Counter target={number} suffix={suffix} />
    </p>
    <p className="text-xs text-[#5a6b9a] dark:text-[#8896c0] mt-1 font-medium">{label}</p>
  </div>
);

/* ─── Main ───────────────────────────────────────────────────────────────── */
const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  const sampleProjects = [
    { _id: '1', title: 'E-Commerce Platform', description: 'A full-featured online store with inventory management, payment processing, and order tracking. Built for a fashion retailer serving 10,000+ monthly customers.', imageLink: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop', liveLink: '#', githubLink: '#', category: 'Web App', year: '2024' },
    { _id: '2', title: 'Healthcare Dashboard', description: 'Patient management system for a medical clinic with appointment scheduling, medical records, and billing integration.', imageLink: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop', liveLink: '#', category: 'Dashboard', year: '2024' },
    { _id: '3', title: 'Real Estate Marketplace', description: 'Property listing platform with advanced search, virtual tours, and agent management features.', imageLink: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop', liveLink: '#', githubLink: '#', category: 'Web App', year: '2023' },
    { _id: '4', title: 'Fitness Tracking App', description: 'Mobile-responsive fitness tracker with workout plans, progress tracking, and social features.', imageLink: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop', liveLink: '#', category: 'Mobile App', year: '2023' },
    { _id: '5', title: 'SaaS Analytics Platform', description: 'Business intelligence dashboard with real-time data visualization and custom reporting for growing businesses.', imageLink: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', liveLink: '#', category: 'Dashboard', year: '2023' },
    { _id: '6', title: 'Restaurant Ordering System', description: 'Online ordering platform with menu management, delivery tracking, and customer loyalty program.', imageLink: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop', liveLink: '#', githubLink: '#', category: 'Web App', year: '2024' },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAllProjects();
        setProjects(data.data?.length ? data.data : sampleProjects);
      } catch {
        setProjects(sampleProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))];
  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#f8faff] dark:bg-[#0d1117] text-[#1a2a5e] dark:text-[#e8eeff] transition-colors duration-300">

      {/* ── Hero ── */}
      <div className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(59,91,219,0.10) 0%, transparent 70%)' }}
        />

        <div className="container mx-auto max-w-6xl relative z-10 d-flex justify-items-center align-items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            {/* Eyebrow — pill style matching screenshot */}
              <div className="flex justify-center items-center gap-3 mb-4">
                <div className="h-px w-8 bg-primary" />
                <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Selected Work</span>
                <div className="h-px w-8 bg-primary" />
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

            <p className="text-lg text-[#5a6b9a] dark:text-[#8896c0] max-w-2xl leading-relaxed text-center">
              A curated selection of projects we've built for clients across industries —
              each one a collaboration we're genuinely proud of.
            </p>
          </motion.div>

        </div>
      </div>

      {/* ── Divider ── */}
      <div className="container mx-auto max-w-6xl px-4">
        <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, #c5d0ff, transparent)' }} />
      </div>

      {/* ── Filter pills ── */}
      {!loading && categories.length > 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="container mx-auto max-w-6xl px-4 py-7"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  activeFilter === cat
                    ? 'bg-[#3b5bdb] dark:bg-[#4263eb] text-white border-[#3b5bdb] dark:border-[#4263eb] shadow-[0_4px_14px_rgba(59,91,219,0.35)]'
                    : 'bg-white dark:bg-[#161b27] text-[#5a6b9a] dark:text-[#8896c0] border-[#dbe4ff] dark:border-[#2a3550] hover:border-[#3b5bdb] dark:hover:border-[#4263eb] hover:text-[#3b5bdb] dark:hover:text-[#748ffc]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Project Grid ── */}
      <div className="container mx-auto max-w-6xl px-4 pb-24">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <Skeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#5a6b9a] dark:text-[#8896c0]">No projects in this category yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project._id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

    
    </div>
  );
};

export default Portfolio;