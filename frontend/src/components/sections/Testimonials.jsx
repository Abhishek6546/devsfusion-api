import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Section from '../ui/Section';
import { testimonialService } from '../../api/services/testimonialService';

const renderStars = (rating) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={12}
        className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
      />
    ))}
  </div>
);

const TestimonialCard = ({ testimonial }) => (
  <div className="flex-shrink-0 w-[360px] sm:w-[380px] bg-card dark:bg-card border border-border/50 dark:border-white/20 rounded-2xl p-6 mx-3 hover:border-primary/30 dark:hover:border-white/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 cursor-default">
    
    {/* Quote mark */}
    <div className="text-primary text-4xl font-black leading-none mb-4 font-serif">
      "
    </div>

    {/* Message */}
    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium mb-6 line-clamp-4">
      {testimonial.message}
    </p>

    {/* Author */}
    <div className="flex items-center gap-3 pt-4 border-t border-border/40 dark:border-white/20">
      <img
        src={
          testimonial.avatar ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.name}`
        }
        alt={testimonial.name}
        className="w-10 h-10 rounded-full object-cover border-2 border-primary/20 bg-secondary flex-shrink-0"
      />
      <div className="min-w-0">
        <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
          {testimonial.name}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {testimonial.designation}
          {testimonial.company ? `, ${testimonial.company}` : ''}
        </p>
        {testimonial.rating && (
          <div className="mt-0.5">
            {renderStars(testimonial.rating)}
          </div>
        )}
      </div>
    </div>
  </div>
);

const MarqueeRow = ({ items, direction = 'left', speed = 40 }) => {
  const [isPaused, setIsPaused] = useState(false);
  const rowRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);

  // Duplicate enough for seamless loop
  const doubled = [...items, ...items, ...items];

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const step = direction === 'left' ? 0.5 : -0.5;

    const animate = () => {
      if (!isPaused) {
        posRef.current += step;
        const singleWidth = row.scrollWidth / 3;

        if (direction === 'left' && posRef.current >= singleWidth) {
          posRef.current = 0;
        }
        if (direction === 'right' && posRef.current <= 0) {
          posRef.current = singleWidth;
        }

        row.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    // Init right-direction offset
    if (direction === 'right') {
      posRef.current = row.scrollWidth / 3;
    }

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPaused, direction]);

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={rowRef}
        className="flex py-3"
        style={{ willChange: 'transform' }}
      >
        {doubled.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial._id}-${index}`}
            testimonial={testimonial}
          />
        ))}
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await testimonialService.getAllTestimonials({ featured: true, limit: 12 });
        setTestimonials(data.data?.testimonials || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Split into two rows
  const mid = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, mid);

  return (
    <Section className="py-20 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-primary/5 dark:bg-primary/8 rounded-full blur-3xl" />
      </div>

      {/* Left + Right edge fades */}
      <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-14 px-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">
              Testimonials
            </span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4 max-w-2xl mx-auto">
            Words of praise from others{' '}
            <span className="text-primary">about our work.</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            Do not just take our word for it — here is what our clients have to say.
          </p>
        </motion.div>

        {/* Loading skeleton */}
        {loading ? (
          <div className="space-y-4 px-6">
            {[1, 2].map(row => (
              <div key={row} className="flex gap-6 overflow-hidden">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-80 h-48 rounded-2xl bg-card border border-border/50 animate-pulse"
                  />
                ))}
              </div>
            ))}
          </div>
        ) : testimonials.length > 0 ? (
          <div className="space-y-4">
            {/* Row 1 — scrolls left */}
            {row1.length > 0 && (
              <MarqueeRow items={row1} direction="left" />
            )}

          </div>
        ) : (
          <p className="text-center text-muted-foreground">No testimonials yet.</p>
        )}

      </div>
    </Section>
  );
};

export default Testimonials;