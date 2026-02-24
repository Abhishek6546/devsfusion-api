import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, MapPin, Phone, ArrowRight, Heart } from 'lucide-react';
import logo from '../../assets/images/devsfusion_logo.png';
import whiteLogo from '../../assets/images/devsfusion-white-logo.png';

const footerLinks = {
  company: [
    { label: 'About Us', to: '/about-us' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Services', to: '/services' },
    { label: 'Contact', to: '/contact' },
  ],
  services: [
    { label: 'Web Development', to: '/services' },
    { label: 'UI/UX Design', to: '/services' },
    { label: 'Cloud Solutions', to: '/services' },
    { label: 'Consulting', to: '/services' },
  ],
};

const socials = [
  { icon: <Github size={16} />, href: '#', label: 'GitHub' },
  { icon: <Twitter size={16} />, href: '#', label: 'Twitter' },
  { icon: <Linkedin size={16} />, href: '#', label: 'LinkedIn' },
  { icon: <Mail size={16} />, href: 'mailto:contact.devsfusion@gmail.com', label: 'Email' },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-slate-50 dark:bg-[#0a0a0f] border-t border-slate-200 dark:border-white/5 transition-colors duration-300">

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-primary/5 dark:bg-primary/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">

        {/* ── Top CTA Strip ── */}
        {/* <div className="bg-primary">
          <div className="container mx-auto max-w-7xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <p className="text-white font-semibold text-sm text-center sm:text-left">
                Have a project in mind? Let us bring it to life together.
              </p>
            </div>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-primary text-sm font-black hover:bg-white/90 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0"
            >
              Start a project
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div> */}

        {/* ── Main Footer Content ── */}
        <div className="container mx-auto px-6 max-w-7xl pt-14 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">

            {/* ── Brand — wider column ── */}
            <div className="lg:col-span-4 space-y-6">
              {/* Light logo */}
              <img
                src={logo}
                alt="DevsFusion"
                className="h-9 w-auto object-contain block dark:hidden"
              />
              {/* Dark logo — slightly larger */}
              <img
                src={whiteLogo}
                alt="DevsFusion"
                className="h-11 w-auto object-contain hidden dark:block"
              />

              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm max-w-xs">
                Crafting digital experiences that empower businesses. We build
                scalable, high-performance web applications with cutting-edge technology.
              </p>

              {/* Social icons */}
              <div className="flex gap-2.5 pt-1">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-1 hover:shadow-md hover:shadow-primary/20 transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {/* Mini stat pills */}
             
            </div>

            {/* ── Company Links ── */}
            <div className="lg:col-span-2">
              <h3 className="font-black text-xs text-slate-900 dark:text-white mb-6 uppercase tracking-[0.15em] flex items-center gap-2">
                <span className="w-4 h-px bg-primary rounded-full" />
                Company
              </h3>
              <ul className="space-y-3.5">
                {footerLinks.company.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="group flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-all duration-300"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-primary rounded-full transition-all duration-300 flex-shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Services ── */}
            <div className="lg:col-span-2">
              <h3 className="font-black text-xs text-slate-900 dark:text-white mb-6 uppercase tracking-[0.15em] flex items-center gap-2">
                <span className="w-4 h-px bg-primary rounded-full" />
                Services
              </h3>
              <ul className="space-y-3.5">
                {footerLinks.services.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="group flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-all duration-300"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-primary rounded-full transition-all duration-300 flex-shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Contact ── */}
            <div className="lg:col-span-4">
              <h3 className="font-black text-xs text-slate-900 dark:text-white mb-6 uppercase tracking-[0.15em] flex items-center gap-2">
                <span className="w-4 h-px bg-primary rounded-full" />
                Contact Us
              </h3>

              <div className="space-y-3">
                {/* Address */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <MapPin size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-0.5">Location</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      SCO 12, Ranjit Avenue, Amritsar, Punjab
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <a
                  href="tel:+916283421968"
                  className="group flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/15 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <Phone size={14} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-0.5">Phone</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors duration-300">
                      +91 62834 21968
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:contact.devsfusion@gmail.com"
                  className="group flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/15 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <Mail size={14} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-0.5">Email</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors duration-300 break-all">
                      contact.devsfusion@gmail.com
                    </p>
                  </div>
                </a>

              </div>
            </div>
          </div>

          {/* ── Bottom Bar ── */}
          <div className="border-t border-slate-200 dark:border-white/5 pt-7 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              © {new Date().getFullYear()}
              <span className="text-primary font-bold">DevsFusion</span>
      
            </p>

            <div className="flex items-center gap-1">
              {['Privacy Policy', 'Terms of Service', 'Cookies'].map((item, i, arr) => (
                <span key={item} className="flex items-center">
                  <a
                    href="#"
                    className="text-xs text-slate-400 dark:text-slate-500 hover:text-primary dark:hover:text-primary transition-colors duration-300 px-2"
                  >
                    {item}
                  </a>
                  {i < arr.length - 1 && (
                    <span className="w-px h-3 bg-slate-300 dark:bg-white/10" />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;