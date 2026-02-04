import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './models/Service.js';

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

const seedServices = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected to MongoDB');

        // Clear existing services
        await Service.deleteMany({});
        console.log('Cleared existing services');

        // Insert new services
        const createdServices = await Service.insertMany(services);
        console.log(`Inserted ${createdServices.length} services`);

        console.log('Services seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding services:', error);
        process.exit(1);
    }
};

seedServices();
