import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Calendar, Users } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { projectService } from '../api/services/projectService';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  // Sample fallback data if API doesn't return projects
  const sampleProjects = [
    {
      _id: '1',
      title: 'E-Commerce Platform',
      description: 'A full-featured online store with inventory management, payment processing, and order tracking. Built for a fashion retailer serving 10,000+ monthly customers.',
      imageLink: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
      techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveLink: '#',
      githubLink: '#',
      category: 'Web App',
      year: '2024'
    },
    {
      _id: '2',
      title: 'Healthcare Dashboard',
      description: 'Patient management system for a medical clinic with appointment scheduling, medical records, and billing integration.',
      imageLink: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
      techStack: ['Next.js', 'PostgreSQL', 'TypeScript'],
      liveLink: '#',
      category: 'Dashboard',
      year: '2024'
    },
    {
      _id: '3',
      title: 'Real Estate Marketplace',
      description: 'Property listing platform with advanced search, virtual tours, and agent management features.',
      imageLink: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      techStack: ['React', 'Firebase', 'Google Maps API'],
      liveLink: '#',
      githubLink: '#',
      category: 'Web App',
      year: '2023'
    },
    {
      _id: '4',
      title: 'Fitness Tracking App',
      description: 'Mobile-responsive fitness tracker with workout plans, progress tracking, and social features.',
      imageLink: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop',
      techStack: ['React Native', 'Node.js', 'MongoDB'],
      liveLink: '#',
      category: 'Mobile App',
      year: '2023'
    },
    {
      _id: '5',
      title: 'SaaS Analytics Platform',
      description: 'Business intelligence dashboard with real-time data visualization and custom reporting.',
      imageLink: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      techStack: ['Vue.js', 'Python', 'PostgreSQL', 'Chart.js'],
      liveLink: '#',
      category: 'Dashboard',
      year: '2023'
    },
    {
      _id: '6',
      title: 'Restaurant Ordering System',
      description: 'Online ordering platform with menu management, delivery tracking, and customer loyalty program.',
      imageLink: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
      techStack: ['React', 'Node.js', 'Stripe', 'Twilio'],
      liveLink: '#',
      githubLink: '#',
      category: 'Web App',
      year: '2024'
    }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAllProjects();
        if (data.data && data.data.length > 0) {
          setProjects(data.data);
        } else {
          setProjects(sampleProjects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects(sampleProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['All', ...new Set(projects.flatMap(p => p.techStack || []))].slice(0, 8);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.techStack?.includes(filter));

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Work</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A selection of projects we've delivered for clients across different industries. Each project represents our commitment to quality, innovation, and client success.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          <span className="text-sm font-medium text-muted-foreground flex items-center mr-2">Filter by:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === cat 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-96 bg-secondary rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden h-full flex flex-col group hover:shadow-xl transition-shadow">
                    <div className="relative aspect-video overflow-hidden bg-secondary">
                      <img 
                        src={project.imageLink} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        {project.liveLink && (
                          <a 
                            href={project.liveLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                          >
                            <ExternalLink size={20} className="text-primary" />
                          </a>
                        )}
                        {project.githubLink && (
                          <a 
                            href={project.githubLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                          >
                            <Github size={20} className="text-primary" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      {project.category && (
                        <div className="text-xs font-medium text-primary mb-2">{project.category}</div>
                      )}
                      <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                      <p className="text-muted-foreground mb-4 flex-grow text-sm leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack?.slice(0, 4).map(tech => (
                          <span key={tech} className="text-xs px-2 py-1 bg-secondary rounded text-muted-foreground">
                            {tech}
                          </span>
                        ))}
                      </div>
                      {project.year && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar size={14} />
                          <span>{project.year}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No projects found for this filter.</p>
          </div>
        )}

        <Section className="mt-24 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Have a project in mind?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We'd love to hear about it. Let's discuss how we can help bring your vision to life.
            </p>
            <Link to="/contact">
              <Button size="lg">Start your project</Button>
            </Link>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Portfolio;
