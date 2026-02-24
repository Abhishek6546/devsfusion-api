import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Section from '../ui/Section';

const CTASection = () => {
  return (
    <Section className="py-20 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-primary dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-950 dark:to-black" />

      {/* Glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 dark:bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/10 dark:bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-64 bg-white/5 dark:bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 text-white text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
              <Sparkles size={12} />
              Let us work together
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-5">
              Ready to start <br />
              your{' '}
              <span className="relative inline-block">
                <span className="text-white">project?</span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white/50 rounded-full" />
              </span>
            </h2>

            <p className="text-white/80 dark:text-gray-300 text-base leading-relaxed mb-8 max-w-md">
              Let us discuss how we can help bring your idea to life.
              We are ready to turn your vision into a stunning digital reality.
            </p>

            {/* Contact Pills */}
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:contact.devsfusion@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 border border-white/20 dark:border-white/10 text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm"
              >
                <Mail size={14} />
                contact.devsfusion@gmail.com
              </a>

              <a
                href="tel:+91 62834 21968"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 border border-white/20 dark:border-white/10 text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm"
              >
                <Phone size={14} />
                +91 62834 21968
              </a>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            className="flex flex-col items-start md:items-end gap-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Glass Card */}
            <div className="w-full bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-xl shadow-black/10 dark:shadow-black/40">
              <p className="text-white/70 dark:text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">
                What happens next?
              </p>

              {[
                'We review your project details',
                'Schedule a free discovery call',
                'Receive a custom proposal',
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2.5 border-b border-white/10 dark:border-white/5 last:border-0"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 dark:bg-primary/30 flex items-center justify-center flex-shrink-0 text-white text-xs font-black">
                    {i + 1}
                  </div>
                  <p className="text-white/85 dark:text-gray-300 text-sm font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:justify-end">
              <Link to="/contact">
                <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-black text-sm hover:bg-white/90 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-black/20">
                  Start a conversation
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </Link>

              <Link to="/portfolio">
                <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-transparent border-2 border-white/40 dark:border-white/30 text-white font-black text-sm hover:bg-white/10 hover:border-white hover:-translate-y-1 transition-all duration-300">
                  View our work
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </Section>
  );
};

export default CTASection;