import { useState, useEffect, useRef  } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Code, Palette, Rocket, Star, ExternalLink, Github, Lightbulb, Smartphone, Database, Cloud, Sparkles, Target, Award } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Section from '../components/ui/Section';
import { Link } from 'react-router-dom';
import { testimonialService } from '../api/services/testimonialService';
import { projectService } from '../api/services/projectService';
import { serviceService } from '../api/services/serviceService';
import aboutImg from '../assets/images/devsfusion_services_img.png';    
import ServiceCard from '../components/ui/ServiceCard';
import HowWeWork from '../components/sections/HowWeWork';
import ProjectsSection from '../components/sections/ProjectsSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Testimonials from '../components/sections/Testimonials';
import CTASection from '../components/sections/CTASection';

const AutoScrollCards = ({ services }) => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef(0);

  const cardIcons = [
    <Code size={26} />,
    <Palette size={26} />,
    <Smartphone size={26} />,
    <Cloud size={26} />,
    <Database size={26} />,
    <Rocket size={26} />,
  ];

  const allCards = [...services, ...services, ...services];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scroll = () => {
      if (!isPaused) {
        positionRef.current += 0.6;
        const halfHeight = container.scrollHeight / 3;
        if (positionRef.current >= halfHeight) {
          positionRef.current = 0;
        }
        container.style.transform = `translateY(-${positionRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused]);

  return (
    <div
      className="flex flex-col gap-4 p-1"
      ref={scrollRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {allCards.map((service, index) => (
        <div
          key={`${service._id || service.title}-${index}`}
          className="group relative bg-card dark:bg-card rounded-2xl border border-border/50 dark:border-border/20 hover:border-primary/40 p-5 flex gap-4 items-start cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-0.5 overflow-hidden flex-shrink-0"
        >
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary) / 0.06) 0%, hsl(var(--primary) / 0.02) 100%)',
            }}
          />

          <div
            className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 relative z-10"
            style={{ backgroundColor: 'hsl(var(--primary) / 0.1)' }}
          >
            <span style={{ color: 'hsl(var(--primary))', display: 'flex' }}>
              {cardIcons[index % cardIcons.length]}
            </span>
          </div>

          <div className="flex-grow relative z-10 min-w-0">
            <h4 className="text-base font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-200 mb-1.5 leading-snug truncate">
              {service.title}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {service.description}
            </p>
            <div className="flex items-center justify-between mt-3">
              <div className="h-0.5 w-6 bg-primary/40 rounded-full group-hover:w-12 group-hover:bg-primary transition-all duration-300" />
              <Link to="/services">
                <div className="w-7 h-7 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                  <ArrowRight size={12} className="-rotate-45 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);



  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


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
  

 {/* <div className="relative h-screen w-full overflow-hidden bg-gray-900">
  
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105'
          }`}
        >
       
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
       
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/70 to-transparent" />
          </div>

        
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-6 lg:px-20">
              <div className="max-w-3xl">
                <div
                  className={`transform transition-all duration-1000 delay-300 ${
                    index === currentSlide
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-10 opacity-0'
                  }`}
                >
                
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px w-12 bg-blue-400" />
                    <span className="text-blue-300 font-medium tracking-wider uppercase text-sm">
                      {slide.subtitle}
                    </span>
                  </div>

           
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    {slide.title}
                  </h1>

              
                  <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                    {slide.description}
                  </p>

                
                  <div className="flex flex-wrap gap-4">
                    <button className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105">
                      {slide.cta}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold backdrop-blur-sm transition-all duration-300 border border-white/30 hover:border-white/50">
                      {slide.ctaSecondary}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

    
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

   
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`h-1 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? 'w-12 bg-blue-500'
                  : 'w-8 bg-white/40 hover:bg-white/60'
              }`}
            />
            {index === currentSlide && isAutoPlaying && (
              <div className="absolute top-0 left-0 h-1 bg-white rounded-full animate-progress" 
                   style={{ animation: 'progress 5s linear' }} />
            )}
          </button>
        ))}
      </div>

    
      {isAutoPlaying && (
        <div className="absolute top-0 left-0 w-full h-1 bg-white/10 z-10">
          <div
            className="h-full bg-blue-500 transition-all duration-100 ease-linear"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`
            }}
          />
        </div>
      )}

      
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          />
        </svg>
      </div>

          <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 5s linear;
        }
      `}</style>
    </div> */}

 <div className="relative min-h-screen overflow-hidden ">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Smooth Gradient Animation - No blinking */}
        <div 
          className="absolute inset-0 opacity-30 dark:opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 800px 600px at 20% 40%, rgba(99, 102, 241, 0.15), transparent),
              radial-gradient(ellipse 600px 800px at 80% 60%, rgba(147, 51, 234, 0.12), transparent),
              radial-gradient(ellipse 700px 700px at 50% 50%, rgba(59, 130, 246, 0.08), transparent)
            `,
            animation: 'gradient-shift 20s ease-in-out infinite',
          }}
        />

        {/* Subtle Moving Dots Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(99, 102, 241, 0.4) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'dots-move 40s linear infinite',
          }}
        />

        {/* Gentle Parallax Orbs - Smooth movement only */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 dark:bg-purple-500/20 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -1.5}px, ${mousePosition.y * -1.5}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center pt-20 pb-20">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="max-w-5xl mx-auto text-center">
            
            {/* Breadcrumb */}
            <div 
              className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full backdrop-blur-xl border bg-white/50 dark:bg-white/5 border-indigo-200 dark:border-white/10 text-indigo-700 dark:text-blue-200 animate-fade-in"
              style={{ animationDelay: '0.1s' }}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wide">👋 → Designs → Development 🚀</span>
            </div>

            {/* Main Heading */}
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.15] text-slate-900 dark:text-white"
            >
              <span className="animate-fade-in block" style={{ animationDelay: '0.2s' }}>
                Websites That Feel
              </span>
              <span 
                className="animate-fade-in block mt-2"
                style={{ animationDelay: '0.3s' }}
              >
                Premium, Work Flawlessly,
              </span>
              <span className="animate-fade-in block mt-2" style={{ animationDelay: '0.4s' }}>
                and{' '}
                <span className="relative inline-block px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-2xl">
                  Convert Like Crazy
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p 
              className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed text-slate-600 dark:text-slate-300 animate-fade-in"
              style={{ 
                animationDelay: '0.5s',
              }}
            >
              We design and build custom websites that blend stunning design 
              with business strategy - so you don't just impress your visitors, you 
              turn them into paying clients.
            </p>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in"
              style={{ animationDelay: '0.6s' }}
            >
            

            <button class="cssbuttons-io-button">
               Start Your Project
              <div class="icon">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button class="cssbuttons-io-button2">
               View Work
              <div class="icon">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>


            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            filter: hue-rotate(0deg);
          }
          50% {
            filter: hue-rotate(20deg);
          }
        }

        @keyframes dots-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.25rem;
          }
        }
      `}</style>
    </div>


