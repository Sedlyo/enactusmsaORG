import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useContent, siteContent as defaults } from '../context/ContentContext';

export default function Hero() {
  const content = useContent();
  const hero = content.hero || defaults.hero;
  const [logoIndex, setLogoIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setLogoIndex((p) => (p + 1) % 2), 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      
      {/* Dynamic Background Watermark Marquee */}
      <div className="absolute inset-0 z-[1] flex items-center pointer-events-none select-none overflow-hidden opacity-[0.035]">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-[50vw] sm:text-[28vw] font-black text-amber-400 tracking-tighter uppercase">
            ENACTUS MSA&nbsp;&nbsp;•&nbsp;&nbsp;INNOVATION&nbsp;&nbsp;•&nbsp;&nbsp;ACTION&nbsp;&nbsp;•&nbsp;&nbsp;
          </span>
          <span className="text-[50vw] sm:text-[28vw] font-black text-amber-400 tracking-tighter uppercase" aria-hidden>
            ENACTUS MSA&nbsp;&nbsp;•&nbsp;&nbsp;INNOVATION&nbsp;&nbsp;•&nbsp;&nbsp;ACTION&nbsp;&nbsp;•&nbsp;&nbsp;
          </span>
        </div>
      </div>

      {/* Floating Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-[160px] pointer-events-none animate-float-slow" />

      {/* Core Content Area */}
      <div className="relative z-10 w-full max-w-5xl px-4 pt-24 sm:pt-32 flex flex-col items-center justify-center text-center">
        
        {/* Primary H1 for SEO Crawlers */}
        <h1 className="sr-only">
          Enactus MSA - Social Entrepreneurship &amp; Student Leadership at October University
        </h1>
        
        {/* Logo Container with Ambient Ring */}
        <div className="relative w-full max-w-[380px] sm:max-w-lg mx-auto h-64 sm:h-[340px] flex items-center justify-center group">
          
          {/* Ambient Glow */}
          <div className="absolute inset-4 -z-10 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-500 rounded-full animate-pulse-glow" />
          </div>

          <img
            src={hero.enactusLogo}
            alt="Enactus MSA Logo"
            className="absolute max-w-full max-h-full object-contain transition-all duration-1000 ease-in-out"
            style={{ 
              opacity: logoIndex === 0 ? 1 : 0, 
              transform: logoIndex === 0 ? 'scale(1.15) translateY(0)' : 'scale(0.92) translateY(10px)',
              pointerEvents: logoIndex === 0 ? 'auto' : 'none'
            }}
          />
          
          <img
            src={hero.msaLogo}
            alt="MSA University Logo"
            className="absolute max-w-full max-h-full object-contain transition-all duration-1000 ease-in-out"
            style={{ 
              opacity: logoIndex === 1 ? 1 : 0, 
              transform: logoIndex === 1 ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(10px)',
              pointerEvents: logoIndex === 1 ? 'auto' : 'none'
            }}
          />
        </div>

        {/* Logo Switcher Tabs */}
        <div className="flex items-center gap-0 mt-5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-xl overflow-hidden p-1 shadow-2xl">
          <button
            onClick={() => setLogoIndex(0)}
            className={`px-6 py-2 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-400 ${
              logoIndex === 0
                ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(251,191,36,0.4)]'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
            aria-label="Show Enactus Logo"
          >
            Enactus
          </button>
          <button
            onClick={() => setLogoIndex(1)}
            className={`px-6 py-2 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-400 ${
              logoIndex === 1
                ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(251,191,36,0.4)]'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
            aria-label="Show MSA Logo"
          >
            MSA
          </button>
        </div>

        {/* Subtitle */}
        <div className="mt-8 w-full max-w-3xl relative h-24 sm:h-20">
          <p 
            className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tight absolute w-full top-0 left-0 text-center transition-all duration-700 ease-in-out uppercase leading-snug"
            style={{ 
              opacity: logoIndex === 0 ? 1 : 0,
              transform: logoIndex === 0 ? 'translateY(0)' : 'translateY(12px)',
              visibility: logoIndex === 0 ? 'visible' : 'hidden'
            }}
          >
            {hero.subtitle}
          </p>
          <p 
            className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tight absolute w-full top-0 left-0 text-center transition-all duration-700 ease-in-out uppercase leading-snug"
            style={{ 
              opacity: logoIndex === 1 ? 1 : 0,
              transform: logoIndex === 1 ? 'translateY(0)' : 'translateY(12px)',
              visibility: logoIndex === 1 ? 'visible' : 'hidden'
            }}
          >
            {hero.msaSubtitle}
          </p>
        </div>

        {/* Scroll Indicator */}
        <a 
          href="#about" 
          className="mt-12 flex flex-col items-center gap-2 text-white/40 hover:text-amber-400 transition-colors duration-300 group"
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.25em]">Discover</span>
          <ChevronDown className="animate-bounce group-hover:translate-y-1 transition-transform" size={18} />
        </a>

      </div>
    </section>
  );
}