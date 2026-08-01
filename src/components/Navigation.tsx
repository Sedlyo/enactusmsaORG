import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import TransitionOverlay from './TransitionOverlay';

const navLinks = [
  { name: 'Home', href: '#home', sectionId: 'home' },
  { name: 'About', href: '#about', sectionId: 'about' },
  { name: 'Board', href: '#board', sectionId: 'board' },
  { name: 'Committees', href: '#services', sectionId: 'services' },
  { name: 'Sponsors', href: '#sponsors', sectionId: 'sponsors' },
  { name: 'Team', href: '#team', sectionId: 'team' },
  { name: 'Contact', href: '#contact', sectionId: 'contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scrollspy observer for active section detection
  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.sectionId);
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0.1,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    if (transitioning) return;
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
    }, 850);
  };

  return (
    <>
      <TransitionOverlay active={transitioning} />

      {/* Global Header Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-1'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-2'
        }`}
      >
        <div className="container-custom section-padding">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="flex items-center group transition-transform duration-300 hover:scale-105"
            >
              <img
                src="/assets/enactusMSA2.png"
                alt="Enactus MSA"
                className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_0_12px_rgba(251,191,36,0.3)]"
              />
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] backdrop-blur-md px-6 py-2 rounded-full border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
              {navLinks.map((link) => {
                const isActive = activeSection === link.sectionId;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className={`relative px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all duration-300 rounded-full ${
                      isActive
                        ? 'text-amber-400 bg-amber-400/[0.08]'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-4 h-0.5 bg-amber-400 rounded-full" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-amber-400/50 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col justify-center ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-6 px-6">
          {navLinks.map((link, index) => {
            const isActive = activeSection === link.sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`text-2xl font-black uppercase tracking-wider transition-all duration-300 pl-4 border-l-2 ${
                  isActive ? 'text-amber-400 border-amber-400' : 'text-white/60 border-transparent hover:text-white hover:border-white/20'
                } ${
                  isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                {link.name}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}