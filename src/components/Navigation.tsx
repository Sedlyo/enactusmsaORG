import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Board', href: '#board' },
  { name: 'Committees', href: '#services' },
  { name: 'Sponsors', href: '#sponsors' },
  { name: 'Team', href: '#team' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    setTransitioning(true);

    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);

    setTimeout(() => {
      setTransitioning(false);
    }, 900);
  };

  return (
    <>
      {/* Page transition overlay */}
      <div
        className={`fixed inset-0 z-[100] pointer-events-none transition-all duration-500 ${
          transitioning
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-y-0'
        }`}
        style={{ transformOrigin: 'top' }}
      >
        {/* Main sweep */}
        <div
          className={`absolute inset-0 bg-amber-400 transition-all duration-500 ${
            transitioning ? 'translate-y-0' : '-translate-y-full'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
        />
        {/* Second layer for depth */}
        <div
          className={`absolute inset-0 bg-amber-500 transition-all duration-500 delay-75 ${
            transitioning ? 'translate-y-0' : '-translate-y-full'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
        />
        {/* Enactus wordmark in center */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 delay-200 ${
            transitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <span className="text-black text-6xl font-black tracking-tighter">
            ENACTUS
          </span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-amber-400/10 backdrop-blur-lg border-b border-amber-400/20'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom section-padding">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="flex items-center"
            >
              <img src="/assets/enactusMSA2.png" alt="Enactus MSA" className="h-20 w-auto" />
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-300 uppercase tracking-wider"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-all duration-500 lg:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className={`text-2xl text-white hover:text-white/60 transition-all duration-300 uppercase tracking-wider ${
                isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}