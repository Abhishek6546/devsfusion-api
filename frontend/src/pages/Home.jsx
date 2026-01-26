import { motion } from 'framer-motion';
import { ArrowRight, Check, Code2, Palette, Rocket, Users, Award, TrendingUp } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Section from '../components/ui/Section';
import { Link } from 'react-router-dom';

const Home = () => {
  const services = [
    {
      title: 'Web Development',
      desc: 'Custom web applications built with React, Node.js, and modern frameworks.',
      icon: <Code2 size={28} className="text-primary" />
    },
    {
      title: 'UI/UX Design',
      desc: 'User-centered design that balances aesthetics with functionality.',
      icon: <Palette size={28} className="text-primary" />
    },
    {
      title: 'Consulting',
      desc: 'Technical guidance and architecture planning for your projects.',
      icon: <Rocket size={28} className="text-primary" />
    }
  ];

  const stats = [
    { icon: <Users size={24} />, value: '50+', label: 'Happy Clients' },
    { icon: <Award size={24} />, value: '150+', label: 'Projects Completed' },
    { icon: <TrendingUp size={24} />, value: '8+', label: 'Years Experience' }
  ];

  const testimonials = [
    {
      quote: "DevsFusion delivered our e-commerce platform ahead of schedule. Their attention to detail and technical expertise was impressive.",
      author: "Sarah Chen",
      role: "CEO, TechStyle",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
      quote: "Working with DevsFusion was a game-changer for our startup. They understood our vision and brought it to life perfectly.",
      author: "Michael Rodriguez",
      role: "Founder, StartupHub",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                Available for new projects
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                We build digital products for growing businesses
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                DevsFusion is a development studio focused on creating high-quality web applications. We work with startups and established companies to bring their ideas to life.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button size="lg">
                    Get in touch <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button variant="outline" size="lg">View our work</Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center">
                <img 
                  src="https://illustrations.popsy.co/amber/web-design.svg" 
                  alt="Web Development Illustration"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <Section className="bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg text-primary mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What we do</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We offer a range of services to help you build and grow your digital products
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={service.title} className="p-8 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.desc}</p>
                <Link to="/services" className="text-primary font-medium inline-flex items-center hover:gap-2 transition-all">
                  Learn more <ArrowRight size={16} className="ml-1" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section className="bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Why work with us</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're a small team that values quality over quantity. Every project gets our full attention and expertise.
              </p>
              <ul className="space-y-4">
                {[
                  'Direct communication with developers',
                  'Transparent pricing and timelines',
                  'Clean, maintainable code',
                  'Ongoing support after launch'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="text-primary" size={16} />
                    </div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img 
                src="https://illustrations.popsy.co/amber/teamwork.svg" 
                alt="Teamwork Illustration"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What our clients say</h2>
            <p className="text-xl text-muted-foreground">
              Don't just take our word for it
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full bg-secondary"
                  />
                  <div>
                    <div className="font-bold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to start your project?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how we can help bring your idea to life.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Start a conversation <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
};

export default Home;
