import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Code, Palette, Rocket, Star, ExternalLink, Github, Lightbulb, Smartphone, Database, Cloud } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Section from '../components/ui/Section';
import { Link } from 'react-router-dom';
import { testimonialService } from '../api/services/testimonialService';
import { projectService } from '../api/services/projectService';
import { serviceService } from '../api/services/serviceService';

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  // Icon mapping helper
  const iconMap = {
    Code: <Code size={28} className="text-primary" />,
    Palette: <Palette size={28} className="text-primary" />,
    Lightbulb: <Lightbulb size={28} className="text-primary" />,
    Smartphone: <Smartphone size={28} className="text-primary" />,
    Database: <Database size={28} className="text-primary" />,
    Cloud: <Cloud size={28} className="text-primary" />,
    Rocket: <Rocket size={28} className="text-primary" />,
  };

  const getIcon = (iconName) => {
    return iconMap[iconName] || <Code size={28} className="text-primary" />;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerPage(3);
      else if (window.innerWidth >= 768) setItemsPerPage(2);
      else setItemsPerPage(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch testimonials
      try {
        const data = await testimonialService.getAllTestimonials({ featured: true, limit: 12 });
        setTestimonials(data.data?.testimonials || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setTestimonialsLoading(false);
      }

      // Fetch featured projects
      try {
        const projectData = await projectService.getAllProjects({ featured: true, limit: 3 });
        setFeaturedProjects(projectData.data?.projects || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setProjectsLoading(false);
      }

      // Fetch services
      try {
        const serviceData = await serviceService.getAllServices();
        // Take first 3 for home page
        setServices(serviceData.data?.slice(0, 3) || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setServicesLoading(false);
      }
    };

    fetchData();
  }, []);


  // Animation variants for staggered animations
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

  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-6 sm:px-4 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-xs sm:text-sm font-medium text-primary mb-4 sm:mb-6">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                Available for new projects
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                We build digital products for growing businesses
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                DevsFusion is a development studio focused on creating high-quality web applications. We work with startups and established companies to bring their ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get in touch <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
                <Link to="/portfolio" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">View our work</Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="relative lg:order-last"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-6 sm:p-8 flex items-center justify-center">
                <img
                  src="https://illustrations.popsy.co/amber/web-design.svg"
                  alt="Web Development Illustration"
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <Section>
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What we do</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We offer a range of services to help you build and grow your digital products
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {servicesLoading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="h-64 bg-card rounded-xl animate-pulse border border-border/50" />
              ))
            ) : (
              services.map((service) => (
                <Card key={service._id || service.title} className="p-8 hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="mb-6">
                    {service.image ? (
                      <img src={service.image} alt={service.title} className="w-12 h-12 object-contain" />
                    ) : (
                      getIcon(service.icon)
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3">{service.description}</p>
                  <Link to="/services" className="text-primary font-medium inline-flex items-center hover:gap-2 transition-all">
                    Learn more <ArrowRight size={16} className="ml-1" />
                  </Link>
                </Card>
              ))
            )}
          </div>
        </div>
      </Section>

      {/* Featured Projects Section */}
      <Section className="bg-secondary/30">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Featured Work</h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Some of our recent projects
              </p>
            </div>
            <Link to="/portfolio">
              <Button variant="outline" className="w-full sm:w-auto">
                View all projects <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>

          {projectsLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-card rounded-xl overflow-hidden animate-pulse border">
                  <div className="aspect-video bg-secondary" />
                  <div className="p-6">
                    <div className="h-5 bg-secondary rounded w-3/4 mb-3" />
                    <div className="h-3 bg-secondary rounded w-full mb-2" />
                    <div className="h-3 bg-secondary rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {featuredProjects.map((project) => (
                <motion.div key={project._id} variants={itemVariants}>
                  <Card className="overflow-hidden h-full flex flex-col group hover:shadow-xl transition-all">
                    <div className="relative aspect-video overflow-hidden bg-secondary">
                      <img
                        src={project.imageLink}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                          >
                            <ExternalLink size={18} className="text-primary" />
                          </a>
                        )}
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                          >
                            <Github size={18} className="text-primary" />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                      <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">
                        {project.description}
                      </p>

                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section>
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Why work with us</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're a small team that values quality over quantity. Every project gets our full attention and expertise.
              </p>
              <ul className="space-y-4">
                {[
                  'Direct communication with developers',
                  'Transparent pricing and timelines',
                  'Clean, maintainable code',
                  'Ongoing support after launch'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="text-primary" size={16} />
                    </div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://illustrations.popsy.co/amber/remote-work.svg"
                alt="Teamwork Illustration"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What our clients say</h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Don't just take our word for it
            </p>
          </div>

          {testimonialsLoading ? (
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              {[1, 2].map(i => (
                <div key={i} className="bg-card rounded-xl p-6 md:p-8 animate-pulse border">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-secondary" />
                    <div className="flex-1">
                      <div className="h-4 bg-secondary rounded w-24 mb-2" />
                      <div className="h-3 bg-secondary rounded w-32" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-secondary rounded w-full" />
                    <div className="h-3 bg-secondary rounded w-full" />
                    <div className="h-3 bg-secondary rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative max-w-7xl mx-auto px-4 sm:px-12">
              {/* Carousel Controls */}
              {testimonials.length > itemsPerPage && (
                <>
                  <div className="absolute top-1/2 -left-4 sm:-left-12 -translate-y-1/2 z-10 hidden md:block">
                    <Button
                      onClick={() => setActiveIndex((prev) => (prev - 1 + (testimonials.length - itemsPerPage + 1)) % (testimonials.length - itemsPerPage + 1))}
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/50"
                      aria-label="Previous testimonial"
                    >
                      <ArrowRight className="rotate-180" size={20} />
                    </Button>
                  </div>

                  <div className="absolute top-1/2 -right-4 sm:-right-12 -translate-y-1/2 z-10 hidden md:block">
                    <Button
                      onClick={() => setActiveIndex((prev) => (prev + 1) % (testimonials.length - itemsPerPage + 1))}
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/50"
                      aria-label="Next testimonial"
                    >
                      <ArrowRight size={20} />
                    </Button>
                  </div>
                </>
              )}

              {/* Carousel Content */}
              <div className="overflow-hidden">
                <motion.div
                  className="flex gap-6"
                  animate={{ x: `-${activeIndex * (100 / itemsPerPage)}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial._id}
                      className="flex-shrink-0"
                      style={{ width: `calc((100% - ${24 * (itemsPerPage - 1)}px) / ${itemsPerPage})` }}
                    >
                      <Card className="p-6 h-full bg-card/50 backdrop-blur-sm border-primary/10 shadow-lg hover:shadow-xl transition-all">
                        <div className="flex flex-col h-full">
                          <div className="flex items-center gap-4 mb-4">
                            <img
                              src={testimonial.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.name}`}
                              alt={testimonial.name}
                              className="w-12 h-12 rounded-full border-2 border-background object-cover shadow-sm bg-secondary"
                            />
                            <div className="min-w-0">
                              <div className="font-bold text-sm truncate">{testimonial.name}</div>
                              <div className="text-xs text-primary font-medium truncate">
                                {testimonial.designation}{testimonial.company ? `, ${testimonial.company}` : ''}
                              </div>
                              {testimonial.rating && (
                                <div className="flex mt-0.5">
                                  {renderStars(testimonial.rating)}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="relative flex-grow">
                            <span className="absolute -top-2 -left-1 text-2xl font-serif text-primary/20 leading-none">"</span>
                            <p className="text-sm text-muted-foreground italic leading-relaxed pl-2 relative z-10 line-clamp-4">
                              {testimonial.message}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Dots Indicators */}
              {testimonials.length > itemsPerPage && (
                <div className="flex justify-center gap-2 mt-8">
                  {[...Array(Math.max(0, testimonials.length - itemsPerPage + 1))].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-6 bg-primary' : 'w-1.5 bg-primary/20 hover:bg-primary/40'
                        }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to start your project?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how we can help bring your idea to life.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 dark:bg-white dark:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-200 font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              Start a conversation <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default Home;
