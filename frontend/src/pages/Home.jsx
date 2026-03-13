import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Palette, Rocket, Star, ExternalLink, Lightbulb, Smartphone, Database, Cloud, Sparkles, Target, Award } from 'lucide-react';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';
import { Link } from 'react-router-dom';
import aboutImg from '../assets/images/devsfusion_services_img.png';
import HowWeWork from '../components/sections/HowWeWork';
import ProjectsSection from '../components/sections/ProjectsSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Testimonials from '../components/sections/Testimonials';
import CTASection from '../components/sections/CTASection';
import { services as localServices } from '../data/services';

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

  // Take first 3 services for home page preview
  const services = localServices.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden ">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Smooth Gradient Animation */}
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

          {/* Parallax Orbs */}
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
        <div className="relative z-10 min-h-screen flex items-center pt-8 pb-8 md:pt-12 md:pb-12">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="max-w-5xl mx-auto text-center">

              {/* Breadcrumb */}
              <div
                className="inline-flex items-center gap-2 mb-4 md:mb-8 px-4 md:px-5 py-2 md:py-2.5 rounded-full backdrop-blur-xl border bg-white/50 dark:bg-white/5 border-indigo-200 dark:border-white/10 text-indigo-700 dark:text-blue-200 animate-fade-in"
                style={{ animationDelay: '0.1s' }}
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-xs md:text-sm font-medium tracking-widest uppercase">Design • Development • Strategy</span>
              </div>

              {/* Main Heading */}
              <h1
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 leading-[1.2] md:leading-[1.15] text-slate-900 dark:text-white"
              >
                <span className="animate-fade-in block" style={{ animationDelay: '0.2s' }}>
                  Websites That Feel
                </span>
                <span
                  className="animate-fade-in block mt-1 md:mt-2"
                  style={{ animationDelay: '0.3s' }}
                >
                  Premium, Work Flawlessly,
                </span>
                <span className="animate-fade-in block mt-1 md:mt-2" style={{ animationDelay: '0.4s' }}>
                  and{' '}
                  <span className="relative inline-block px-4 py-1.5 md:px-6 md:py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl md:rounded-2xl">
                    Convert Like Crazy
                  </span>
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className="text-base md:text-xl mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed text-slate-600 dark:text-slate-300 animate-fade-in"
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
                <Link to="/contact">
                  <button className="cssbuttons-io-button">
                    Start Your Project
                    <div className="icon">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </Link>

                <Link to="/portfolio">
                  <button className="cssbuttons-io-button2">
                    View Work
                    <div className="icon">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </Link>
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
              <div className="flex justify-center md:justify-start items-center gap-3 mb-4">
                <div className="h-px w-8 bg-primary" />
                <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">About Our company</span>
                <div className="h-px w-8 bg-primary" />
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-5 text-slate-900 dark:text-white text-center md:text-left">
                Building competitive <br className="hidden sm:block" />
                business sectors.
              </h2>

              <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-lg mx-auto md:mx-0 text-center md:text-left">
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
              <div className="absolute top-0 right-0 w-32 h-32 md:w-44 md:h-44 bg-primary rounded-3xl z-0" />
              <div className="relative z-10 w-72 sm:w-80 md:w-96">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
                  alt="Business professional"
                  className="w-full h-auto object-cover object-top rounded-2xl shadow-2xl"
                  style={{ minHeight: '340px' }}
                />
              </div>

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

              <div className="mt-10 rounded-2xl overflow-hidden">
                <img
                  src={aboutImg}
                  alt="Our Services"
                  className="w-full h-auto object-cover object-center"
                />
              </div>
            </motion.div>

            {/* ── Right Side ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[560px] overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background dark:from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background dark:from-background to-transparent z-10 pointer-events-none" />
              <AutoScrollCards services={services} />
            </motion.div>
          </div>
        </div>
      </Section>

      <HowWeWork />
      <ProjectsSection />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </div>
  );
};

export default Home;
