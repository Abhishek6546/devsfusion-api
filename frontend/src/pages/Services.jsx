import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Lightbulb, ArrowRight, CheckCircle, Smartphone, Database, Cloud } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { serviceService } from '../api/services/serviceService';

// Map icon names from backend to actual components
const iconMap = {
  Code: <Code size={40} />,
  Palette: <Palette size={40} />,
  Lightbulb: <Lightbulb size={40} />,
  Smartphone: <Smartphone size={40} />,
  Database: <Database size={40} />,
  Cloud: <Cloud size={40} />,
};

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

  // Get icon component from icon name
  const getIcon = (iconName) => {
    return iconMap[iconName] || <Code size={40} />;
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Our Services</h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We offer a comprehensive range of services to help you build, launch, and scale your digital products. From initial concept to ongoing support, we're with you every step of the way.
          </p>
        </div>

        {/* Services */}
        <div className="space-y-16 sm:space-y-24 lg:space-y-32">
          {loading ? (
            // Loading skeleton
            [1, 2, 3].map((i) => (
              <div key={i} className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-pulse">
                <div>
                  <div className="w-10 h-10 bg-secondary rounded mb-6"></div>
                  <div className="h-8 bg-secondary rounded w-3/4 mb-6"></div>
                  <div className="h-4 bg-secondary rounded w-full mb-2"></div>
                  <div className="h-4 bg-secondary rounded w-5/6 mb-8"></div>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {[1, 2, 3, 4, 5, 6].map((j) => (
                      <div key={j} className="h-4 bg-secondary rounded"></div>
                    ))}
                  </div>
                </div>
                <div className="aspect-square rounded-2xl bg-secondary"></div>
              </div>
            ))
          ) : (
            services.map((service, index) => (
              <div key={service._id} className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center`}>
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="mb-4 sm:mb-6 text-primary">{getIcon(service.icon)}</div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">{service.title}</h2>
                  <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">{service.description}</p>

                  <div className="mb-6 sm:mb-8">
                    <h3 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">What's included:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {service.features?.map((feature) => (
                        <div key={feature} className="flex items-start gap-2">
                          <CheckCircle size={18} className="text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="font-bold mb-3 text-sm text-muted-foreground">Technologies we use:</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies?.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-secondary rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link to="/contact">
                    <Button size="lg">
                      Get started <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </Link>
                </div>

                <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-12 flex items-center justify-center">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Process Section */}
        <Section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We follow a proven process to ensure your project's success
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your goals and requirements' },
              { step: '02', title: 'Planning', desc: 'Creating a roadmap and technical architecture' },
              { step: '03', title: 'Development', desc: 'Building your product with regular updates' },
              { step: '04', title: 'Launch & Support', desc: 'Deploying and providing ongoing maintenance' }
            ].map((phase) => (
              <Card key={phase.step} className="p-6 text-center">
                <div className="text-4xl font-bold text-primary/20 mb-4">{phase.step}</div>
                <h3 className="font-bold mb-2">{phase.title}</h3>
                <p className="text-sm text-muted-foreground">{phase.desc}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <Section className="mt-32 bg-secondary/30 rounded-2xl">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Not sure what you need?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's have a conversation about your project. We'll help you figure out the best approach and provide a detailed proposal.
            </p>
            <a href="https://calendly.com/contact-devsfusion/30min" target="_blank" rel="noopener noreferrer">
              <Button size="lg">Schedule a free consultation</Button>
            </a>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Services;
