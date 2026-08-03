import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import TransitionOverlay from './TransitionOverlay';
import { useContent } from '../context/ContentContext';

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
  const content = useContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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

  const logoUrl = content.settings?.logo || '/assets/enactusMSA2.png';

  return (
    <>
      <TransitionOverlay active={transitioning} />

      {/* Global Header Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/85 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.9)] py-2'
            : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-3.5'
        }`}
      >
        <div className="container-custom section-padding">
          <div className="flex items-center justify-between h-16 sm:h-24">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="flex items-center group transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              <img
                src={logoUrl}
                alt="Enactus MSA Logo"
                className="h-16 sm:h-24 md:h-28 w-auto object-contain drop-shadow-[0_0_15px_rgba(251,191,36,0.25)]"
              />
            </a>

            {/* Desktop Nav Links (Urbanist Font) */}
            <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] backdrop-blur-xl px-6 py-2 rounded-full border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.6)] font-urbanist">
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
                    className={`relative px-4 py-2 text-xs uppercase tracking-widest font-extrabold transition-all duration-300 rounded-full ${
                      isActive
                        ? 'text-amber-400 bg-amber-400/[0.08]'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
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
              className="lg:hidden text-white p-3 rounded-full bg-white/10 border border-white/20 active:bg-amber-400 active:text-black hover:border-amber-400/50 transition-all duration-300 shadow-md touch-manipulation"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Fullscreen Drawer (Urbanist Font) */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl transition-all duration-500 lg:hidden flex flex-col justify-center px-6 py-12 overflow-y-auto ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-6'
        }`}
      >
        {/* Background Subtle Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-400/10 blur-[130px] rounded-full pointer-events-none" />

        {/* Mobile Navigation Links */}
        <div className="flex flex-col gap-3 my-auto py-4">
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
                className={`group flex items-center justify-between py-3.5 px-5 rounded-2xl font-urbanist font-extrabold text-2xl sm:text-3xl uppercase tracking-wider transition-all duration-300 border ${
                  isActive
                    ? 'text-amber-400 bg-amber-400/[0.08] border-amber-400/40 shadow-[0_0_25px_rgba(251,191,36,0.15)]'
                    : 'text-white/80 border-white/5 bg-white/[0.02] hover:text-amber-400 hover:bg-white/[0.06] hover:border-white/20'
                } ${
                  isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-white/30 group-hover:text-amber-400 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{link.name}</span>
                </div>
                <ArrowRight
                  size={20}
                  className={`transition-transform duration-300 ${
                    isActive ? 'text-amber-400 translate-x-1' : 'text-white/30 group-hover:text-amber-400 group-hover:translate-x-1'
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* Drawer Footer info */}
        <div className="pt-6 border-t border-white/10 text-center font-urbanist">
          <p className="text-white/50 text-xs tracking-wider">
            Empowering Leaders &bull; MSA University
          </p>
        </div>
      </div>
    </>
  );
}