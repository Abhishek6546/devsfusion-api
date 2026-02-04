import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 pt-20 pb-10 border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">D</div>
              <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">DevsFusion</div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              Crafting digital experiences that empower businesses. We build scalable, high-performance web applications with cutting-edge technology.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-300 border border-slate-200 dark:border-white/5 hover:border-primary/50">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-400 dark:hover:text-white transition-all duration-300 border border-slate-200 dark:border-white/5 hover:border-blue-400/50">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300 border border-slate-200 dark:border-white/5 hover:border-blue-600/50">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-8 text-slate-900 dark:text-white">Company</h3>
            <ul className="space-y-4 text-sm">
              {['About Us', 'Portfolio', 'Services', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-slate-600 dark:text-slate-400 hover:text-primary hover:pl-2 transition-all duration-300 inline-block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-8 text-slate-900 dark:text-white">Services</h3>
            <ul className="space-y-4 text-sm">
              {['Web Development', 'UI/UX Design', 'Cloud Solutions', 'Consulting'].map((item) => (
                <li key={item}>
                  <Link to="/services" className="text-slate-600 dark:text-slate-400 hover:text-primary hover:pl-2 transition-all duration-300 inline-block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-8 text-slate-900 dark:text-white">Contact</h3>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                <MapPin size={18} className="text-primary mt-0.5" />
                <span>SCO 12, Ranjit Avenue,<br />Amritsar, Punjab</span>
              </li>
              <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <Phone size={18} className="text-primary" />
                <span>+91 62834 21968</span>
              </li>
              <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                <Mail size={18} className="text-primary" />
                <span>contact.devsfusion@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <div>
            © {new Date().getFullYear()} DevsFusion. All rights reserved.
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