{/* About Our Company Section */}
<Section className="py-16 md:py-24 overflow-hidden">
  <div className="container mx-auto max-w-6xl px-6">
    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
       <div className="flex justify-center items-center gap-3 mb-4">
                <div className="h-px w-8 bg-primary" />
                <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">About Our company</span>
                <div className="h-px w-8 bg-primary" />
              </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-5 text-slate-900 dark:text-white">
          Building competitive <br className="hidden sm:block" />
          business sectors.
        </h2>

        <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-lg">
          New analytic tools can help manufacturers in labor-intensive sectors boost
          productivity and earnings by double-digit percentages. We provide a secure
          and simple on-demand platform for total performance.
        </p>

        <div className="space-y-8">
          {/* Company Values */}
          <motion.div
            className="flex items-start gap-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex-shrink-0 w-14 h-14 rounded-full border border-border flex items-center justify-center bg-background shadow-sm">
              <Award size={24} className="text-primary" />
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-1 self-stretch rounded-full bg-primary mt-1" />
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Company Values</h4>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  We help organizations across private, public, and social sectors
                  create the Change that Matters most to them.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Our Mission */}
          <motion.div
            className="flex items-start gap-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <div className="flex-shrink-0 w-14 h-14 rounded-full border border-border flex items-center justify-center bg-background shadow-sm">
              <Target size={24} className="text-primary" />
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-1 self-stretch rounded-full bg-primary mt-1" />
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Our Mission</h4>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  We help organizations across private, public, and social sectors
                  create the Change that Matters most to them.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right — Image + Floating Stat Card */}
      <motion.div
        className="relative flex justify-center md:justify-end"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Blue decorative box */}
        <div className="absolute top-0 right-0 w-32 h-32 md:w-44 md:h-44 bg-primary rounded-3xl z-0" />

        {/* Person image — replace src with your own photo */}
        <div className="relative z-10 w-72 sm:w-80 md:w-96">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
            alt="Business professional"
            className="w-full h-auto object-cover object-top rounded-2xl shadow-2xl"
            style={{ minHeight: '340px' }}
          />
        </div>

        {/* Floating stat card */}
        <motion.div
          className="absolute bottom-6 left-0 md:-left-8 z-20 bg-white dark:bg-card rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-4 border border-border/50"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth={2}>
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">
              5<span className="text-primary">+</span>
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 font-medium">Successful Project</p>
          </div>
        </motion.div>
      </motion.div>

    </div>
  </div>
