import { Instagram, ArrowUp } from 'lucide-react';
import TikTokIcon from '../components/TikTokIcon';

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
              &copy; {new Date().getFullYear()} Enactus MSA. All rights reserved.
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
              <TikTokIcon size={20} />
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
