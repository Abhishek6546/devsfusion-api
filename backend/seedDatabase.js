import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './models/Service.js';
import Project from './models/Project.js';
import Testimonial from './models/Testimonial.js';

dotenv.config();

const services = [
    {
        title: 'Web Development',
        icon: 'Code',
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
        technologies: ['React', 'Node.js', 'MongoDB', 'PostgreSQL', 'AWS'],
        order: 1,
        isActive: true
    },
    {
        title: 'UI/UX Design',
        icon: 'Palette',
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
        technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision'],
        order: 2,
        isActive: true
    },
    {
        title: 'Technical Consulting',
        icon: 'Lightbulb',
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
        technologies: ['Docker', 'Kubernetes', 'GitHub Actions', 'AWS', 'Azure'],
        order: 3,
        isActive: true
    }
];

const projects = [
    {
        title: 'E-Commerce Platform',
        description: 'A full-featured online store with inventory management, payment processing, and real-time order tracking. Built with modern technologies for optimal performance.',
        imageLink: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
        techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
        liveLink: 'https://example-ecommerce.com',
        githubLink: 'https://github.com/devsfusion/ecommerce',
        featured: true,
        order: 1
    },
    {
        title: 'Healthcare Dashboard',
        description: 'Patient management system with appointment scheduling, medical records, and analytics dashboard for healthcare providers.',
        imageLink: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
        techStack: ['Next.js', 'PostgreSQL', 'Prisma', 'Chart.js'],
        liveLink: 'https://example-healthcare.com',
        githubLink: '',
        featured: true,
        order: 2
    },
    {
        title: 'SaaS Analytics Platform',
        description: 'Business intelligence dashboard with real-time data visualization, custom reports, and team collaboration features.',
        imageLink: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        techStack: ['Vue.js', 'Python', 'FastAPI', 'PostgreSQL'],
        liveLink: 'https://example-analytics.com',
        githubLink: 'https://github.com/devsfusion/analytics',
        featured: true,
        order: 3
    },
    {
        title: 'Real Estate Marketplace',
        description: 'Property listing platform with advanced search, virtual tours, and integrated mortgage calculator.',
        imageLink: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
        techStack: ['React', 'Express', 'MongoDB', 'Mapbox'],
        liveLink: 'https://example-realestate.com',
        githubLink: '',
        featured: false,
        order: 4
    },
    {
        title: 'Learning Management System',
        description: 'Online education platform with video courses, quizzes, progress tracking, and certificate generation.',
        imageLink: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
        techStack: ['Next.js', 'Node.js', 'MongoDB', 'AWS S3'],
        liveLink: 'https://example-lms.com',
        githubLink: 'https://github.com/devsfusion/lms',
        featured: false,
        order: 5
    },
    {
        title: 'Food Delivery App',
        description: 'Mobile-first food ordering platform with real-time order tracking, restaurant management, and driver app.',
        imageLink: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
        techStack: ['React Native', 'Node.js', 'Socket.io', 'MongoDB'],
        liveLink: 'https://example-fooddelivery.com',
        githubLink: '',
        featured: false,
        order: 6
    }
];

const testimonials = [
    {
        name: 'Sarah Chen',
        designation: 'CEO',
        company: 'TechStyle',
        message: "DevsFusion delivered our e-commerce platform ahead of schedule. Their attention to detail and technical expertise was impressive. The team was communicative and professional throughout.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        rating: 5,
        featured: true
    },
    {
        name: 'Michael Rodriguez',
        designation: 'Founder',
        company: 'StartupHub',
        message: "Working with DevsFusion was a game-changer for our startup. They understood our vision and brought it to life perfectly. Highly recommend for any web development project.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        rating: 5,
        featured: true
    },
    {
        name: 'Emily Watson',
        designation: 'Product Manager',
        company: 'HealthTech Inc',
        message: "The healthcare dashboard they built for us has transformed how we manage patient data. Clean code, great documentation, and excellent ongoing support.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
        rating: 5,
        featured: true
    },
    {
        name: 'David Kim',
        designation: 'CTO',
        company: 'DataFlow Analytics',
        message: "Their technical consulting helped us avoid costly mistakes and choose the right architecture. The team's expertise in modern web technologies is top-notch.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        rating: 5,
        featured: true
    }
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected to MongoDB');

        // Seed Services
        await Service.deleteMany({});
        const createdServices = await Service.insertMany(services);
        console.log(`✓ Inserted ${createdServices.length} services`);

        // Seed Projects
        await Project.deleteMany({});
        const createdProjects = await Project.insertMany(projects);
        console.log(`✓ Inserted ${createdProjects.length} projects`);

        // Seed Testimonials
        await Testimonial.deleteMany({});
        const createdTestimonials = await Testimonial.insertMany(testimonials);
        console.log(`✓ Inserted ${createdTestimonials.length} testimonials`);

        console.log('\n🎉 Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
