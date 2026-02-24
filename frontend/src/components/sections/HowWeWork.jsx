import { motion } from 'framer-motion';
import Section from '../ui/Section';

const steps = [
  {
    number: '01',
    title: 'Define',
    description: 'We begin by understanding your business, goals, and audience. Deep discovery sessions help us map out a clear strategy and project scope tailored to your needs.',
    align: 'right',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Our designers craft pixel-perfect interfaces that balance aesthetics with usability. Every screen is designed to guide users and reflect your brand identity.',
    align: 'left',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Our engineers bring designs to life with clean, scalable code. We use modern tech stacks to ensure performance, security, and maintainability.',
    align: 'right',
  },
  {
    number: '04',
    title: 'Launch',
    description: 'After thorough testing and your approval, we deploy your product. We handle every detail so your launch is smooth, on time, and stress-free.',
    align: 'left',
  },
];

const HowWeWork = () => {
  return (
    <Section className="py-20 relative overflow-hidden">

      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 dark:bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-primary/5 dark:bg-primary/8 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl px-6 relative z-10">

        {/* Header */}
        <motion.div
          className="mb-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          
        <div className="flex justify-center items-center gap-3 mb-4">
                <div className="h-px w-8 bg-primary" />
                <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Selected Work</span>
                <div className="h-px w-8 bg-primary" />
              </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4 text-center">
            Let us show you how we drive{' '}
            <br className="hidden sm:block" />
            your brand to{' '}
            <span className="text-primary">new heights</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Our proven process ensures every project is delivered with
            precision, creativity, and results that exceed expectations.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">

          {/* Vertical dashed center line — desktop only */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-primary/20 dark:border-primary/15 hidden md:block" />

          <div className="flex flex-col gap-8 md:gap-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-0 ${
                  step.align === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* Card */}
                <div className={`w-full md:w-[46%] ${step.align === 'right' ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div
                    className="group relative bg-card dark:bg-card border border-border/50 dark:border-border/20 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-primary/10 dark:hover:shadow-primary/15 transition-all duration-300 cursor-default"
                    style={{
                      transform: index % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'rotate(0deg) translateY(-4px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = index % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)';
                    }}
                  >
                    {/* Pin dot */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-card dark:bg-card border-2 border-primary shadow-md shadow-primary/30 flex items-center justify-center z-10">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    </div>

                    {/* Hover gradient */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Step number */}
                    <p className="text-xs font-black text-primary/50 tracking-[0.2em] mb-3 uppercase relative z-10">
                      {step.number}
                    </p>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors duration-200 relative z-10">
                      {step.title}
                    </h3>

                    {/* Accent line */}
                    <div className="h-0.5 w-8 bg-primary/40 rounded-full mb-3 group-hover:w-16 group-hover:bg-primary transition-all duration-300 relative z-10" />

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center dot on timeline */}
                <div className="hidden md:flex w-[8%] items-center justify-center flex-shrink-0 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/15 border-2 border-primary flex items-center justify-center shadow-lg shadow-primary/20">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                </div>

                {/* Empty spacer */}
                <div className="hidden md:block w-[46%]" />

              </motion.div>
            ))}
          </div>

          {/* Ready to deliver label */}
          <motion.div
            className="flex justify-end mt-10 pr-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 text-primary font-black text-lg italic">
              <span className="text-2xl">*</span>
              Ready to be delivered!
            </div>
          </motion.div>

        </div>
      </div>
    </Section>
  );
};

export default HowWeWork;