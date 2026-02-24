import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Code, Palette, Lightbulb, ArrowRight, CheckCircle,
  Smartphone, Database, Cloud, Sparkles, Clock, Shield, Zap
} from 'lucide-react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { serviceService } from '../api/services/serviceService';

const iconMap = {
  Code: <Code size={32} />,
  Palette: <Palette size={32} />,
  Lightbulb: <Lightbulb size={32} />,
  Smartphone: <Smartphone size={32} />,
  Database: <Database size={32} />,
  Cloud: <Cloud size={32} />,
};

const processSteps = [
  { step: '01', title: 'Discovery', desc: 'Understanding your goals, audience and project requirements in depth.', icon: <Lightbulb size={20} /> },
  { step: '02', title: 'Planning', desc: 'Creating a roadmap, wireframes and solid technical architecture.', icon: <Code size={20} /> },
  { step: '03', title: 'Development', desc: 'Building your product with clean code and regular progress updates.', icon: <Zap size={20} /> },
  { step: '04', title: 'Launch & Support', desc: 'Deploying with care and providing ongoing maintenance post-launch.', icon: <Shield size={20} /> },
];

const whyUs = [
  { icon: <Clock size={18} />, label: 'On-time delivery' },
  { icon: <Shield size={18} />, label: 'Secure & scalable' },
  { icon: <Zap size={18} />, label: 'High performance' },
  { icon: <CheckCircle size={18} />, label: '100% satisfaction' },
];

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await serviceService.getAllServices();
        setServices(data.data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const getIcon = (iconName) => iconMap[iconName] || <Code size={32} />;

  return (
    <div className="min-h-screen">

      {/* ── Hero Header ── */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
          {/* Label */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6 border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles size={12} />
            What we offer
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our{' '}
            <span className="relative inline-block">
              <span className="text-primary">Services</span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/40 rounded-full" />
            </span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We offer a comprehensive range of services to help you build, launch, and
            scale your digital products — from concept to ongoing support.
          </motion.p>

          {/* Why us pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {whyUs.map((item) => (
              <div
                key={item.label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card dark:bg-card border border-border/50 dark:border-border/20 text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm"
              >
                <span className="text-primary">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Services List ── */}
      <div className="container mx-auto px-6 max-w-6xl pb-24">
        <div className="space-y-24">
          {loading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="grid lg:grid-cols-2 gap-12 items-center animate-pulse">
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-secondary rounded-2xl" />
                  <div className="h-8 bg-secondary rounded w-2/3" />
                  <div className="h-4 bg-secondary rounded w-full" />
                  <div className="h-4 bg-secondary rounded w-5/6" />
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-4 bg-secondary rounded" />
                    ))}
                  </div>
                </div>
                <div className="aspect-square rounded-3xl bg-secondary" />
              </div>
            ))
          ) : (
            services.map((service, index) => (
              <motion.div
                key={service._id}
                className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>

                  {/* Number + Icon row */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 dark:bg-primary/15 border border-primary/20 flex items-center justify-center text-primary">
                      {getIcon(service.icon)}
                    </div>
                    <span className="text-5xl font-black text-primary/10 dark:text-primary/15 leading-none select-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Label */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-px w-8 bg-primary" />
                    <span className="text-primary text-xs font-bold tracking-widest uppercase">
                      Service {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                    {service.title}
                  </h2>

                  <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  {service.features?.length > 0 && (
                    <div className="mb-8">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
                        What&apos;s included
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-start gap-2.5 p-2.5 rounded-xl bg-primary/5 dark:bg-primary/8 border border-primary/10"
                          >
                            <CheckCircle size={15} className="text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technologies */}
                  {service.technologies?.length > 0 && (
                    <div className="mb-8">
                      <h3 className="font-bold text-xs text-muted-foreground mb-3 uppercase tracking-widest">
                        Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 bg-card dark:bg-card border border-border/50 dark:border-border/20 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link to="/contact">
                    <button className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300">
                      Get started
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </Link>
                </div>

                {/* Image / Visual */}
                <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  {/* Decorative bg shape */}
                  <div className="absolute inset-4 bg-primary/5 dark:bg-primary/10 rounded-3xl blur-xl" />

                  <div className="relative rounded-3xl overflow-hidden border border-border/50 dark:border-border/20 bg-gradient-to-br from-primary/8 via-primary/5 to-transparent shadow-xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-72 sm:h-80 lg:h-96 object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                    {/* Floating tag */}
                    <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm border border-white/20 shadow-lg">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        Available now
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* ── Process Section ── */}
      <Section className="py-20 relative overflow-hidden bg-secondary/20 dark:bg-secondary/10">

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-primary/5 dark:bg-primary/8 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">

          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary text-xs font-bold tracking-widest uppercase">How it works</span>
              <div className="h-px w-8 bg-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Our <span className="text-primary">Process</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We follow a proven process to ensure every project is delivered
              on time, on budget, and beyond expectations.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((phase, index) => (
              <motion.div
                key={phase.step}
                className="group relative bg-card dark:bg-card rounded-2xl border border-border/50 dark:border-border/20 p-6 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                {/* Hover bg */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Large step number */}
                <div className="text-6xl font-black text-primary/8 dark:text-primary/10 leading-none mb-4 select-none">
                  {phase.step}
                </div>

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {phase.icon}
                </div>

                <h3 className="font-black text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-200">
                  {phase.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {phase.desc}
                </p>

                {/* Connector arrow — hide on last */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <ArrowRight size={12} className="text-primary" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Bottom CTA ── */}
      <Section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Orbs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-widest uppercase mb-6">
              <Sparkles size={12} />
              Free consultation
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-5">
              Not sure what <br />you need?
            </h2>

            <p className="text-white/75 text-base leading-relaxed mb-10 max-w-xl mx-auto">
              Let us have a conversation about your project. We will help you figure out
              the best approach and provide a detailed proposal — completely free.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://calendly.com/contact-devsfusion/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-black text-sm hover:bg-white/90 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300"
              >
                Schedule a free call
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-transparent border-2 border-white/30 text-white font-black text-sm hover:bg-white/10 hover:border-white hover:-translate-y-1 transition-all duration-300"
              >
                Send a message
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>
        </div>
      </Section>

    </div>
  );
};

export default Services;