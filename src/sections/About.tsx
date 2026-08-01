import { useEffect, useState } from 'react';
import { useContent } from '../context/ContentContext';
import { useInView } from '../hooks/use-in-view';
import { Shield, Users, Rocket, Award } from 'lucide-react';

export default function About() {
  const content = useContent();
  const { about } = content;
  const { ref, isVisible } = useInView(0.2);
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!isVisible) return;
    setDisplayed('');
    let i = 0;
    const fullText = about.heading;
    const timer = setInterval(() => {
      setDisplayed(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [isVisible, about.heading]);

  return (
    <section ref={ref} className="relative min-h-screen w-full bg-black py-24 overflow-hidden">
      {/* Background Lighting & Radial Accents */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 blur-[140px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom section-padding relative">
        <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.3em] mb-3 text-center">Who We Are</p>
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white uppercase leading-none tracking-tighter text-center">
            ABOUT <span className="text-amber-400">US</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Interactive Images Grid */}
          <div className={`grid grid-cols-2 gap-4 p-4 rounded-[32px] border border-white/15 bg-white/[0.02] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {about.images.slice(0, 4).map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-[20px] border border-white/10 bg-white/5 group relative shadow-md">
                <img 
                  src={src} 
                  alt={`Enactus MSA highlight ${i + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Award size={14} /> Enactus MSA
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Content Card */}
          <div className={`flex flex-col gap-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="rounded-[32px] border border-white/15 bg-zinc-950/90 p-8 sm:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden group hover:border-amber-400/30 transition-colors duration-500">
              <div className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-transparent" />
              
              <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight min-h-[4rem]">
                {displayed}
                {displayed.length < about.heading.length && (
                  <span className="inline-block w-1.5 h-7 ml-1 bg-amber-400 animate-pulse align-middle" />
                )}
              </h3>
              
              <div className="space-y-4 mt-6 text-white/70 text-base sm:text-lg leading-relaxed font-light">
                <p>{about.paragraph1}</p>
                <p>{about.paragraph2}</p>
                <p>{about.paragraph3}</p>
              </div>

              {/* Pillars */}
              <div className="grid gap-4 mt-8 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-amber-400/50 hover:bg-amber-400/[0.04] transition-all duration-300 group/card">
                  <div className="flex items-center gap-2 mb-2">
                    <Rocket size={16} className="text-amber-400 group-hover/card:scale-110 transition-transform" />
                    <p className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.25em]">Impact</p>
                  </div>
                  <p className="text-white/70 text-xs leading-relaxed">Sustainable student-led projects with measurable social benefits.</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-amber-400/50 hover:bg-amber-400/[0.04] transition-all duration-300 group/card">
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={16} className="text-amber-400 group-hover/card:scale-110 transition-transform" />
                    <p className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.25em]">Collaboration</p>
                  </div>
                  <p className="text-white/70 text-xs leading-relaxed">Working with partners and communities to drive real change.</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:border-amber-400/50 hover:bg-amber-400/[0.04] transition-all duration-300 group/card">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={16} className="text-amber-400 group-hover/card:scale-110 transition-transform" />
                    <p className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.25em]">Growth</p>
                  </div>
                  <p className="text-white/70 text-xs leading-relaxed">Leadership development and entrepreneurial mindset in every member.</p>
                </div>
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center hover:border-amber-400/40 hover:bg-amber-400/[0.05] transition-all duration-300 shadow-md">
                <p className="text-3xl font-black text-amber-400">{about.stat1Value}</p>
                <p className="text-white/60 text-xs uppercase font-bold tracking-wider mt-1">{about.stat1Label}</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center hover:border-amber-400/40 hover:bg-amber-400/[0.05] transition-all duration-300 shadow-md">
                <p className="text-3xl font-black text-amber-400">{about.stat2Value}</p>
                <p className="text-white/60 text-xs uppercase font-bold tracking-wider mt-1">{about.stat2Label}</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center hover:border-amber-400/40 hover:bg-amber-400/[0.05] transition-all duration-300 shadow-md">
                <p className="text-3xl font-black text-amber-400">{about.stat3Value}</p>
                <p className="text-white/60 text-xs uppercase font-bold tracking-wider mt-1">{about.stat3Label}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
