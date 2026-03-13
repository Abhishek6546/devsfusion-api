import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Palette, Smartphone, Database, Cloud, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from './Card';

const iconMap = {
  Code: <Code size={32} />,
  Palette: <Palette size={32} />,
  Lightbulb: <Lightbulb size={32} />,
  Smartphone: <Smartphone size={32} />,
  Database: <Database size={32} />,
  Cloud: <Cloud size={32} />,
};

const ServiceCard = ({ service, index }) => {
  const getIcon = (iconName) => iconMap[iconName] || <Code size={32} />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="p-8 h-full flex flex-col group hover:shadow-xl transition-all hover:-translate-y-1">
        <div className="mb-6 flex justify-between items-start">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
            {service.image ? (
              <img src={service.image} alt={service.title} className="w-8 h-8 object-contain" />
            ) : (
              getIcon(service.icon)
            )}
          </div>
          <span className="text-4xl font-black text-primary/5 group-hover:text-primary/10 transition-colors">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
          {service.title}
        </h3>

        <p className="text-muted-foreground mb-8 line-clamp-3 leading-relaxed">
          {service.description}
        </p>

        <div className="mt-auto pt-6 border-t border-border/50">
          <Link
            to="/services"
            className="text-primary font-bold inline-flex items-center gap-2 hover:gap-3 transition-all"
          >
            Learn more <ArrowRight size={18} />
          </Link>
        </div>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;