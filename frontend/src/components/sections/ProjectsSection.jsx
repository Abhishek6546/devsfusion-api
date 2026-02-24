import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import Section from '../ui/Section';
import Button from '../ui/Button';
import { projectService } from '../../api/services/projectService';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const ProjectsSection = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await projectService.getAllProjects({
          featured: true,
          limit: 3
        });
        setFeaturedProjects(projectData.data?.projects || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Section className="py-20 relative overflow-hidden bg-secondary/30 dark:bg-secondary/10">
      <div className="container mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
                Portfolio
              </span>
              <div className="h-px w-8 bg-primary" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
              Featured <span className="text-primary">Work</span>
            </h2>

            <p className="text-base text-muted-foreground max-w-sm">
              Some of our recent projects
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/portfolio">
              <Button
                variant="outline"
                className="group w-full sm:w-auto rounded-full border-primary/30 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 px-6"
              >
                View all projects
                <ArrowRight
                  size={15}
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Cards */}
        {projectsLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden animate-pulse bg-card border border-border/50 aspect-[4/3]"
              />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                variants={itemVariants}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
              >
                {/* Image */}
                <img
                  src={project.imageLink}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Default Title */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-black text-lg leading-snug group-hover:opacity-0 transition-opacity duration-300">
                    {project.title}
                  </h3>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Hover Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">

                  <h3 className="text-white font-black text-lg leading-snug mb-2 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-white/75 text-sm leading-relaxed line-clamp-2 mb-4">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-2">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors duration-200"
                      >
                        <ExternalLink size={12} />
                        Live
                      </a>
                    )}

                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold hover:bg-white/30 transition-colors duration-200 border border-white/20"
                      >
                        <Github size={12} />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>

                {/* Index badge */}
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-black tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {String(index + 1).padStart(2, '0')}
                </div>

              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </Section>
  );
};

export default ProjectsSection;