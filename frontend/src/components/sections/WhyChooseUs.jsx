import { motion } from 'framer-motion';
import {  MessageCircle, DollarSign, Code, Headphones } from 'lucide-react';
import Section from '../ui/Section';

const reasons = [
  {
    icon: <MessageCircle size={20} />,
    title: 'Direct communication with developers',
    description: 'No middlemen, no delays. You talk directly to the people building your product.',
  },
  {
    icon: <DollarSign size={20} />,
    title: 'Transparent pricing and timelines',
    description: 'Clear quotes upfront. No hidden fees, no surprise invoices at the end.',
  },
  {
    icon: <Code size={20} />,
    title: 'Clean, maintainable code',
    description: 'We write code that your future team can understand, extend, and be proud of.',
  },
  {
    icon: <Headphones size={20} />,
    title: 'Ongoing support after launch',
    description: 'We stick around after go-live to fix bugs, iterate, and keep things running smoothly.',
  },
];

// const stats = [
//   { value: '5+', label: 'Years Experience' },
//   { value: '50+', label: 'Projects Delivered' },
//   { value: '98%', label: 'Client Satisfaction' },
//   { value: '24/7', label: 'Support Available' },
// ];

const WhyChooseUs = () => {
  return (
    <Section className="py-20 relative overflow-hidden">

      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 dark:bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 dark:bg-primary/8 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl px-6 relative z-10">

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* ── Left Side ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
                Why Choose Us
              </span>
              <div className="h-px w-8 bg-primary" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-5">
              Why work{' '}
              <span className="relative inline-block">
                <span className="text-primary">with us</span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/30 rounded-full" />
              </span>
            </h2>

            <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-md">
              We are a small team that values quality over quantity.
              Every project gets our full attention and expertise from
              day one to launch and beyond.
            </p>

            {/* Reasons list */}
            <ul className="space-y-5">
              {reasons.map((item, index) => (
                <motion.li
                  key={item.title}
                  className="group flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {/* Icon box */}
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 dark:bg-primary/15 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300 mt-0.5">
                    <span className="text-primary group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-primary transition-colors duration-200">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ── Right Side ── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Stats grid — top */}
              
            {/* Main visual card */}
            <motion.div
              className="relative bg-card dark:bg-card rounded-3xl border border-border/50 dark:border-border/20 p-8 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 dark:bg-primary/15 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-primary/8 dark:bg-primary/12 rounded-full blur-2xl" />

              <div className="relative z-10">
                {/* Quote mark */}
                <div className="text-6xl font-black text-primary/20 dark:text-primary/15 leading-none mb-4 font-serif">
                  "
                </div>

                <p className="text-slate-900 dark:text-white font-bold text-lg leading-relaxed mb-6">
                  We do not just build websites. We build digital
                  experiences that drive real business growth.
                </p>

                {/* Divider */}
                <div className="h-px bg-border/50 dark:bg-border/20 mb-6" />

                {/* Team mini avatars */}
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {['D', 'F', 'T'].map((letter, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-card dark:border-card flex items-center justify-center text-white text-xs font-black"
                        style={{
                          backgroundColor: `hsl(var(--primary) / ${1 - i * 0.2})`,
                        }}
                      >
                        {letter}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      DevsFusion Team
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Building great products together
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default WhyChooseUs;