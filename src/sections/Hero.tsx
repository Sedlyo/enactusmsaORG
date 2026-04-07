import { useState, useEffect } from 'react';
import { Instagram, ChevronDown } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import TikTokIcon from '../components/TikTokIcon';

export default function Hero() {
  const content = useContent();
  const { hero } = content;
  const [logoIndex, setLogoIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setLogoIndex((p) => (p + 1) % 2), 9000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* Scrolling background text */}
      <div className="absolute inset-0 z-[1] flex items-center pointer-events-none select-none overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <h1 className="text-[40vw] sm:text-[20vw] font-black text-yellow-400/[0.20] whitespace-nowrap tracking-tighter">
            ENACTUS MSA&nbsp;&nbsp;&nbsp;ENACTUS MSA&nbsp;&nbsp;&nbsp;ENACTUS&nbsp;&nbsp;&nbsp;
          </h1>
          <h1 className="text-[40vw] sm:text-[20vw] font-black text-yellow-400/[0.20] whitespace-nowrap tracking-tighter" aria-hidden>
            ENACTUS MSA&nbsp;&nbsp;&nbsp;ENACTUS MSA&nbsp;&nbsp;&nbsp;ENACTUS MSA&nbsp;&nbsp;&nbsp;
          </h1>
        </div>
      </div>

      {/* Social links */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-8 bg-white/10 backdrop-blur-md border-l border-white/20 py-8 px-5 rounded-l-2xl shadow-xl">
        <a href="https://www.instagram.com/enactusmsauniversity_/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 hover:scale-110 transition-all duration-300">
          <Instagram size={26} />
        </a>
        <a href="https://www.tiktok.com/@enactusmsa" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 hover:scale-110 transition-all duration-300">
          <TikTokIcon size={26} />
        </a>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center section-padding">
        <div className="relative w-full max-w-md mx-auto animate-float">
          <img
            src={hero.enactusLogo}
            alt="Enactus LOGO"
            className={`w-full h-auto object-contain drop-shadow-2xl transition-opacity duration-1000 ${logoIndex === 0 ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
          />
          <img
            src={hero.msaLogo}
            alt="MSA Logo"
            className={`w-full h-auto object-contain drop-shadow-2xl transition-opacity duration-1000 ${logoIndex === 1 ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
          />
          <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
            <div className="w-full h-full bg-gradient-to-r from-yellow-600 via-amber-400 to-yellow-500 rounded-full" />
          </div>
        </div>

        <p className="mt-6 text-3xl md:text-5xl font-black text-white tracking-tighter text-center">
          {logoIndex === 0 ? hero.subtitle : hero.msaSubtitle}
        </p>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-white/40 tracking-widest uppercase">Scroll</span>
          <ChevronDown className="text-white/40 animate-bounce" size={20} />
        </div>
      </div>
    </section>
  );
}
