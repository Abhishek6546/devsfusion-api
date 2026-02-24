import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, ArrowRight } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import logo from "../../assets/images/devsfusion_logo.png";
import whiteLogo from "../../assets/images/devsfusion-white-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="w-[90%] mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            <img
              src={theme === "dark" ? whiteLogo : logo}
              className={`transition-all duration-300 ${
                theme === "dark" ? "h-14" : "h-12"
              }`}
              alt="DevsFusion Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Theme Toggle Slider */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="relative w-16 h-8 flex items-center bg-secondary rounded-full p-1 transition-colors duration-300"
            >
              <Sun
                size={14}
                className="absolute left-2 text-muted-foreground"
              />
              <Moon
                size={14}
                className="absolute right-2 text-muted-foreground"
              />

              <div
                className={`absolute w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md transition-transform duration-300 ${
                  theme === "dark" ? "translate-x-8" : "translate-x-0"
                }`}
              >
                {theme === "dark" ? (
                  <Moon size={14} className="text-primary-foreground" />
                ) : (
                  <Sun size={14} className="text-primary-foreground" />
                )}
              </div>
            </button>

            {/* CTA Button */}
            <Link to="/contact">
              <button className="cssbuttons-io-button">
                Get Started
                <div className="icon">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="relative w-14 h-7 flex items-center bg-secondary rounded-full p-1 transition-colors duration-300"
            >
              <div
                className={`absolute w-5 h-5 rounded-full bg-primary transition-transform duration-300 ${
                  theme === "dark" ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <Link to="/contact" onClick={() => setIsOpen(false)}>
                <button className="cssbuttons-io-button w-full">
                  Get Started
                  <div className="icon">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;