</Section>

      {/* Services Section */}
      {/* <Section>
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
      </Section> */}

      {/* Services Section */}
{/* Services Section */}


<Section className="py-20 relative overflow-hidden">
  <div className="container mx-auto max-w-6xl px-6 relative z-10">

    <div className="grid lg:grid-cols-2 gap-12 items-center">

      {/* ── Left Side ── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-center"
      >
        {/* Label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-primary" />
          <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Services</span>
          <div className="h-px w-8 bg-primary" />
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6 text-slate-900 dark:text-white">
          Features Loved Our <br />
          Digital{' '}
          <span className="text-primary">Services!</span>
        </h2>

        <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-md">
          We help businesses grow with cutting-edge digital solutions tailored to their unique needs and goals.
        </p>

        <Link to="/services">
          <Button
            variant="outline"
            className="group w-fit rounded-full border-primary/30 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 px-6"
          >
            Learn More
            <ArrowRight size={15} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>

        {/* Image below button */}
        <div className="mt-10 rounded-2xl overflow-hidden">
          <img
            src={aboutImg}
            alt="Our Services"
            className="w-full h-auto object-cover object-center"
          />
        </div>
      </motion.div>

      {/* ── Right Side — Auto Scrolling Cards ── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative h-[560px] overflow-hidden"
      >
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background dark:from-background to-transparent z-10 pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background dark:from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        {servicesLoading ? (
          <div className="flex flex-col gap-4 p-1">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-40 rounded-2xl animate-pulse bg-card border border-border/50" />
            ))}
          </div>
        ) : (
          <AutoScrollCards services={services} />
        )}
      </motion.div>

    </div>
  </div>
</Section>



{/* How We Work Section*/}

<HowWeWork />


      {/* Featured Projects Section */}
      {/* <Section className="bg-secondary/30">
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
      </Section> */}

      <ProjectsSection />

      {/* Why Choose Us */}
      {/* <Section>
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
      </Section> */}

      <WhyChooseUs />

      {/* Testimonials */}
      {/* <Section>
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
      </Section> */}

      <Testimonials />

      {/* CTA Section */}
      {/* <Section className="bg-primary text-primary-foreground">
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
      </Section> */}

      <CTASection />
    </div>
  );
};

export default Home;
