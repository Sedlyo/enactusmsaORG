import { Instagram, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative w-full bg-black py-12 border-t border-white/10">
      <div className="container-custom section-padding">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          <div className="flex justify-start w-full lg:w-auto">
            <img src="/assets/enactusMSA2.png" alt="Enactus MSA" className="h-16 w-auto" />
          </div>

          <div className="text-center">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Enactus MSA. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/enactusmsauniversity_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-colors duration-300"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.tiktok.com/@enactusmsa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-colors duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5 2.592 2.592 0 0 1-2.59-2.5 2.592 2.592 0 0 1 2.59-2.5c.28 0 .54.04.79.1V9.87c-.26-.03-.53-.05-.79-.05a5.674 5.674 0 0 0-5.67 5.67 5.674 5.674 0 0 0 5.67 5.67 5.674 5.674 0 0 0 5.67-5.67V8.72a7.354 7.354 0 0 0 4.3 1.38V6.41a4.33 4.33 0 0 1-3.13-.59z"/>
              </svg>
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300"
            >
              <span className="text-xs uppercase tracking-wider">Back to Top</span>
              <ArrowUp size={16} />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}