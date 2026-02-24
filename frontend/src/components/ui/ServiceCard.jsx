import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Palette, Smartphone, Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICE_ICONS = [
  <Code size={28} />,
  <Palette size={28} />,
  <Smartphone size={28} />,
  <Cloud size={28} />,
];

const ServiceCard = ({ service, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl p-6 cursor-pointer overflow-hidden border"
      style={{
        borderColor: hovered ? 'transparent' : 'hsl(var(--border) / 0.5)',
        backgroundColor: 'hsl(var(--card))',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0px)',
        boxShadow: hovered
          ? '0 25px 50px -10px hsl(var(--primary) / 0.3)'
          : 'none',
        transition:
          'transform 0.45s cubic-bezier(0.4,0,0.2,1), box-shadow 0.45s cubic-bezier(0.4,0,0.2,1), border-color 0.45s ease',
      }}
    >
      {/* Gradient bg slides up on hover */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.78) 100%)',
          transform: hovered ? 'translateY(0%)' : 'translateY(101%)',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* Decorative dots */}
      <div
        className="absolute top-3 right-5 w-2 h-2 rounded-full"
        style={{
          backgroundColor: hovered ? 'rgba(255,255,255,0.25)' : 'hsl(var(--primary) / 0.2)',
          transition: 'background-color 0.4s ease',
        }}
      />
      <div
        className="absolute bottom-5 right-3 w-1.5 h-1.5 rounded-full"
        style={{
          backgroundColor: hovered ? 'rgba(255,255,255,0.15)' : 'hsl(var(--primary) / 0.15)',
          transition: 'background-color 0.4s ease',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full gap-4">

        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: hovered ? 'rgba(255,255,255,0.2)' : 'hsl(var(--primary) / 0.1)',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'background-color 0.4s ease, transform 0.4s ease',
          }}
        >
          <span
            style={{
              color: hovered ? 'white' : 'hsl(var(--primary))',
              transition: 'color 0.4s ease',
              display: 'flex',
            }}
          >
            {SERVICE_ICONS[index % SERVICE_ICONS.length]}
          </span>
        </div>

        {/* Title — from API */}
        <h3
          className="text-lg font-black leading-snug"
          style={{
            color: hovered ? 'white' : 'hsl(var(--foreground))',
            transition: 'color 0.4s ease',
          }}
        >
          {service.title}
        </h3>

        {/* Description — from API */}
        <p
          className="text-sm leading-relaxed line-clamp-3 flex-grow"
          style={{
            color: hovered ? 'rgba(255,255,255,0.82)' : 'hsl(var(--muted-foreground))',
            transition: 'color 0.4s ease',
          }}
        >
          {service.description}
        </p>

        {/* Arrow Button */}
        <div className="mt-auto">
          <Link to="/services">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: hovered ? 'white' : 'hsl(var(--primary) / 0.1)',
                transform: hovered ? 'scale(1.1)' : 'scale(1)',
                transition: 'background-color 0.4s ease, transform 0.4s ease',
              }}
            >
              <ArrowRight
                size={16}
                className="-rotate-45"
                style={{ color: 'hsl(var(--primary))' }}
              />
            </div>
          </Link>
        </div>

      </div>
    </motion.div>
  );
};

export default ServiceCard;