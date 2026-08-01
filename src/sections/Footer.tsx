import { Instagram, ArrowUp } from 'lucide-react';
import TikTokIcon from '../components/TikTokIcon';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative w-full bg-black py-14 border-t border-white/10">
      <div className="container-custom section-padding">
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr] items-center">
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-center lg:justify-start">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-3">
              <img src="/assets/enactusMSA2.png" alt="Enactus MSA" className="h-14 w-auto" />
            </div>
            <div className="text-center lg:text-left">
              <p className="text-white text-lg font-semibold">Enactus MSA</p>
              <p className="text-white/40 text-sm mt-1">Connecting students, sponsors and community impact.</p>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <p className="text-white/50 text-sm uppercase tracking-[0.3em] mb-3">Stay connected</p>
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
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
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/70 hover:text-white hover:border-amber-400 transition-all duration-300"
              >
                <ArrowUp size={16} />
                <span className="text-[10px] uppercase tracking-[0.4em]">Back to Top</span>
              </button>
            </div>
          </div>

          <div className="text-center lg:text-right">
            <p className="text-white/40 text-sm">&copy; {new Date().getFullYear()} Enactus MSA. All rights reserved.</p>
            <p className="text-white/30 text-xs mt-2">Built for students, partners and impact leaders.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
