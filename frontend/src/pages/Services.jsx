import { motion } from 'framer-motion';
import { Code, Palette, Lightbulb, ArrowRight, CheckCircle } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: 'Web Development',
      icon: <Code size={40} />,
      description: 'We build custom web applications using modern technologies like React, Next.js, and Node.js. Our focus is on creating scalable, maintainable solutions that grow with your business.',
      image: 'https://illustrations.popsy.co/amber/coding.svg',
      features: [
        'Single Page Applications (SPA)',
        'Progressive Web Apps (PWA)',
        'RESTful API Development',
        'Database Design & Optimization',
        'Third-party Integrations',
        'Performance Optimization'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'PostgreSQL', 'AWS']
    },
    {
      title: 'UI/UX Design',
      icon: <Palette size={40} />,
      description: 'Our design process starts with understanding your users and business goals. We create interfaces that are both beautiful and functional, ensuring a seamless user experience.',
      image: 'https://illustrations.popsy.co/amber/design-thinking.svg',
      features: [
        'User Research & Testing',
        'Wireframing & Prototyping',
        'Visual Design & Branding',
        'Design Systems',
        'Responsive Design',
        'Accessibility (WCAG)'
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision']
    },
    {
      title: 'Technical Consulting',
      icon: <Lightbulb size={40} />,
      description: 'Need guidance on technology choices or architecture? We help teams make informed decisions, avoid common pitfalls, and establish best practices for long-term success.',
      image: 'https://illustrations.popsy.co/amber/solution.svg',
      features: [
        'Technology Stack Selection',
        'Architecture Planning',
        'Code Reviews & Audits',
        'Team Training & Mentoring',
        'DevOps & CI/CD Setup',
        'Security Best Practices'
      ],
      technologies: ['Docker', 'Kubernetes', 'GitHub Actions', 'AWS', 'Azure']
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We offer a comprehensive range of services to help you build, launch, and scale your digital products. From initial concept to ongoing support, we're with you every step of the way.
          </p>
        </div>

        {/* Services */}
        <div className="space-y-32">
          {services.map((service, index) => (
            <div key={service.title} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="mb-6 text-primary">{service.icon}</div>
                <h2 className="text-4xl font-bold mb-6">{service.title}</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{service.description}</p>
                
                <div className="mb-8">
                  <h3 className="font-bold mb-4 text-lg">What's included:</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {service.features.map((feature) => (
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
                    {service.technologies.map((tech) => (
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
          ))}
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
            <Link to="/contact">
              <Button size="lg">Schedule a free consultation</Button>
            </Link>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Services;
